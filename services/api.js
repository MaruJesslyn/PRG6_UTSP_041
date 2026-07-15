import axios from 'axios';

const API_URL = "http://10.1.11.206:8080/api"; 

export const getPeoples = () => axios.get(`${API_URL}/peoples`);
export const createPeople = (data) => axios.post(`${API_URL}/peoples`, data);
export const updatePeople = (id, data) => axios.put(`${API_URL}/peoples/${id}`, data);
export const deletePeople = (id) => axios.delete(`${API_URL}/peoples/${id}`);

export const getTrackers = () => axios.get(`${API_URL}/trackers`);
export const createTracker = (data) => axios.post(`${API_URL}/trackers`, data);
