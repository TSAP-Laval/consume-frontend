export interface ITeam {
    id: number;
    name: string;
}

export interface IAction {
    id: number;
    type: ITypeAction;
    is_valid: boolean;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    home_score: number;
    adv_score: number;
    time: string;
}

export interface ITypeAction {
    id: number;
    nom: string;
    description: string;
}