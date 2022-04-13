import roll from './roll';
import { Profile, RollResult } from "./types";

export const fnp = (profile: Profile) => {

    let damage = 0;
    if (typeof profile.attacker.D === 'number') {
        damage = profile.attacker.D;
    } else {
        const [nbDicesRaw, sidesRaw] = profile.attacker.D.split('d');
        let nbDices = isNaN(parseInt(nbDicesRaw)) ? 1 : parseInt(nbDicesRaw);
        let sides = isNaN(parseInt(sidesRaw)) ? 6 : parseInt(sidesRaw);

        for (let i = 0; i < nbDices; i++) {
            damage += roll(sides);
        }
    }

    if (!profile.defender.fnp) {
        return damage;
    }

    for (let i = 0; i < damage; i++) {
        const fnpRoll = roll(6);
        if (fnpRoll >= profile.defender.fnp) {
            damage--
        }
    }

    return damage;
}

export default (profile: Profile | Profile[]): Profile[] => {

    if (!Array.isArray(profile)) {
        profile = [profile] as Profile[];
    }

    return profile.map((current) => {

        current.results.forEach(roll => {
            roll.damage = 0;

            roll.woundResult.forEach(wound => {
                switch (wound) {
                    case (RollResult.BOTCH):
                    case (RollResult.FAIL):
                        roll.damage = 0;
                        break;
                    case (RollResult.DOUBLE):
                    case (RollResult.CRIT):
                    case (RollResult.SUCCESS):
                        roll.damage = fnp(current);
                }
            })
        })

        return current;
    }, profile)
}