import axios from "axios";

const instance = axios.create({
  baseURL: window.API_BASE_URL,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFTOKEN",
});

export default instance;
