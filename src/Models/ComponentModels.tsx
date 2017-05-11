export interface IFilterable {
    toFilterNode(): FilterNode;
}

export interface IComponent {
    readonly component_name: string
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

    constructor(label: string, value: string, used: boolean = true, color: RGBColor = new RGBColor(0,0,0)) {
        this.label = label;
        this.value = value;
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
    is_positive: boolean;

    constructor(x: number, y: number, is_positive: boolean) {
        this.x = x;
        this.y = y;
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