export const code = `function intToRoman(num: number): string {
    let roman: string = "";
    const value: number[] = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const notations: string[] = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

    for (let i = 0; num > 0 && i < value.length; i++) {
        while (num >= value[i]) {
            roman += notations[i];
            num -= value[i];
        }
    }

    return roman;
}
`;
