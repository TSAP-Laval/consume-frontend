import dispatcher from "../dispatcher"
import * as Actions from "./actions/AddLetter"

export function AddLetter() {
    const action = new Actions.AddLetter()
    dispatcher.dispatch(action);
}