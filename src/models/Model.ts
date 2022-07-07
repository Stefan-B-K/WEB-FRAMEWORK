import { AxiosPromise } from "axios";

interface ModelAttributes<T> {
    set (update: T): void
    get<K extends keyof T> (key: K): T[K]
    getAll (): T
}

interface Sync<T> {
    fetch (id: number): AxiosPromise
    save (data: T): AxiosPromise
}

interface Events {
    on (event: string, callback: () => void): void
    trigger (event: string): void
}

export interface Identifiable {
    id?: number
}

export class Model<T extends Identifiable> {
    protected constructor (
        private attributes: ModelAttributes<T>,
        private events: Events,
        private sync: Sync<T>
    ) {}

    on = this.events.on

    trigger = this.events.trigger

    get = this.attributes.get

    set (update: T): void {
        this.attributes.set(update)
        this.events.trigger('change')
    }

    fetch (): void {
        const id = this.attributes.get('id')

        if (typeof id !== 'number') throw new Error('No data found')
        this.sync.fetch(id).then((response): void => this.set(response.data))
    }

    save (): void {
        this.sync.save(this.attributes.getAll())
            .then((_response): void => this.trigger('save'))
            .catch(() => this.trigger('error'))
    }
}