export class Player {
    id: number;
    number: number;
    firstName: string;
    lastName: string;
    goalCount: number = 0;
    sevenScored: number = 0;
    sevenMissed: number = 0;
    twoMin: number = 0;
    yellowCards: number = 0;
    redCards: number = 0;

    constructor(
        id: number,
        number: number,
        firstName: string,
        lastName: string,
        goalCount: number = 0,
        sevenScored: number = 0,
        sevenMissed: number = 0,
        twoMin: number = 0,
        yellowCards: number = 0,
        redCards: number = 0
    ) {
        this.id = id;
        this.number = number;
        this.firstName = firstName;
        this.lastName = lastName;
        this.goalCount = goalCount;
        this.sevenScored = sevenScored;
        this.sevenMissed = sevenMissed;
        this.twoMin = twoMin;
        this.yellowCards = yellowCards;
        this.redCards = redCards;
    }
}
