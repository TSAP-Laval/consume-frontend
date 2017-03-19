export default class ActionImpact {
    name: string
    is_positive: boolean
    used: boolean

    constructor(name: string, used: boolean) {
        this.name = name
        this.is_positive = (name === "Positive")
        this.used = used
    }
}