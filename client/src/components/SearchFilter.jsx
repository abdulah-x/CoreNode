import { useState, useEffect } from 'react';

function SearchFilter({ filters, onFilterChange }) {
  const [localSearch, setLocalSearch] = useState(filters.search);

  // Update local search when parent filters change
  useEffect(() => {
    setLocalSearch(filters.search);
  }, [filters.search]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ ...filters, search: localSearch });
    }, 400);

    return () => clearTimeout(timer);
  }, [localSearch]);

  const handleRoleChange = (e) => {
    onFilterChange({ ...filters, role: e.target.value });
  };

  const handleStatusChange = (e) => {
    onFilterChange({ ...filters, status: e.target.value });
  };

  const handleClearFilters = () => {
    setLocalSearch('');
    onFilterChange({ search: '', role: '', status: '' });
  };

  const hasActiveFilters = filters.search || filters.role || filters.status;

  return (
    <div className="search-filter-container">
      <h3>🔍 Search & Filter</h3>
      <div className="search-filter">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search by name or email..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Role:</label>
          <select 
            className="filter-select"
            value={filters.role}
            onChange={handleRoleChange}
          >
            <option value="">All Roles</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Fullstack">Fullstack</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select 
            className="filter-select"
            value={filters.status}
            onChange={handleStatusChange}
          >
            <option value="">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button 
            className="clear-filters-btn"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchFilter;
