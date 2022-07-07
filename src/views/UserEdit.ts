import { View } from "./View";
import { User, UserProps } from "../models/User";
import { UserDetail } from "./UserDetail";
import { UserForm } from "./UserForm";

export class UserEdit extends View<User, UserProps> {
    get template (): string {
        return `
            <div>
                <div id="user-detail"></div>
                <div id="user-form"></div>
            </div>
        `;
    }

    get nodesMap (): { [key: string]: string } {
        return {
            userDetail: '#user-detail',
            userForm: '#user-form'
        }
    }

    renderNested (): void {
        new UserDetail(this.nodes.userDetail, this.model).render()
        new UserForm(this.nodes.userForm, this.model).render()
    }

}