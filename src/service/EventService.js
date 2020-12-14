import axios from 'axios';
import authHeader from './auth-header';


export default class EventService {

    url = "http://localhost:56890/api/v1";

    getAll() {
        return axios.get(this.url + "/events", { headers: authHeader() });
    }

    save(data) {
        return axios.post(this.url + "/events", data, { headers: authHeader() })
    }

    get(id) {
        return axios.get(this.url + `/events/${id}`, { headers: authHeader() });
    }

    update(id, data) {
        return axios.put(this.url + `/events/${id}`, data, { headers: authHeader() });
    }

    delete(id) {
        return axios.delete(this.url + `/events/${id}`, { headers: authHeader() });
    }

    deleteAll() {
        return axios.delete(this.url + `/events`, { headers: authHeader() });
    }
}