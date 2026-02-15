import { useState, useEffect } from 'react';
import './App.css';
import InternForm from './components/InternForm';
import InternTable from './components/InternTable';
import SearchFilter from './components/SearchFilter';

const API_BASE_URL = '/api/interns';

function App() {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingIntern, setEditingIntern] = useState(null);
  
  // Pagination state
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    status: ''
  });

  // Fetch interns
  const fetchInterns = async () => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      if (filters.search) queryParams.append('q', filters.search);
      if (filters.role) queryParams.append('role', filters.role);
      if (filters.status) queryParams.append('status', filters.status);
      queryParams.append('page', pagination.page);
      queryParams.append('limit', pagination.limit);

      const response = await fetch(`${API_BASE_URL}?${queryParams}`);
      const data = await response.json();

      if (response.ok) {
        setInterns(data.data);
        setPagination(data.pagination);
      } else {
        throw new Error(data.error?.message || 'Failed to fetch interns');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and when filters/pagination change
  useEffect(() => {
    fetchInterns();
  }, [filters, pagination.page]);

  // Handle search with debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setPagination(prev => ({ ...prev, page: 1 }));
    }, 300);

    return () => clearTimeout(timer);
  }, [filters.search]);

  // Create intern
  const handleCreateIntern = async (internData) => {
    setError(null);
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(internData)
      });

      const data = await response.json();

      if (response.ok) {
        fetchInterns(); // Refresh list
        return { success: true };
      } else {
        return { 
          success: false, 
          error: data.error?.message || 'Failed to create intern' 
        };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Update intern
  const handleUpdateIntern = async (id, internData) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(internData)
      });

      const data = await response.json();

      if (response.ok) {
        setEditingIntern(null);
        fetchInterns();
        return { success: true };
      } else {
        return { 
          success: false, 
          error: data.error?.message || 'Failed to update intern' 
        };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Delete intern
  const handleDeleteIntern = async (id) => {
    if (!confirm('Are you sure you want to delete this intern?')) return;

    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (response.ok) {
        fetchInterns();
      } else {
        setError(data.error?.message || 'Failed to delete intern');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      setPagination(prev => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      setPagination(prev => ({ ...prev, page: prev.page + 1 }));
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎓 Intern Tracker</h1>
        <p>Manage your internship applications efficiently</p>
      </header>

      <div className="container">
        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        <SearchFilter 
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <InternForm 
          onSubmit={editingIntern ? handleUpdateIntern : handleCreateIntern}
          editingIntern={editingIntern}
          onCancelEdit={() => setEditingIntern(null)}
        />

        {loading ? (
          <div className="loading">Loading interns</div>
        ) : interns.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <div className="empty-state-text">
              No interns found. Add one to get started!
            </div>
          </div>
        ) : (
          <>
            <InternTable 
              interns={interns}
              onEdit={setEditingIntern}
              onDelete={handleDeleteIntern}
            />

            <div className="pagination">
              <div className="pagination-info">
                Showing {interns.length} of {pagination.total} interns 
                (Page {pagination.page} of {pagination.totalPages})
              </div>
              <div className="pagination-buttons">
                <button 
                  className="pagination-btn"
                  onClick={handlePrevPage}
                  disabled={!pagination.hasPrevPage}
                >
                  ← Previous
                </button>
                <button 
                  className="pagination-btn"
                  onClick={handleNextPage}
                  disabled={!pagination.hasNextPage}
                >
                  Next →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
