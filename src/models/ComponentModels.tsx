import {ActionImpactId} from "./DatabaseModels";

export class ActionImpact {
    id: number;
    name: string;
    used: boolean;

    constructor(id: number, used: boolean = true) {
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

        this.used = used;
    }

    getColor() {
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
        return color;
    }
}

export class ActionType {
    id: number;
    name: string;
    used: boolean;

    constructor(id: number, name: string, used: boolean = true) {
        this.id = id;
        this.name = name;
        this.used = used;
    }
}

export class Filter {
    name: string;
    nodes: Array<FilterNode>;

    constructor(name: string, nodes: Array<FilterNode> = []) {
        this.name = name;
        this.nodes = nodes;
    }

    getNodeByValue(value: string) {
        for(let node of this.nodes) {
            if(node.value === value) {
                return node;
            }
        }
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