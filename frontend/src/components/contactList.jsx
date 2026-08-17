function ContactList({ contacts, selectedContact, onSelectContact }) {
  return (
    <div className="contact-list">
      <h2>Contacts</h2>

      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        contacts.map((contact) => (
          <div
            key={contact.id}
            className={`contact-item ${
              selectedContact?.id === contact.id ? "selected" : ""
            }`}
            onClick={() => onSelectContact(contact)}
          >
            <strong>{contact.name}</strong>
            <span>{contact.company}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default ContactList;