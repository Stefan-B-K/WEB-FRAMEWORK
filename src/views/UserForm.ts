import { View } from "./View";
import { User, UserProps } from "../models/User";

export class UserForm extends View<User, UserProps> {

    get template (): string {
        return `
              <div>
                  <input placeholder="Enter user name"} />
                  <button id="set-name">${this.formIsValid ? 'Change' : 'Set'} Name</button>
                   <button id="set-age">Set Random Age</button>
                  <div>
                        <button id="save-model" class="${!this.formIsValid ? 'disabled' : ''}">Save</button>
                  </div>
              </div>
      `
    }

    get eventsMap (): { [key: string]: () => void } {
        return {
            'click:#set-age': this.onSetAgeClick,
            'click:#set-name': this.onSetNameClick,
            'click:#save-model': this.onSaveClick
        }
    }

    get formIsValid(): boolean {
        return !!this.model.get('name')
    }

    onSetAgeClick = (): void => this.model.serRandomAge()

    onSetNameClick = (): void => {
        const input = this.parentNode.querySelector('input')
        if (input && input.value.trim().length) this.model.set({ name: input.value })
    }

    onSaveClick = ():void => this.model.save()
}