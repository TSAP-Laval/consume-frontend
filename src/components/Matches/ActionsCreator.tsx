import dispatcher from "../dispatcher"
import {serverUrl} from "Config"
import axios from "axios"

import * as Models from "./Models"

import { CreateErrorAction } from "../Error/ErrorAction";

export function getAllTeamMatches(team_id: number) {
    let url = serverUrl + "teams/" + team_id + "/matches"

    axios.get(url).then((response) => {
        var data = response.data
        var matches = data.map((match: any) => {
            let match_info: Models.Match

            match_info.match_id = match.id
            match_info.location = match.location
            match_info.date = new Date(match.date)
            match_info.home_team.name = match.home_team_name
            match_info.away_team.name = match.away_team_name

            return match_info
        })
    }).catch((error) => {
        CreateErrorAction(error);
    })
}

export function getTeamActionsByMatch(team_id: number, match_id: number) {
    let url = serverUrl + "teams/" + team_id + "/matches/" + match_id + "/actions"

    axios.get(url).then((response) => {
        var data = response.data
        var match_actions = data.map((match: any) => {
            let match_info: Models.Match
            match_info.match_id = match.match_id
            match_info.home_team.team_id = match.team_id
            match_info.location = match.location
            match_info.home_team.name = match.home_team_name
            match_info.away_team.name = match.away_team_name
            match_info.date = new Date(match.date)

            match_info.home_team.players = match.players.map((player: any) => {
                let player_info: Models.Player

                player_info.player_id = player.id
                player_info.number = player.number
                player_info.first_name = player.first_name
                player_info.last_name = player.last_name
                player_info.position = player.position

                player_info.actions = player.map((action: any) => {
                    let action_info: Models.Action

                    action_info.action_id = action.id
                    action_info.description = action.TypeAction.name
                    action_info.is_positive = action.is_valid
                    
                    let coord1: Models.Coordinate
                    coord1.x = action.x1
                    coord1.y = action.y1

                    action_info.start = coord1

                    if(action.x2 != -1 && action.y2 != -1) {
                        let coord2: Models.Coordinate
                        coord2.x = action.x2
                        coord2.y = action.y2

                        action_info.end = coord2
                    }
                })
            })
        })
    }).catch((error) => {
        CreateErrorAction(error);
    })
}