import {Coordinate} from "./DatabaseModels"

export interface IFilterable {
    toFilterNode(): FilterNode;
}

export class Filter {
    name: string;
    nodes: Array<FilterNode>;
    colored: boolean;

    constructor(name: string, nodes: Array<FilterNode> = new Array<FilterNode>(), colored: boolean = false) {
        this.name = name;
        this.nodes = nodes;
        this.colored = colored;
    }
}

export class FilterNode {
    label: string;
    value: string;
    used: boolean;
    color: RGBColor;

    constructor(label: string, value: string, used: boolean = true, color: RGBColor = null) {
        this.label = label;
        this.value = value;
        this.used = used;
    }
}

export class Zone {
    coordinate: Coordinate;
    percentage: number;
    rating: number;

    constructor(coordinate: Coordinate, percentage: number, rating: number) {
        this.coordinate = coordinate;
        this.percentage = percentage;
        this.rating = rating;
    }
}

export class ZoneData {
    coordinate: Coordinate;
    is_positive: boolean;

    constructor(coordinate: Coordinate, is_positive: boolean) {
        this.coordinate = coordinate;
        this.is_positive = is_positive;
    }
}

export class RGBColor {
    r: number;
    g: number;
    b: number;

    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

export class Size {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}