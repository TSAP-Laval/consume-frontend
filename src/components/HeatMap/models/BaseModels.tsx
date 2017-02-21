export interface ITeam {
    id: number;
    name: string;
}

export interface IZone {
    x: number;
    y: number;
    percentage: number;
    rating: number;
}

export interface IRawData {
    valid: boolean;
    x: number;
    y: number;
}

export interface IAction {
    id: number;
    TypeAction: ITypeAction;
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
    name: string;
    description: string;
}