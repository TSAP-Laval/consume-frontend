import {IAction} from "../../../interfaces"

export class AddNumber implements IAction {
    type: String;
    key: number;

    constructor() {
        this.type = "ADD_NUMBER"
    }
}