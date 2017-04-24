import { EventEmitter } from "events"
import dispatcher from "../dispatcher"
import IAction from "../IAction"
import {Match} from "./Models"

class MatchesStore extends EventEmitter {
    fetching: boolean
    matches: Match[]

    constructor() {
        super()
        this.fetching = false
        this.matches = new Array<Match>()
    }

    handleActions(action: IAction) {
        switch(action.type) {

        }
    }
}

const store = new MatchesStore();
export default store;

dispatcher.register(store.handleActions.bind(store));