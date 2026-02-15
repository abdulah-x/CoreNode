function InternTable({ interns, onEdit, onDelete }) {
  const getRoleBadgeClass = (role) => {
    return `badge badge-role-${role.toLowerCase()}`;
  };

  const getStatusBadgeClass = (status) => {
    return `badge badge-status-${status.toLowerCase()}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="table-container">
      <table className="intern-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Score</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {interns.map((intern) => (
            <tr key={intern._id}>
              <td>
                <strong>{intern.name}</strong>
              </td>
              <td>{intern.email}</td>
              <td>
                <span className={getRoleBadgeClass(intern.role)}>
                  {intern.role}
                </span>
              </td>
              <td>
                <span className={getStatusBadgeClass(intern.status)}>
                  {intern.status}
                </span>
              </td>
              <td>
                <span className="score">{intern.score}</span>
              </td>
              <td>{formatDate(intern.createdAt)}</td>
              <td>
                <div className="action-buttons">
                  <button 
                    className="btn-edit"
                    onClick={() => onEdit(intern)}
                    title="Edit intern"
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => onDelete(intern._id)}
                    title="Delete intern"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InternTable;
