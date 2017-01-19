import {EventEmitter} from "events"
import  IAction  from "../IAction";
import dispatcher from "../dispatcher";
import IJoueur from "./models/IJoueur";
import Status from "./models/Status";
import { PlayersReceivedAction } from './actions/genericMetricsActions';

// Represent all generic metrics data management.
class GenericMetricsStore extends EventEmitter{
    // La liste de joueurs qui sera retournée.
    data: Array<IJoueur>;
    // Le statut qui sera retourné avec l'action.
    requestStatus: Status;

    teamName: string;
    
     constructor() {
        super();
        //Initialisation des propriétés.
        this.data = [];
        this.requestStatus = Status.Idle;
        this.teamName = "";
    }

    // Retourne un array contenant des structures joueurs.
    getAllPlayers(): Array<IJoueur>{
        return this.data;
    }

    //Pour obtenir le statut de la requête.
    getRequestStatus(): Status {
        return this.requestStatus;
    }

    getTeamName(): string {
        return this.teamName;
    }

    // Permet de controler les actions qui vont être
    // émises.
    handleActions(action: IAction){
        switch(action.type) {
            case "GET_PLAYERS":
                // Va permetttre d'afficher un message de chargement
                //lors du fetch des données.
                this.requestStatus = Status.Started;
                this.emit("requestState");
                break;

            case "PLAYERS_RECEIVED":
                let act: PlayersReceivedAction = action as PlayersReceivedAction;
                this.data = act.joueurs;
                this.teamName = act.nomEquipe;
                this.emit("dataChange");

                // Initialisation du status.
                this.requestStatus = Status.Idle
                this.emit("requestState");
                break;
        }
    }
    
}

const genericMetricsStore = new GenericMetricsStore();
// On crée un register qui va recevoir les actions pour ce store.
dispatcher.register(genericMetricsStore.handleActions.bind(genericMetricsStore));
// Export the new created store.
export default genericMetricsStore;