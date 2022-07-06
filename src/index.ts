import { User } from "./models/User";

const user = new User({id: 1, name: 'Some Name', age: 0})


// user.on('save', () => console.log(user))
// user.on('error', () => console.log('ERROR SAVING TO DB'))
//
// user.save()