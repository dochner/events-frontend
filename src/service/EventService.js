import axios from 'axios';


export default class EventService {

    url = "http://localhost:56890/api/v1";

    getAll() {
        return axios.get(this.url + "/events");
    }

    save(data) {
        return axios.post(this.url + "/events", data)
    }

    get(id) {
        return axios.get(this.url + `/events/${id}`);
    }

    update(id, data) {
        return axios.put(this.url + `/events/${id}`, data);
    }

    delete(id) {
        return axios.delete(this.url + `/events/${id}`);
    }

    deleteAll() {
        return axios.delete(this.url + `/events`);
    }
}