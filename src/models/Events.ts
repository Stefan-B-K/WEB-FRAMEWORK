
type Callback = () => void

export class Events {
    events: { [key: string]: Callback[] } = {}

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
}