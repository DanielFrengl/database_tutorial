function faktorial(number: number) {


    for (let i = number; i <= number; i++)

        if (number === 0) {
            return 1;
        }
    return number * faktorial(number - 1);
}

console.log(faktorial(8));
