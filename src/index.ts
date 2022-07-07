import { User } from "./models/User"
import { UserEdit } from "./views/UserEdit";
import { UserList } from "./views/UserList";


const user = User.createUser({})
const userRoot = document.getElementById('user')

if (userRoot) new UserEdit(userRoot, user).render()
else throw new Error('Root element not found')


const users = User.createUserCollection()
const userListRoot = document.getElementById('user-list')

users.on('change', () => {
    if (userListRoot) new UserList(userListRoot, users).render()
    else throw new Error('Root element not found')
})

users.fetch()






