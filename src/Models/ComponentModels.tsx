import {Coordinate} from "./DatabaseModels"

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

    constructor(name: string, component: string, colored: boolean = false, nodes: Array<FilterNode> = new Array<FilterNode>()) {
        this.name = name;
        this.component = component;
        this.colored = colored;
        this.nodes = nodes;

        if(this.colored)
            this.setNodesColors(this.nodes);
    }

    private setNodesColors(nodes: Array<FilterNode>) {
        let colorValue = 255;
        let index = 1;

        let switchIndex = 2;
        let switchValue = false;

        for(let i = 0; i < nodes.length; i++) {
            if(colorValue % 2 != 0)
                colorValue--;

            switch(index) {
                case 1:
                    nodes[i].color = new RGBColor(colorValue, 0, 0);
                    index = 2;
                    break;
                case 2:
                    nodes[i].color = new RGBColor(0, colorValue, 0);
                    index = 3;
                    break;
                case 3:
                    nodes[i].color = new RGBColor(0, 0, colorValue);
                    index = 1;
                    break;
            }

            if(i === switchIndex){
                if(switchValue)
                    colorValue = colorValue + (colorValue / 2);
                else
                    colorValue /= 2;

                switchValue = !switchValue;
                switchIndex += 3;
            }
        }
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