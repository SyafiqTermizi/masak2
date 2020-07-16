import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFTOKEN",
});

export default instance;
