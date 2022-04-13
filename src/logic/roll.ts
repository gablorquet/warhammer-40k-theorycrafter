export default (sides = 6, rollMod = 0) => {
    const result = Math.floor(Math.random() * sides) + 1;
    let val = Math.max(Math.min(result + rollMod, 6), 1);

    return val;
}
