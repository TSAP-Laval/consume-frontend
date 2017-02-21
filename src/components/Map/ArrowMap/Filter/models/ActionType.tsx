import RGBColor from "./RGBColor"

export default class ActionType {
    type: string
    used: boolean
    color: RGBColor

    constructor(type: string, used: boolean) {
        this.type = type
        this.used = used
    }

    getColor(){
        return this.color
    }

    setColor(color: RGBColor){
        this.color = color
    }

    getType(){
        return this.type
    }

    setUse(used: boolean){
        this.used = used
    }

    isUsed(){
        return this.used
    }
}