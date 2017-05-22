import axios, {AxiosResponse} from "axios"
import Dispatcher from "../Dispatcher"
import {CreateErrorAction} from "../Error/ErrorAction";
import {serverUrl} from "Config"
import * as Actions from "./Actions"
import {IActionSummary} from "../../models/DatabaseModelsSummaries"
import LoginStore from "../Login/Store";
import {Size} from "../../models/ComponentModels";


export function FetchMatchActions(team_id: number, match_id: number) {
    const fetch_match_actions = new Actions.FetchMatchActions;
    Dispatcher.dispatch(fetch_match_actions);

    let instance = axios.create({
        headers: {"X-Auth-Token": LoginStore.token}
    });

    let url = serverUrl + "teams/" + team_id + "/matches/" + match_id;

    instance.get(url).then((response: AxiosResponse) => {
        let data: IActionSummary[] = (response.data.data.actions as IActionSummary[]);
        const receive_match_actions = new Actions.ReceiveMatchActions(match_id, data);
        Dispatcher.dispatch(receive_match_actions);
    }, (err) => {
        CreateErrorAction(err);
    });
}

export function FetchMapSize(team_id: number) {

    let instance = axios.create({
        headers: {"X-Auth-Token": LoginStore.token}
    });

    let url = serverUrl + "teams/" + team_id + "/mapsize";

    instance.get(url).then((response: AxiosResponse) => {
        let data = response.data.data;
        const receive_map_size = new Actions.ReceiveMapSize(new Size(data.map_width, data.map_height));
        Dispatcher.dispatch(receive_map_size);
    }, (err) => {
        CreateErrorAction(err);
    });
}

export function SetMapSize(team_id: number, size: Size) {
    let instance = axios.create({
        headers: {"X-Auth-Token": LoginStore.token}
    });

    let url = serverUrl + "teams/" + team_id;

    instance.put(url, {map_height:size.height, map_width: size.width}).then((response) => {
    }, (err) => {
        CreateErrorAction(err);
    });
}