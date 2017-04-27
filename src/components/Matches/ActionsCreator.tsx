import dispatcher from "../dispatcher"
import {serverUrl} from "Config"
import axios from "axios"

import * as Actions from "./Actions"
import * as Models from "./Models"

import { CreateErrorAction } from "../Error/ErrorAction";

export function getAllTeamMatches(team_id: number) {
    const fetch_matches = new Actions.FetchMatches()
    dispatcher.dispatch(fetch_matches)

    let url = serverUrl + "/teams/" + team_id + "/matches"

    axios.get(url).then((response) => {
        var data = response.data
        var matches = data.map((match: any) => {
            let match_info = new Models.Match()

            match_info.match_id = match.id
            match_info.location = match.location
            match_info.date = new Date(match.date)
            match_info.home_team = new Models.Team()
            match_info.away_team = new Models.Team()
            match_info.home_team.name = match.home_team_name
            match_info.away_team.name = match.away_team_name

            return match_info
        })

        const receive_matches = new Actions.ReceiveMatches(matches)
        dispatcher.dispatch(receive_matches)
    }).catch((error) => {
        CreateErrorAction(error);
    })
}

export function getTeamActionsByMatch(team_id: number, match_id: number) {
    const fetch_match_actions = new Actions.FetchMatchActions()
    dispatcher.dispatch(fetch_match_actions)

    let url = serverUrl + "/teams/" + team_id + "/matches/" + match_id + "/actions"

    axios.get(url).then((response) => {
        let data = response.data
        let actions = data.map((team_actions: any) => {
            let info = new Models.TeamActions()

            info.match_id = team_actions.match_id
            info.team_id = team_actions.team_id
            info.location = team_actions.location
            info.home_team_name = team_actions.home_team_name
            info.away_team_name = team_actions.away_team_name
            info.date = team_actions.date

            info.players = team_actions.map((player: any) => {
                let player_info = new Models.Player()

                player_info.player_id = player.id
                player_info.number = player.number
                player_info.first_name = player.first_name
                player_info.last_name = player.last_name
                player_info.position = player.position

                player_info.actions = player.actions.map((action: any) => {
                    let action_info = new Models.Action()

                    action_info.action_id = action.id
                    action_info.description = action.TypeAction.name
                    action_info.is_positive = action.is_valid
                    action_info.context.player.player_id = player_info.player_id

                    action_info.start = new Models.Coordinate()
                    action_info.start.x = action.x1
                    action_info.start.y = action.y1

                    if(action.x2 != null && action.y2 != null) {
                        action_info.end = new Models.Coordinate()
                        action_info.end.x = action.x2
                        action_info.end.y = action.y2
                    }

                    return action_info
                })

                return player_info
            })
        })

        const receive_match_actions = new Actions.ReceiveMatchActions(actions)
        dispatcher.dispatch(receive_match_actions)
    }).catch((error) => {
        CreateErrorAction(error);
    })
}