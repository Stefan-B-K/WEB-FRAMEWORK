import axios from "axios";
import { Events } from "./Events";

interface UserProps {
    id?: number
    name?: string
    age?: number
}

export class User {
    events: Events = new Events()

    constructor (private data: UserProps) {}

    get (prop: string): string | number | undefined {
        return this.data[prop as keyof UserProps]
    }

    set (update: UserProps): void {
        Object.assign(this.data, update)
    }

    async fetch (): Promise<void> {
        const response = await axios.get(`http://localhost:3000/users/${this.get('id')}`)
        this.set(response.data)
    }

    save(): void {
        const id = this.get('id')
        if (id) axios.put(`http://localhost:3000/users/${id}`, this.data)
        else axios.post('http://localhost:3000/users', this.data)
    }
}