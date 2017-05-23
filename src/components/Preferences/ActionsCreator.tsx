import axios, {AxiosResponse} from "axios"
import Dispatcher from "../Dispatcher"
import {CreateErrorAction} from "../Error/ErrorAction";
import {serverUrl} from "Config"
import * as Actions from "./Actions"
import {Size} from "../../models/ComponentModels";

export function FetchMapSize(team_id: number, token: string) {

    let instance = axios.create({
        headers: {"X-Auth-Token": token}
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

export function SetMapSize(team_id: number, size: Size, token: string) {
    let instance = axios.create({
        headers: {"X-Auth-Token": token}
    });

    let url = serverUrl + "teams/" + team_id;

    instance.put(url, {map_height:size.height, map_width: size.width}).then((response) => {
    }, (err) => {
        CreateErrorAction(err);
    });
}