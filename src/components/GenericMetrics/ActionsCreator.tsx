import {IPlayer} from "../../models/DatabaseModels";
import * as Actions from "./Actions"
import dispatcher from "../Dispatcher";
import axios from 'axios';
import { CreateErrorAction } from "../Error/ErrorAction";
import * as Config from 'Config';

export function FetchPlayers(team_id: number) {
    dispatcher.dispatch(new Actions.FetchPlayers());

    let url: string = Config.serverUrl + "/stats/team/" + team_id.toString();

    axios.get(url)
        .then((response) => {
                //TODO: Définir une interface de retour pour les joueurs?
                let players: Array<IPlayer> = response.data.players As Array<IPlayer>;
                let team_name: string = response.data.name;

                dispatcher.dispatch(new Actions.OnPlayersReceived(players, team_name));
            },
            (err) => {
                CreateErrorAction(err.toString());
            });
}