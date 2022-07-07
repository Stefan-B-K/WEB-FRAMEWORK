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

const ROOT_URL = 'http://localhost:3001/users'

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
            ROOT_URL,
            (json: UserProps) => User.createUser(json)
        )
    }

    serRandomAge(): void {
        const age = Math.round(Math.random() * 100)
        this.set({ age })
    }
}
