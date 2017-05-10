import axios from "axios"
import dispatcher from "../dispatcher"
import {CreateErrorAction} from "../Error/ErrorAction";
import {serverUrl} from "Config"

export function getActionsByMatch(team_id: number, match_id: number) {
    const fetch_match_actions = new Actions.FetchMatchActions();
    dispatcher.dispatch(fetch_match_actions);

    let url = serverUrl + "/teams/" + team_id + "/matches/" + match_id + "/actions";

    axios.get(url).then((response) => {
        const receive_match_actions = new Actions.ReceiveMatchActions();
        dispatcher.dispatch(receive_match_actions);
    }).catch((error) => {
        CreateErrorAction(error);
    });
}