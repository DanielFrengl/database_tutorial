function isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

// Function to compute modular exponentiation
function modExp(base: number, exp: number, mod: number): number {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 === 1) result = (result * base) % mod;
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }
    return result;
}

// Function to compute modular inverse using Extended Euclidean Algorithm
function modInverse(a: number, m: number): number {
    let m0 = m, t, q;
    let x0 = 0, x1 = 1;

    if (m === 1) return 0;

    while (a > 1) {
        q = Math.floor(a / m);
        t = m;
        m = a % m;
        a = t;
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }

    return (x1 + m0) % m0;
}

// RSA Encryption Function
export function rsaEncrypt(p: number, q: number, message: string): string {
    if (!isPrime(p) || !isPrime(q)) throw new Error("p and q must be prime numbers");

    const n: number = p * q;
    const phi: number = (p - 1) * (q - 1);
    const e: number = 65537; // Common public exponent

    const encryptedMessage = message
        .split("")
        .map((char) => {
            const m: number = char.charCodeAt(0);
            const c: number = modExp(m, e, n); // Correct modular exponentiation
            return c.toString();
        })
        .join(",");

    return encryptedMessage;
}

// RSA Decryption Function
export function rsaDecrypt(p: number, q: number, encryptedMessage: string): string {
    const n: number = p * q;
    const phi: number = (p - 1) * (q - 1);
    const e: number = 65537;

    const d: number = modInverse(e, phi);
    if (d === 0) throw new Error("Invalid modular inverse!");

    const decryptedMessage = encryptedMessage
        .split(",")
        .map((char) => {
            const c: number = parseInt(char, 10);
            const m: number = modExp(c, d, n);
            return String.fromCharCode(m);
        })
        .join("");

    return decryptedMessage;
}
