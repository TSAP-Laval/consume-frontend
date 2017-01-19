import Metric from "./metric";

export interface IMatch {
    match_id: number;
    date: Date;
    opposing: {
        id: number,
        name: string
    };
    metrics: Metric[];
}

export default IMatch;