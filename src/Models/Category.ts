export class Category {
    id: number;
    name: string;
    votingOpen: boolean;

    constructor(id: number, name: string, votingOpen: boolean) {
        this.id = id;
        this.name = name;
        this.votingOpen = votingOpen;
    }
}
