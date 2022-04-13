import roll from './roll';
import { rollWithEffect } from './effect';
import { RollResult, Profile, Reroll, Roll } from './types';

const hitRoll = (profile: Profile, rollMod: number = 0): RollResult => {
    const { hit } = profile.attacker;
    let val = roll(6, rollMod);

    const result = val >= hit;

    if (val === 6) return RollResult.CRIT;
    if (val === 1) return RollResult.BOTCH;

    return result ? RollResult.SUCCESS : RollResult.FAIL;
}

export default (profile: Profile | Profile[]): Profile[] => {

    if (!Array.isArray(profile)) {
        profile = [profile] as Profile[];
    }

    return profile.map((current) => {

        const { attacker, effects } = current;
        const { nbAttacks } = attacker;

        let totalNbAttacks = nbAttacks + (current.effects?.nbAttacks || 0);

        current.results = [];

        for (let i = 0; i < totalNbAttacks; i++) {
            let result = rollWithEffect(effects.hit, current, hitRoll);

            current.results.push({
                hitResult: result
            } as Roll);
        }

        return current;
    }, profile)

}
