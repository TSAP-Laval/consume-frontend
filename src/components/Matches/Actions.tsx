import IAction from "../IAction"
import {Match, TeamActions} from "./Models"

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

export class FetchMatchActions implements IAction {
    type: string

    constructor() {
        this.type = "FETCH_MATCH_ACTIONS"
    }
}

export class ReceiveMatchActions implements IAction {
    type: string
    actions: TeamActions

    constructor(actions: TeamActions) {
        this.type = "RECEIVE_MATCH_ACTIONS"
        this.actions = actions
    }
}