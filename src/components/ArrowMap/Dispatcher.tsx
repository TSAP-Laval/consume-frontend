import dispatcher from "../../dispatcher"
import * as Actions from "./Actions"

export function fetchArrows() {
    const arrows = new Actions.FetchArrows(1, 1)
    dispatcher.dispatch(arrows)
}