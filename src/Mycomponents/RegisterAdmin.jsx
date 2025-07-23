import React, { useState } from 'react';

const AdminRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    state: '',
    pincode: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { phoneNumber, pincode } = formData;

    if (!/^\d{10}$/.test(phoneNumber)) {
      alert('Phone number must be 10 digits.');
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      alert('Pincode must be 6 digits.');
      return;
    }

    // Make POST request
    fetch('http://localhost:8081/api/central/registerAdmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => {
      console.log(res);
      if (res.ok) {
        alert("Admin registered successfully!");
        setFormData({
          name: '',
          email: '',
          password: '',
          phoneNumber: '',
          address: '',
          state: '',
          pincode: ''
        });
      } else {
        alert("Failed to register admin");
      }
    })
    .catch(err => console.error("Error:", err));
  };

  // console.log(handleSubmit);

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Admin Registration</h2>

        {[
          { label: "Full Name", name: "name", type: "text", minLength: 3 },
          { label: "Email Address", name: "email", type: "email" },
          { label: "Password (Min 6 Characters)", name: "password", type: "password", minLength: 6 },
          { label: "Phone Number", name: "phoneNumber", type: "tel", pattern: "[0-9]{10}" },
          { label: "Address", name: "address", type: "text" },
          { label: "State", name: "state", type: "text" },
          { label: "Pincode", name: "pincode", type: "number", pattern: "\\d{6}" }
        ].map(({ label, name, type, minLength, pattern }) => (
          <div key={name} style={styles.group}>
            <label style={styles.label}>{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              minLength={minLength}
              pattern={pattern}
              style={styles.input}
            />
          </div>
        ))}

        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0
  },
  form: {
    background: '#fff',
    padding: '30px 40px',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    width: '100%'
  },
  title: {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#333'
  },
  group: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    color: '#555',
    fontWeight: 600
  },
  input: {
    width: '100%',
    padding: '10px 15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  },
  button: {
    width: '100%',
    padding: '12px',
    background: '#2575fc',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease'
  }
};

export default AdminRegisterForm;
