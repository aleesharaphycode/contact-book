import { useState } from "react";

function ContactForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    company: initialData?.company || "",
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

    console.log("Submitting contact:", formData);

    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h2>{initialData ? "Edit Contact" : "Add New Contact"}</h2>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={handleChange}
        />

        <label>Company</label>
        <input
          type="text"
          name="company"
          placeholder="Enter company"
          value={formData.company}
          onChange={handleChange}
        />

        <div className="form-actions">
          <button type="submit" className="save-btn">
            Save Contact
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

export default ContactForm;