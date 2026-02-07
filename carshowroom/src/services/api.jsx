import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getCars = () => API.get("/cars");
export const getCarById = (id) => API.get(`/cars/${id}`);
export const addCar = (data) => API.post("/cars", data);
