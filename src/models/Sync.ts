import axios, { AxiosResponse } from "axios";

interface Identifiable {
    id?: number
}

export class Sync<T extends Identifiable> {
    constructor (public rootUrl: string) {}

    fetch (id: number): Promise<AxiosResponse> {
        return axios.get(this.rootUrl + '/' + id)
    }

    save (data: T): Promise<AxiosResponse> {
        const { id } = data
        if (id) return axios.put(this.rootUrl + '/' + id, data)
        else return axios.post(this.rootUrl, data)
    }
}