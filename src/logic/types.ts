export enum RollResult {
    DOUBLE,
    SUCCESS,
    FAIL,
    BOTCH,
    CRIT
}

export enum Reroll {
    NONE,
    ONES,
    FULL
}

export type Roll = {
    hitResult: RollResult;
    woundResult: RollResult[];
    saveResult: RollResult[];
    damage: number;
}

export type Profile = {
    attacker: {
        S: number;
        AP: number;
        hit: number;
        nbAttacks: number;
        D: string | number;
    },
    defender: {
        T: number;
        HP: number;
        sv: number;
        inv: number;
        fnp: number;
    },
    profileName: string;
    effects: {
        hit?: number | ((roll: Roll, profile: Profile) => RollResult);
        wound?: number | ((roll: Roll, profile: Profile) => RollResult);
        nbAttacks?: number;
        AP?: number;
    };
    results: Roll[];
}
