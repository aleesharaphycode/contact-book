import { useState } from "react";

function EditContactForm({ contact, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    company: contact.company || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in Name, Email and Phone.");
      return;
    }

    onSave(formData);
  };

  return (
    <div className="form-container">
      <h2>Edit Contact</h2>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <label>Company</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />

        <div className="form-actions">
          <button type="submit" className="save-btn">
            Update Contact
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditContactForm;