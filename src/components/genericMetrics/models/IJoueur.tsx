import Metric from "./metric";

// Interface représentant un joueur.
export interface IJoueur {
    id: number;
    first_name: string;
    last_name: string;
    metrics: Metric[];
}

export default IJoueur;