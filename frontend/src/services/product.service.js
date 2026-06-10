import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/products/";

class ProductService {
  getAll() {
    return axios.get(API_URL, {
      headers: authHeader()
    });
  }

  create(data) {
    return axios.post(API_URL, data, {
      headers: authHeader()
    });
  }

  update(id, data) {
    return axios.put(API_URL + id, data, {
      headers: authHeader()
    });
  }

  remove(id) {
    return axios.delete(API_URL + id, {
      headers: authHeader()
    });
  }

  supply(id, quantity) {
    return axios.post(
      API_URL + id + "/supply",
      {
        quantity: quantity
      },
      {
        headers: authHeader()
      }
    );
  }

  sale(id, quantity) {
    return axios.post(
      API_URL + id + "/sale",
      {
        quantity: quantity
      },
      {
        headers: authHeader()
      }
    );
  }
}

export default new ProductService();