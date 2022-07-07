import { CollectionView } from "./CollectionView";
import { User, UserProps } from "../models/User";
import { UserDetail } from "./UserDetail";

export class UserList extends CollectionView<User, UserProps> {
    renderItem( itemParentNode: Element, model: User): void {
            new UserDetail(itemParentNode, model).render()
    }
}