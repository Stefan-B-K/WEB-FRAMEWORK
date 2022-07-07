import { Collection } from "../models/Collection";

export abstract class CollectionView<T, K> {
    constructor (public parentNode: Element, public collection: Collection<T, K>) {}

    abstract renderItem(itemParentNode: Element, model: T): void

    render(): void {
        this.parentNode.innerHTML = ''

        const templateElement = document.createElement('template')

        for (let model of this.collection.models) {
            const itemParentNode = document.createElement('div')
            this.renderItem(itemParentNode, model)
            templateElement.content.append(itemParentNode)
        }
        this.parentNode.append(templateElement.content)
    }
}