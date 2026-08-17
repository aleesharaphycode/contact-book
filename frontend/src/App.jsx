import { useEffect, useState } from "react";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import ContactDetails from "./components/ContactDetails";
import ContactForm from "./components/ContactForm";

import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "./services/api";


function App() {
  // =========================
  // AUTHENTICATION
  // =========================

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );

  const [showRegister, setShowRegister] = useState(false);


  // =========================
  // CONTACT STATES
  // =========================

  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);


  // =========================
  // LOAD CONTACTS
  // =========================

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    loadContacts();
  }, [isLoggedIn]);


  const loadContacts = () => {
    getContacts()
      .then((response) => {
        const contactList = response.data;

        setContacts(contactList);

        if (contactList.length > 0) {
          setSelectedContact(contactList[0]);
        } else {
          setSelectedContact(null);
        }
      })
      .catch((error) => {
        console.error("Error loading contacts:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setIsLoggedIn(false);
        }
      });
  };


  // =========================
  // ADD CONTACT
  // =========================

  const handleAddContact = async (contactData) => {
  console.log("1. Contact data received:", contactData);

  try {
    console.log("2. Calling createContact...");

    const response = await createContact(contactData);

    console.log("3. API response:", response);

    const newContact = response.data;

    setContacts((prevContacts) =>
      [...prevContacts, newContact].sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    );

    setSelectedContact(newContact);
    setShowForm(false);
    setEditingContact(null);

    alert("Contact saved successfully!");
  } catch (error) {
    console.error("4. ERROR:", error);
    console.error("5. Response:", error.response);
    console.error("6. Response data:", error.response?.data);
    console.error("7. Status:", error.response?.status);

    if (error.response?.status === 401) {
      alert("Your session has expired. Please login again.");

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setIsLoggedIn(false);
    } else {
      alert(
        "Could not create contact: " +
        JSON.stringify(error.response?.data || error.message)
      );
    }
  }
};


  // =========================
  // EDIT CONTACT
  // =========================

  const handleEditContact = (contact) => {
    console.log("Edit clicked:", contact);

    setEditingContact(contact);
    setShowForm(true);
  };


  const handleUpdateContact = (contactData) => {
    updateContact(editingContact.id, contactData)
      .then((response) => {
        const updatedContact = response.data;

        setContacts((prevContacts) =>
          prevContacts
            .map((contact) =>
              contact.id === updatedContact.id
                ? updatedContact
                : contact
            )
            .sort((a, b) => a.name.localeCompare(b.name))
        );

        setSelectedContact(updatedContact);

        setShowForm(false);
        setEditingContact(null);
      })
      .catch((error) => {
        console.error("Error updating contact:", error);

        if (error.response?.status === 401) {
          alert("Your session has expired. Please login again.");

          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setIsLoggedIn(false);
        } else {
          alert("Could not update contact.");
        }
      });
  };


  // =========================
  // DELETE CONTACT
  // =========================

  const handleDeleteContact = (id) => {
    console.log("Delete clicked:", id);

    const confirmed = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (!confirmed) {
      return;
    }

    deleteContact(id)
      .then(() => {
        const remainingContacts = contacts.filter(
          (contact) => contact.id !== id
        );

        setContacts(remainingContacts);

        if (remainingContacts.length > 0) {
          setSelectedContact(remainingContacts[0]);
        } else {
          setSelectedContact(null);
        }

        setShowForm(false);
        setEditingContact(null);
      })
      .catch((error) => {
        console.error("Error deleting contact:", error);

        if (error.response?.status === 401) {
          alert("Your session has expired. Please login again.");

          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setIsLoggedIn(false);
        } else {
          alert("Could not delete this contact.");
        }
      });
  };


  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    setIsLoggedIn(false);

    setContacts([]);
    setSelectedContact(null);
    setShowForm(false);
    setEditingContact(null);
  };


  // =========================
  // LOGIN / REGISTER SCREEN
  // =========================

  if (!isLoggedIn) {
    if (showRegister) {
      return (
        <Register
          onShowLogin={() => setShowRegister(false)}
        />
      );
    }

    return (
      <Login
        onLogin={() => setIsLoggedIn(true)}
        onShowRegister={() => setShowRegister(true)}
      />
    );
  }


  // =========================
  // SEARCH + SORT
  // =========================

  const filteredContacts = contacts
    .filter((contact) => {
      const search = searchTerm.toLowerCase();

      return (
        contact.name.toLowerCase().includes(search) ||
        contact.email.toLowerCase().includes(search) ||
        (contact.company || "").toLowerCase().includes(search)
      );
    })
    .sort((a, b) =>
      a.name.localeCompare(b.name)
    );


  // =========================
  // CONTACT BOOK UI
  // =========================

  return (
    <div className="app">

      {/* HEADER */}

      <header className="header">

        <div>
          <h1>📒 Contact Book</h1>

          <p>
            Your private contact manager
          </p>
        </div>

        <div className="header-buttons">

          <button
            className="add-btn"
            onClick={() => {
              setEditingContact(null);
              setShowForm(true);
            }}
          >
            + Add Contact
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* MAIN CONTENT */}

      <div className="contact-container">

        {/* LEFT SIDE */}

        <aside className="contact-list">

          <div className="list-header">

            <h2>Contacts</h2>

            <span>
              {contacts.length}
            </span>

          </div>


          {/* SEARCH */}

          <input
            type="text"
            className="search-input"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />


          {/* CONTACT LIST */}

          <div className="contacts">

            {filteredContacts.length === 0 ? (

              <div className="no-contacts">

                <p>
                  No contacts found.
                </p>

                <button
                  onClick={() => {
                    setEditingContact(null);
                    setShowForm(true);
                  }}
                >
                  Add your first contact
                </button>

              </div>

            ) : (

              filteredContacts.map((contact) => (

                <div
                  key={contact.id}
                  className={`contact-item ${
                    selectedContact?.id === contact.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedContact(contact)
                  }
                >

                  <h3>
                    {contact.name}
                  </h3>

                  <p>
                    {contact.company || "No company"}
                  </p>

                </div>

              ))

            )}

          </div>

        </aside>


        {/* RIGHT SIDE */}

        <main className="contact-details-container">

          {showForm ? (

            <ContactForm
              initialData={editingContact}
              onSubmit={
                editingContact
                  ? handleUpdateContact
                  : handleAddContact
              }
              onCancel={() => {
                setShowForm(false);
                setEditingContact(null);
              }}
            />

          ) : (

            <ContactDetails
              contact={selectedContact}
              onEdit={handleEditContact}
              onDelete={handleDeleteContact}
            />

          )}

        </main>

      </div>

    </div>
  );
}


export default App;