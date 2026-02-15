import { useState, useEffect } from 'react';

const initialFormState = {
  name: '',
  email: '',
  role: 'Frontend',
  status: 'Applied',
  score: 0
};

function InternForm({ onSubmit, editingIntern, onCancelEdit }) {
  const [formData, setFormData] = useState(initialFormState);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (editingIntern) {
      setFormData({
        name: editingIntern.name,
        email: editingIntern.email,
        role: editingIntern.role,
        status: editingIntern.status,
        score: editingIntern.score
      });
      // Scroll to form
      document.querySelector('.form-container')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    } else {
      setFormData(initialFormState);
    }
    setFormError('');
  }, [editingIntern]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'score' ? Number(value) : value
    }));
  };

  const validateForm = () => {
    if (formData.name.length < 2) {
      setFormError('Name must be at least 2 characters long');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address');
      return false;
    }

    if (formData.score < 0 || formData.score > 100) {
      setFormError('Score must be between 0 and 100');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    setIsSubmitting(true);

    const result = editingIntern 
      ? await onSubmit(editingIntern._id, formData)
      : await onSubmit(formData);

    setIsSubmitting(false);

    if (result.success) {
      setFormData(initialFormState);
      setFormError('');
    } else {
      setFormError(result.error);
    }
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setFormError('');
    if (editingIntern) {
      onCancelEdit();
    }
  };

  return (
    <div className="form-container">
      <h3>{editingIntern ? '✏️ Edit Intern' : '➕ Add New Intern'}</h3>
      
      {formError && (
        <div className="error-message" style={{ marginBottom: '1rem' }}>
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="intern-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={2}
            placeholder="John Doe"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role *</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Fullstack">Fullstack</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status *</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="score">Score (0-100)</label>
          <input
            type="number"
            id="score"
            name="score"
            value={formData.score}
            onChange={handleChange}
            min="0"
            max="100"
            placeholder="0"
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? (editingIntern ? 'Updating...' : 'Adding...') 
              : (editingIntern ? 'Update Intern' : 'Add Intern')
            }
          </button>
          
          {editingIntern && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default InternForm;
