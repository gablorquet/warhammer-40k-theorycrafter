import { Profile, RollResult } from './types'

export const rollWithEffect = (effect: (number | Function), profile: Profile, rollFn: Function): RollResult => {

    const modifier = typeof effect === 'function' ? 0 : effect;
    const functionMod = typeof effect === 'function' ? effect : (res: RollResult, _: Profile) => res;

    return functionMod(rollFn(profile, modifier), profile);
}
