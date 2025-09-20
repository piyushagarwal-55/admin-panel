import { useState } from 'react';
import { ChevronDown, Plus, Edit, User, X, GripVertical, Briefcase, Building, Users, Tag, Type, Search, FileText, Star, Activity, Phone, MapPin, Calendar, Target, CircleDot, Flag } from 'lucide-react';
import Layout from '@/components/Layout';

export default function CandidatesInterface() {
  const [selectedColumn, setSelectedColumn] = useState('Candidates');
  const [selectedMatch, setSelectedMatch] = useState('Match all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [showMatchDropdown, setShowMatchDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filterConfig, setFilterConfig] = useState({
    condition: 'contains one of',
    searchTerms: ''
  });
  
  // Column options
  const columnOptions = ['Candidates', 'Companies', 'Jobs'];
  
  // Match options
  const matchOptions = ['Match all', 'Match any'];
  
  // Filter condition options
  const filterConditionOptions = [
    'contains one of',
    'does not contain any of',
    'is not set',
    'is set'
  ];
  
  // Filter options based on selected column
  const filterOptions = {
    'Candidates': [
      { id: 'job', label: 'Job', icon: <Briefcase className="w-4 h-4" /> },
      { id: 'tags', label: 'Tags', icon: <Tag className="w-4 h-4" /> },
      { id: 'textSearch', label: 'Text search', icon: <Type className="w-4 h-4" /> },
      { id: 'booleanSearch', label: 'Boolean search (Files)', icon: <CircleDot className="w-4 h-4" /> },
      { id: 'candidateRating', label: 'Candidate rating', icon: <Star className="w-4 h-4" /> },
      { id: 'customActivitySearch', label: 'Custom Activity Search', icon: <Activity className="w-4 h-4" /> },
      { id: 'callSearch', label: 'Call Search', icon: <Phone className="w-4 h-4" /> }
    ],
    'Companies': [
      { id: 'tags', label: 'Tags', icon: <Tag className="w-4 h-4" /> },
      { id: 'customActivitySearch', label: 'Custom Activity Search', icon: <Activity className="w-4 h-4" /> },
      { id: 'noteSearch', label: 'Note Search', icon: <FileText className="w-4 h-4" /> },
      { id: 'radiusSearch', label: 'Radius search', icon: <Target className="w-4 h-4" /> },
      { id: 'contactRadiusSearch', label: 'Contact Radius search', icon: <Target className="w-4 h-4" /> },
      { id: 'country', label: 'Country', icon: <Flag className="w-4 h-4" /> },
      { id: 'addedOn', label: 'Added on', icon: <Calendar className="w-4 h-4" /> }
    ],
    'Jobs': [
      { id: 'location', label: 'Location', icon: <MapPin className="w-4 h-4" /> },
      { id: 'name', label: 'Name', icon: <FileText className="w-4 h-4" /> },
      { id: 'jobStatus', label: 'Job Status', icon: <CircleDot className="w-4 h-4" /> },
      { id: 'noCandidateMovedIntoStage', label: 'No Candidate Moved Into Stage', icon: <Users className="w-4 h-4" /> },
      { id: 'jobRadiusSearch', label: 'Job Radius Search', icon: <Target className="w-4 h-4" /> },
      { id: 'jobCompany', label: 'Job Company', icon: <Building className="w-4 h-4" /> },
      { id: 'noteSearch', label: 'Note Search', icon: <FileText className="w-4 h-4" /> }
    ]
  };

  // All available system fields
  const [systemFields, setSystemFields] = useState([
    { id: 'company', name: 'Company', checked: true },
    { id: 'recruiter', name: 'Recruiter', checked: false },
    { id: 'accountManager', name: 'Account Manager', checked: false },
    { id: 'contact', name: 'Contact', checked: false },
    { id: 'candidatesInPipeline', name: 'Candidates in pipeline', checked: false },
    { id: 'candidatesAddedLastWeek', name: 'Candidates added last week', checked: false },
    { id: 'boardsPublished', name: 'Boards published', checked: false },
    { id: 'totalSubmissions', name: 'Total submissions', checked: false },
    { id: 'totalHires', name: 'Total hires', checked: false },
    { id: 'totalApplied', name: 'Total applied', checked: false },
    { id: 'locations', name: 'Locations', checked: true },
    { id: 'department', name: 'Department', checked: false },
    { id: 'createdBy', name: 'Created by', checked: true },
    { id: 'openedDate', name: 'Opened date', checked: true },
    { id: 'jobVisibility', name: 'Job visibility', checked: false },
    { id: 'engagementType', name: 'Engagement type', checked: false },
    { id: 'payRate', name: 'Pay Rate', checked: false },
    { id: 'billRate', name: 'Bill Rate', checked: false },
    { id: 'contractStartDate', name: 'Contract Start Date', checked: false },
    { id: 'numberOfOpenings', name: 'Number of openings', checked: false },
    { id: 'currentOpenings', name: 'Current Openings', checked: false },
    { id: 'skills', name: 'Skills', checked: false },
    { id: 'salaryRange', name: 'Salary range', checked: false },
    { id: 'experienceRange', name: 'Experience range', checked: false },
    { id: 'searchStartDate', name: 'Search Start Date', checked: false },
    { id: 'searchEndDate', name: 'Search End Date', checked: false },
    { id: 'jobStatus', name: 'Job Status', checked: false },
    { id: 'daysInStatus', name: 'Days In Status', checked: false },
    { id: 'forecastedJobValue', name: 'Forecasted Job Value', checked: false }
  ]);

  // Displayed columns (only checked items)
  const displayedColumns = systemFields.filter(field => field.checked);

  const handleFieldToggle = (fieldId) => {
    setSystemFields(prev => prev.map(field => 
      field.id === fieldId ? { ...field, checked: !field.checked } : field
    ));
  };

  const handleColumnSelect = (column) => {
    setSelectedColumn(column);
    setShowColumnDropdown(false);
  };

  const handleMatchSelect = (match) => {
    setSelectedMatch(match);
    setShowMatchDropdown(false);
  };

  const handleFilterSelect = (filterId) => {
    const filterOption = filterOptions[selectedColumn]?.find(f => f.id === filterId);
    setSelectedFilter(filterOption);
    setShowFilterDropdown(false);
    // Reset filter config when selecting new filter
    setFilterConfig({
      condition: 'contains one of',
      searchTerms: ''
    });
  };

  const handleFilterConfigSubmit = () => {
    console.log('Filter applied:', {
      filter: selectedFilter,
      condition: filterConfig.condition,
      searchTerms: filterConfig.searchTerms
    });
    setSelectedFilter(null);
    // Here you would typically add the filter to your active filters
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 relative isolate">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">{selectedColumn}</h1>
          
          <div className="flex items-center gap-4">
            {/* Edit columns button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit columns
            </button>
            
            {/* Candidates dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowColumnDropdown(!showColumnDropdown)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors min-w-[120px] justify-between"
              >
                <span>{selectedColumn}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showColumnDropdown && (
                <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-md shadow-lg z-[60] min-w-[120px]">
                  {columnOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleColumnSelect(option)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Match all dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowMatchDropdown(!showMatchDropdown)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors min-w-[100px] justify-between"
              >
                <span>{selectedMatch}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showMatchDropdown && (
                <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-md shadow-lg z-[60] min-w-[100px]">
                  {matchOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleMatchSelect(option)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Add filter button */}
            <div className="relative">
              <button 
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add filter
              </button>
              
              {showFilterDropdown && (
                <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-[60] w-80">
                  {/* Filter dropdown header */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{selectedColumn}</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-gray-600">{selectedMatch}</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  
                  {/* Filter dropdown content */}
                  <div className="p-3">
                    <div className="mb-3">
                      <div className="relative">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Select..."
                          className="w-full pl-9 pr-3 py-2 border border-blue-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">SYSTEM FIELDS</span>
                    </div>
                    
                    <div className="max-h-48 overflow-y-auto">
                      {filterOptions[selectedColumn]?.map((filter) => (
                        <button
                          key={filter.id}
                          onClick={() => handleFilterSelect(filter.id)}
                          className="flex items-center gap-3 w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          <span className="text-gray-400">{filter.icon}</span>
                          <span>{filter.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Filter Configuration Modal - positioned at the Add filter button */}
              {selectedFilter && (
                <div className="absolute top-full mt-1 right-0 bg-yellow-50 border border-yellow-200 rounded-lg shadow-lg z-[70] w-96 p-4">
                  {/* Filter name with icon and close button */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-gray-600">{selectedFilter.icon}</span>
                    <span className="font-medium text-gray-900">{selectedFilter.label}</span>
                    <button 
                      onClick={() => setSelectedFilter(null)}
                      className="ml-auto text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Filter conditions */}
                  <div className="space-y-3 mb-4">
                    {filterConditionOptions.map((condition) => (
                      <label key={condition} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="filterCondition"
                          value={condition}
                          checked={filterConfig.condition === condition}
                          onChange={(e) => setFilterConfig(prev => ({ ...prev, condition: e.target.value }))}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">{condition}</span>
                      </label>
                    ))}
                  </div>

                  {/* Search terms input - only show for conditions that need input */}
                  {(filterConfig.condition === 'contains one of' || filterConfig.condition === 'does not contain any of') && (
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Add search terms..."
                        value={filterConfig.searchTerms}
                        onChange={(e) => setFilterConfig(prev => ({ ...prev, searchTerms: e.target.value }))}
                        className="w-full px-3 py-2 border border-blue-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )}

                  {/* Action button */}
                  <button 
                    onClick={handleFilterConfigSubmit}
                    className="w-full px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="p-8">
        <div className="bg-white rounded-lg border border-gray-200 min-h-[600px]">
          {/* Empty state */}
          <div className="flex flex-col items-center justify-center h-full py-24">
            {/* User icon */}
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-8">
              <User className="w-10 h-10 text-gray-400" />
            </div>
            
            {/* Text content */}
            <div className="text-center">
              <p className="text-gray-600 text-base mb-4">
                To begin a search, <button 
                  onClick={() => setShowFilterDropdown(true)}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  add a filter
                </button>
              </p>
              <p className="text-gray-500 text-sm mb-4">OR</p>
              <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium">
                Choose a segment
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[80] p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-full max-h-[85vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-lg font-medium text-gray-900">Choose which columns you see</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 flex min-h-0 overflow-hidden">
              {/* Left Side - System Fields */}
              <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200">
                <div className="p-6 pb-4 flex-shrink-0">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">SYSTEM FIELDS</h3>
                </div>
                <div className="flex-1 px-6 pb-6 overflow-y-auto">
                  <div className="space-y-3 pr-2">
                    {systemFields.map((field) => (
                      <label key={field.id} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                        <input
                          type="checkbox"
                          checked={field.checked}
                          onChange={() => handleFieldToggle(field.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                        />
                        <span className="ml-3 text-sm text-gray-700">{field.name}</span>
                      </label>
                    ))}
                  </div>
                  
                  {/* Custom Fields Section */}
                  <div className="mt-8 pr-2">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">CUSTOM FIELDS</h3>
                    <div className="text-sm text-gray-400">No custom fields available</div>
                  </div>
                </div>
              </div>

              {/* Right Side - Displayed Columns */}
              <div className="flex-1 bg-gray-50 flex flex-col min-h-0">
                <div className="p-6 pb-4 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3">
                      <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"/>
                      </svg>
                    </div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">DISPLAYED COLUMNS</h3>
                  </div>
                </div>
                <div className="flex-1 px-6 pb-6 overflow-y-auto">
                  <div className="space-y-3 pr-2">
                    {displayedColumns.map((column, index) => (
                      <div key={column.id} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-md hover:shadow-sm transition-shadow">
                        <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0 cursor-move" />
                        <span className="text-sm text-gray-700 flex-1">{column.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-start gap-3 p-6 border-t border-gray-200 flex-shrink-0">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Save
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside handlers */}
      {(showColumnDropdown || showMatchDropdown || showFilterDropdown || selectedFilter) && (
        <div 
          className="fixed inset-0 z-[55]" 
          onClick={(e) => {
            // Don't interfere with GlobalSearchBar or other header components
            const target = e.target as HTMLElement;
            if (!target.closest('[data-global-search]') && 
                !target.closest('header') && 
                !target.closest('.dropdown-menu')) {
              setShowColumnDropdown(false);
              setShowMatchDropdown(false);
              setShowFilterDropdown(false);
              setSelectedFilter(null);
            }
          }}
        />
      )}
    </div>
    </Layout>
  );
}