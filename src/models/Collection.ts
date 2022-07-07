import { Events } from "./Events";
import axios from "axios";

export class Collection<T, K> {
    models: T[] = []
    events: Events = new Events()

    constructor (
        public rootUrl: string,
        public deserialize: (json: K) => T
    ) {}

    get on () {
        return this.events.on
    }

    get trigger () {
        return this.events.trigger
    }

    fetch (): void {
        axios.get(this.rootUrl)
            .then(response => {
                response.data.forEach((item: K) => {
                    this.models.push(this.deserialize(item))
                })
                this.trigger('change')
            })
    }
}