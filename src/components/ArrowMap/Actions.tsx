import dispatcher from "../../dispatcher"
import * as Actions from "./actions/AddNumber"

export function AddNumber() {
    const action = new Actions.AddNumber()
    dispatcher.dispatch(action);
}