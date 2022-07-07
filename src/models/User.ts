import { Model } from "./Model";
import { Attributes } from "./Attributes";
import { Events } from "./Events";
import { SyncToAPI } from "./SyncToAPI";
import { Collection } from "./Collection";

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

    static createUserCollection() : Collection<User, UserProps> {
        return new Collection<User, UserProps>(
            'http://localhost:3000/users',
            (json: UserProps) => User.createUser(json)
        )
    }
}
