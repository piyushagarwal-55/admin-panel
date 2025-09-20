import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Clock as ClockIcon } from "lucide-react";

export interface Person {
  id: string;
  first_name: string;
}

interface ActivityPanelProps {
  candidate: Person;
}

export function ActivityPanel({ candidate }: ActivityPanelProps) {
  const activityDate = parseISO("2025-06-26");
  const activityTime = "15:42";
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [templates, setTemplates] = useState<{ id: string; template_name: string; subject: string; body: string }[]>([]);
  const [notes, setNotes] = useState<string>("");

  const fetchTemplates = async () => {
    try {
      const res = await fetch("http://16.171.117.2:3000/settings/getAllTemplates");
      const data = await res.json();
      const result = data.result;
      const activityTemplates = result.filter((tpl: { template_type: string }) => tpl.template_type === "activity");
      setTemplates(activityTemplates);
    } catch (error) {
      console.error("Failed to fetch activity templates:", error);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow mb-4">
      <div className="grid grid-cols-4 gap-4 px-2 text-xs font-medium text-gray-500 uppercase">
        <div>Activity type</div>
        <div>Activity date</div>
        <div>Activity time</div>
        <div>Activity by</div>
      </div>

      <div className="grid grid-cols-4 gap-4 px-2 items-center text-sm">
        <div>
          <Select defaultValue="">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select activity type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="call">Call</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="meeting">Meeting</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start w-full">
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                {format(activityDate, "dd MMM, yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <input
                type="date"
                className="w-full"
                defaultValue="2025-06-26"
                readOnly
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center space-x-2">
          <ClockIcon className="text-gray-500" />
          <Input type="time" value={activityTime} readOnly className="w-24" />
        </div>
        <div className="text-sm capitalize">{candidate.first_name}</div>
      </div>

      <div className="space-y-2">
        <div className="text-xs font-medium text-gray-500 uppercase">
          Activity Notes
        </div>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter activity notes..."
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <div className="text-xs font-medium text-gray-500 uppercase">
          Associated with
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs">
            {candidate.first_name}{" "}
            <span className="ml-1 cursor-pointer">×</span>
          </span>
          <button className="text-sm text-gray-400">+ add more</button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Select value={selectedTemplate} onValueChange={(value) => {
          setSelectedTemplate(value);
          const tpl = templates.find((t) => String(t.id) === String(value));
          if (tpl) {
            // Replace placeholders like {candidate} with actual name
            const replacedBody = tpl.body?.replace(/{candidate}/g, candidate.first_name);
            setNotes(replacedBody || "");
          }
        }}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select template" />
          </SelectTrigger>
          <SelectContent>
            {templates.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.template_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="bg-blue-600 text-white">Save</Button>
      </div>
    </div>
  );
}
