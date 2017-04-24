import dispatcher from "../dispatcher"
import {serverUrl} from "Config"
import axios from "axios"

import { CreateErrorAction } from "../Error/ErrorAction";

export function getAllTeamMatches(team_id: number) {
    let url = serverUrl + ""

    axios.get(url).then((response) => {

    }).catch((error) => {
        CreateErrorAction(error);
    })
}

export function getTeamMatchesBySeason(team_id: number, season_id: number) {
    let url = serverUrl + ""

    axios.get(url).then((response) => {

    }).catch((error) => {
        CreateErrorAction(error);
    })
}

export function getTeamMatchById(team_id: number, match_id: number) {
    let url = serverUrl + ""

    axios.get(url).then((response) => {

    }).catch((error) => {
        CreateErrorAction(error);
    })
}