import axios from "axios";
import { baseURL } from "../constants/config";

export const api = axios.create({
  baseURL
});
