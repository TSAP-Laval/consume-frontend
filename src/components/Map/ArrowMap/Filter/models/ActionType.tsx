export default class ActionType {
    type: string
    used: boolean

    constructor(type: string, used: boolean) {
        this.type = type
        this.used = used
    }

    getType(){
        return this.type
    }

    isUsed(){
        return this.used
    }
}