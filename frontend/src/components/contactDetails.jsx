function ContactDetails({ contact, onEdit, onDelete }) {
  if (!contact) {
    return (
      <div className="contact-details empty">
        <h2>Select a contact</h2>
        <p>Choose a contact from the list.</p>
      </div>
    );
  }

  const handleEdit = () => {
    console.log("Edit clicked:", contact);
    onEdit(contact);
  };

  const handleDelete = () => {
    console.log("Delete clicked:", contact.id);
    onDelete(contact.id);
  };

  return (
    <div className="contact-details">
      <h1>{contact.name}</h1>

      <div className="detail">
        <strong>Email</strong>
        <p>{contact.email}</p>
      </div>

      <div className="detail">
        <strong>Phone</strong>
        <p>{contact.phone}</p>
      </div>

      <div className="detail">
        <strong>Company</strong>
        <p>{contact.company || "Not provided"}</p>
      </div>

      <div className="actions">
        <button type="button" onClick={handleEdit}>
          Edit
        </button>

        <button
          type="button"
          className="delete-btn"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ContactDetails;