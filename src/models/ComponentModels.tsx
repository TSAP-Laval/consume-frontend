import {ActionImpactId} from "./DatabaseModels";

export class ActionImpact implements IFilterable {
    id: number;
    name: string;

    constructor(id: number) {
        this.id = id;

        switch(id) {
            case -1:
                this.name = "Négatif";
                break;
            case 0:
                this.name = "Neutre";
                break;
            case 1:
                this.name = "Positif";
                break;
        }
    }

    toFilterNode() {
        let color: RGBColor;

        switch(this.id) {
            case ActionImpactId.Negative:
                color = new RGBColor(255, 0, 0);
                break;
            case ActionImpactId.Neutral:
                color = new RGBColor(0, 0, 0);
                break;
            case ActionImpactId.Positive:
                color = new RGBColor(0, 128, 0);
                break;
        }
        return new FilterNode(this.id.toString(), this.name, true, color);
    }
}

export class ActionType implements IFilterable{
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    toFilterNode() {
        return new FilterNode(this.id.toString(), this.name, true);
    }
}

export interface IComponent {
    readonly component_name: string
}

export interface IFilterable {
    toFilterNode(): FilterNode;
}

export class Filter {
    name: string;
    component: string;
    nodes: Array<FilterNode>;
    colored: boolean;

    constructor(name: string, component: string, nodes: Array<FilterNode> = new Array<FilterNode>()) {
        this.name = name;
        this.component = component;
        this.nodes = nodes;
    }
}

export class FilterNode {
    label: string;
    value: string;
    used: boolean;
    color: RGBColor;

    constructor(value: string, label: string, used: boolean = true, color: RGBColor = new RGBColor(0,0,0)) {
        this.value = value;
        this.label = label;
        this.used = used;
        this.color = color;
    }
}

export class Zone {
    x: number;
    y: number;
    percentage: number;
    rating: number;

    constructor(x: number, y: number, percentage: number, rating: number) {
        this.x = x;
        this.y = y;
        this.percentage = percentage;
        this.rating = rating;
    }
}

export class ZoneData {
    x: number;
    y: number;
    impact: number;

    constructor(x: number, y: number, impact: number) {
        this.x = x;
        this.y = y;
        this.impact = impact;
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

    toString() {
        return 'rgb(' + this.r.toString() + ", " + this.g.toString() + ", " + this.b.toString() + ")"
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