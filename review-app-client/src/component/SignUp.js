import React, { useState } from 'react';
import { signup } from '../services/api';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="first_name" placeholder="First Name" onChange={handleChange} />
      <input name="last_name" placeholder="Last Name" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;