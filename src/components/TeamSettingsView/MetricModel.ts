export class Metric {
    public id: number;
    public name: string;
    public description: string;
    public formula: string;

    constructor(id?: number, name?: string, description?: string, formula?: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.formula = formula;
    }
}
