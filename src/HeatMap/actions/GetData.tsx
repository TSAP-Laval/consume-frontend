import {IAction} from "../../interfaces"

export class GetData implements IAction {
    type: String;

    constructor() {
        this.type = "GET_ZONES"
    }
}

export class RecieveData implements IAction {
    type: String;
    percentages: number[];
    ratings: number[];

    constructor(percentages: number[], ratings: number[]){
        this.type = "RECIEVE_ZONES"
        this.percentages = percentages;
        this.ratings = ratings;
    }
}