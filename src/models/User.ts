import axios, { AxiosResponse } from "axios";

interface UserProps {
    id?: number
    name?: string
    age?: number
}

type Callback = () => void

export class User {
    events: { [key: string]: Callback[] } = {}

    constructor (private data: UserProps) {
    }

    get (prop: string): string | number | undefined {
        return this.data[prop as keyof UserProps]
    }

    set (update: UserProps): void {
        Object.assign(this.data, update)
    }

    on (event: string, callback: Callback): void {
        const callbacks = this.events[event] || []
        callbacks.push(callback)
        this.events[event] = callbacks
    }

    trigger (event: string): void {
        const callbacks = this.events[event]
        if (!callbacks || !callbacks.length) return
        callbacks.forEach(callback => callback())
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