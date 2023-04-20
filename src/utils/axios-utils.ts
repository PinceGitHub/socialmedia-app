import axios from "axios";

export default axios.create({ baseURL: process.env.REACT_APP_SERVICE_HOST });

export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_SERVICE_HOST,
  withCredentials: true,
});
