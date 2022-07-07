
import { User, UserProps } from "./models/User";

const users = User.createUserCollection()

users.on('change', () => console.log(users))

users.fetch()
