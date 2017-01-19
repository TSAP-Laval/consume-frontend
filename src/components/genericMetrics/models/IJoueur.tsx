import Metric from "./metric";

// Interface représentant un joueur.
export interface IJoueur {
    id: number;
    firstName: string;
    lastName: string;
    metrics: Metric[];
}

export default IJoueur;