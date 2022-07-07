import { Identifiable, Model } from "../models/Model";

export abstract class View<T extends Model<K>, K extends Identifiable> {
    nodes: { [p: string]: Element } = {}

    constructor (public parentNode: Element, public model: T) {
        this.model.on('change', () => this.render())
        this.model.on('save', () => location.reload())
    }

    abstract get template (): string

    get eventsMap (): { [p: string]: () => void } { return {} }

    get nodesMap (): { [p: string]: string } { return {} }

    bindEvents (fragment: DocumentFragment): void {
        for (let eventKey in this.eventsMap) {
            const [eventName, selector] = eventKey.split(':')
            fragment.querySelectorAll(selector)
                .forEach(element => element.addEventListener(eventName, this.eventsMap[eventKey]))
        }
    }

    mapNodes (fragment: DocumentFragment): void {
        for (let key in this.nodesMap) {
            const selector = this.nodesMap[key]
            const element = fragment.querySelector(selector)
            if (element) this.nodes[key] = element
        }
    }

    render (): void {
        this.parentNode.innerHTML = ''
        const templateElement = document.createElement('template')
        templateElement.innerHTML = this.template

        this.bindEvents(templateElement.content)
        this.mapNodes(templateElement.content)

        this.renderNested()

        this.parentNode.append(templateElement.content)
    }

    renderNested(): void { }
}