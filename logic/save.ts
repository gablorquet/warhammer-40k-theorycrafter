import roll from './roll';
import { rollWithEffect } from './effect';
import { RollResult, Profile, Reroll } from './types';

const saveRoll = (profile: Profile, rollMod: number = 0): RollResult => {
    const { AP } = profile.attacker;
    const { sv, inv } = profile.defender;

    let val = roll(6, rollMod);

    let target = Math.max(sv + AP, inv);

    if (val === 6) return RollResult.CRIT;
    if (val === 1) return RollResult.BOTCH;

    return val >= target ? RollResult.SUCCESS : RollResult.FAIL;
}

export default (profile: Profile | Profile[]): Profile[] => {

    if (!Array.isArray(profile)) {
        profile = [profile] as Profile[];
    }

    return profile.map((current) => {

        current.results.forEach(roll => {

            roll.saveResult = [];

            roll.woundResult.forEach(wound => {

                switch (wound) {
                    case (RollResult.BOTCH):
                    case (RollResult.FAIL):
                        roll.saveResult.push(RollResult.FAIL);
                        break;
                    case (RollResult.CRIT):
                    case (RollResult.DOUBLE):
                        roll.saveResult.push(rollWithEffect(current.effects.AP, current, saveRoll));
                        roll.saveResult.push(rollWithEffect(current.effects.AP, current, saveRoll));
                        break;
                    case (RollResult.SUCCESS):
                        roll.saveResult.push(rollWithEffect(current.effects.AP, current, saveRoll));
                        break;
                }
            })
        })

        return current;
    }, profile)
}
