import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const signup = (userData) => axios.post(`${API_URL}/signup`, userData);
export const login = (credentials) => axios.post(`${API_URL}/login`, credentials);
export const getItems = () => axios.get(`${API_URL}/items`);
export const getItem = (id) => axios.get(`${API_URL}/items/${id}`);
export const addReview = (reviewData) => axios.post(`${API_URL}/reviews`, reviewData);
export const getUserReviews = (userId) => axios.get(`${API_URL}/users/${userId}/reviews`);
export const deleteReview = (id) => axios.delete(`${API_URL}/reviews/${id}`);
export const updateReview = (id, reviewData) => axios.put(`${API_URL}/reviews/${id}`, reviewData);
