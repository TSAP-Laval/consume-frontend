export class Metric {
    public id: number;
    public name: string;
    public description: string;
    public formula: string;

    constructor(id?: number, name?: string, description?: string, formula?: string) {
        this.id = id? id: undefined;
        this.name = name;
        this.description = description;
        this.formula = formula;

        this.isValid = this.isValid.bind(this);
    }

    isValid(): boolean {
        return [this.name, this.description, this.formula].every((x) => (x != undefined && x != ""));
    }
}
