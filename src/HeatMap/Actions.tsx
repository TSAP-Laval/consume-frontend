import dispatcher from "../dispatcher"
import * as Actions from "./actions/GetData"
import * as Models from "../models/IPlayerActions"

export function GetData(playerid: number) {
    const send = new Actions.GetData();
    dispatcher.dispatch(send);
    axios.get('URL')
      .then(function (response) {
        console.log(response);
        let data: Models.IPlayerActions = ExtractData(response)
        //const recieve = new Actions.RecieveData()
        //dispatcher.dispatch(recieve);
      })
      .catch(function (error) {
        console.log(error);
      });
}

function ExtractData(jsonAxios: Axios.AxiosXHR<{}>): Models.IPlayerActions {
    var jsonString: string = String(jsonAxios.data)
    let obj: Models.IPlayerActions = JSON.parse(jsonString)
    return obj
}