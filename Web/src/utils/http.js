import axios from "axios";

class Http {
  http;
  constructor() {
    this.http = axios.create({
      baseURL: "http://localhost:3030/"
    })
  }
}

const http = new Http().http;

export default http;