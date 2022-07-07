import { View } from "./View";
import { User, UserProps } from "../models/User";

export class UserDetail extends View<User, UserProps>{
    get template (): string {
        return `
        <div class="card">
            <p>User: ${this.model.get('name') ?? ''}</p>
             <p>Age: ${this.model.get('age') ?? ''}</p>
       </div>     
        `;
    }
}