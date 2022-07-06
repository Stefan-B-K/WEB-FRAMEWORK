import { Model } from "./Model";
import { Attributes } from "./Attributes";
import { Events } from "./Events";
import { SyncToAPI } from "./SyncToAPI";

export interface UserProps {
    id?: number
    name?: string
    age?: number
}

const ROOT_URL = 'http://localhost:3000/users'

export class User extends Model<UserProps> {
    static createUser (attrs: UserProps): User {
        return new User(
            new Attributes<UserProps>(attrs),
            new Events(),
            new SyncToAPI<UserProps>(ROOT_URL)
        )
    }
}
