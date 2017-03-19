import RGBColor from "./RGBColor"

export default class ActionType {
    type: string
    used: boolean
    color: RGBColor

    constructor(type: string, used: boolean) {
        this.type = type
        this.used = used
    }
}