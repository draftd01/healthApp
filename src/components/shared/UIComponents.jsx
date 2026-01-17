/**
 * Card component for consistent UI across pages
 */

export const Card = ({ title, children, className = '' }) => (
  <div className={`card shadow-sm mb-4 ${className}`}>
    {title && (
      <div className="card-header bg-white border-bottom">
        <h5 className="card-title mb-0">{title}</h5>
      </div>
    )}
    <div className="card-body">{children}</div>
  </div>
);

/**
 * Alert component for risk warnings and important information
 */
export const Alert = ({ type = 'info', title, message, details = [] }) => {
  const bgClass = {
    info: 'alert-info',
    warning: 'alert-warning',
    danger: 'alert-danger',
    success: 'alert-success'
  }[type];

  return (
    <div className={`alert ${bgClass} alert-dismissible fade show`} role="alert">
      {title && <h5 className="alert-heading">{title}</h5>}
      <p className="mb-0">{message}</p>
      {details.length > 0 && (
        <ul className="mb-0 mt-2">
          {details.map((detail, idx) => (
            <li key={idx}>{detail}</li>
          ))}
        </ul>
      )}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

/**
 * Form group component for consistent form inputs
 */
export const FormGroup = ({ label, input, helper }) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    {input}
    {helper && <small className="form-text text-muted d-block mt-1">{helper}</small>}
  </div>
);

/**
 * Medical item list component with remove capability
 */
export const MedicalItemList = ({ items, onRemove, emptyMessage = 'No items added' }) => {
  if (items.length === 0) {
    return <p className="text-muted">{emptyMessage}</p>;
  }

  return (
    <div className="list-group">
      {items.map((item) => (
        <div
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <h6 className="mb-1">{item.name}</h6>
            <small className="text-muted">Added: {item.dateAdded}</small>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="btn btn-sm btn-outline-danger"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};
