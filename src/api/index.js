import axios from 'axios';

const API_URL = 'https://0p8mbxgj1e.execute-api.us-east-1.amazonaws.com/prod';

// === CLIENTES ===
export const getClientes = () => axios.get(`${API_URL}/clientes`);
export const createCliente = (data) => axios.post(`${API_URL}/clientes`, data);
export const updateCliente = (id, data) => axios.patch(`${API_URL}/clientes/${id}`, data);
export const deleteCliente = (id) => axios.delete(`${API_URL}/clientes/${id}`);
export const searchClientes = (nombre) =>
  axios.get(`${API_URL}/clientes/buscar?nombre=${encodeURIComponent(nombre)}`);

// === CITAS ===
export const getCitas = () => axios.get(`${API_URL}/citas`);
export const createCita = (data) => axios.post(`${API_URL}/citas`, data);
export const updateCita = (id, data) => axios.patch(`${API_URL}/citas/${id}`, data);
export const deleteCita = (id) => axios.delete(`${API_URL}/citas/${id}`);
export const getCitasPorCliente = (idCliente) =>
  axios.get(`${API_URL}/citas/cliente/${idCliente}`);
export const getCitasPorBarbero = (idBarbero) =>
  axios.get(`${API_URL}/citas/barbero/${idBarbero}`);

// === BARBEROS ===
export const getBarberos = () => axios.get(`${API_URL}/barberos`);

// No agregamos createBarbero porque la API en la nube no lo permite
// export const createBarbero = (data) => axios.post(`${API_URL}/barberos`, data);
export const updateBarbero = (id, data) => axios.patch(`${API_URL}/barberos/${id}`, data);
export const deleteBarbero = (id) => axios.delete(`${API_URL}/barberos/${id}`);
