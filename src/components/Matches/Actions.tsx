import IAction from "../IAction"
import {Match, Team} from "./Models"

export class FetchMatches implements IAction {
    type: string

    constructor() {
        this.type = "FETCH_MATCHES"
    }
}

export class ReceiveMatches implements IAction {
    type: string
    matches: Match[]

    constructor(matches: Match[]) {
        this.type = "RECEIVE_MATCHES"
        this.matches = matches
    }
}