import dispatcher from "../dispatcher"
import {serverUrl} from "Config"
import axios from "axios"
import * as Actions from "./Actions"
import {IMatch} from "../../Models/DatabaseModels";

import { CreateErrorAction } from "../Error/ErrorAction";

export function getTeamMatches(team_id: number) {
    const fetch_matches = new Actions.FetchMatches();
    dispatcher.dispatch(fetch_matches);

    let url = serverUrl + "/teams/" + team_id + "/matches";

    axios.get(url).then((response) => {
        let data = response.data;
        let matches = data.map((match: IMatch) => {

        });

        const receive_matches = new Actions.ReceiveMatches(matches);
        dispatcher.dispatch(receive_matches)
    }).catch((error) => {
        CreateErrorAction(error);
    });
}

