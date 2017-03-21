import {ActionType} from "../Models"

export class ActionImpact {
    name: string
    is_positive: boolean
    used: boolean

    constructor(name: string, used: boolean) {
        this.name = name
        this.is_positive = (name === "Positif")
        this.used = used
    }
}

export class ActionTypeFilter {
    type: ActionType
    used: boolean
    color: RGBColor

    constructor(type: ActionType, used: boolean) {
        this.type = type
        this.used = used
    }
}

export class RGBColor {
    r: number
    g: number
    b: number

    constructor(r: number, g: number, b: number) {
        this.r = r
        this.g = g
        this.b = b
    }
}