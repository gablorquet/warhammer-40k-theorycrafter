import compose from 'compose-function';
import { Profile, Roll } from "./types"
import damage from './damage';
import save from './save';
import wound from './wound';
import hit from './hit';

(function () {

    const costelloSquad = [
        {
            attacker: {
                S: 8,
                AP: -2,
                D: 3,
                hit: 4,
                nbAttacks: 3
            },
            defender: {
                T: 5,
                HP: 5,
                fnp: null,
                inv: null,
                sv: 3
            },
            profileName: 'TH Terminator vs Killa Kans',
            effects: {

            }
        } as Profile
    ]

    const roll = compose(damage, save, wound, hit);

    const it = 10000;
    let res: { dead: number }[] = [];
    for (let i = 0; i < it; i++) {
        const result = roll(costelloSquad);

        res.push(...result.reduce((total, current) => {
            let hp = current.defender.HP;

            const r = current.results.reduce((t, c) => {
                if (c.damage >= hp) {
                    t.dead++;
                    hp = current.defender.HP;
                } else {
                    hp -= c.damage;
                }

                return t;
            }, {
                dead: 0
            });

            total.push(r);
            return total;
        }, []))
    }

    const avg = res.reduce((t, c) => {
        t += c.dead;
        return t;
    }, 0) / it;

    console.log(avg);

})()