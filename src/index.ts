import { User } from "./models/User";

const user = new User({id: 4})

user.events.on('change', ()=> alert('CHANGE!!!!'))

setTimeout(() => user.events.trigger('change'), 3000)

// user.fetch()
// user.save()