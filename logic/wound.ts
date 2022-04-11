import roll from './roll';
import { rollWithEffect } from './effect';
import { RollResult, Profile, Reroll, Roll } from './types';

const woundRoll = (profile: Profile, rollMod: number = 0): RollResult => {
    const { S } = profile.attacker;
    const { T } = profile.defender;

    let val = roll(6, rollMod);

    if (val === 6) return RollResult.CRIT;
    if (val === 1) return RollResult.BOTCH;

    let target = 0;
    if (S >= T * 2) {
        target = 2;
    } else if (S > T) {
        target = 3;
    } else if (S === T) {
        target = 4;
    } else {
        target = 5;
    }

    return val >= 2 ? RollResult.SUCCESS : RollResult.FAIL;
}

export default (profile: Profile | Profile[]): Profile[] => {

    if (!Array.isArray(profile)) {
        profile = [profile] as Profile[];
    }

    return profile.map((current) => {

        current.results.forEach(roll => {
            roll.woundResult = [];
            switch (roll.hitResult) {
                case (RollResult.BOTCH):
                case (RollResult.FAIL):
                    roll.woundResult.push(RollResult.FAIL);
                    break;
                case (RollResult.DOUBLE):
                    roll.woundResult.push(rollWithEffect(current.effects.wound, current, woundRoll));
                    roll.woundResult.push(rollWithEffect(current.effects.wound, current, woundRoll));
                    break;
                case (RollResult.CRIT):
                case (RollResult.SUCCESS):
                    roll.woundResult.push(rollWithEffect(current.effects.wound, current, woundRoll));
                    break;
            }
        })

        return current;
    }, profile)
}
