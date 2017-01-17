import {IAction} from "../../interfaces"

export class AddLetter implements IAction {
    type: String;
    letter: String;

    constructor() {
        this.type = "ADD_LETTER"
        this.letter = "Z"
    }
}