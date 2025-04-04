export const code = `   
   
   function isPrime(num: number): boolean {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        return true;
    }
   
   
   
   export default function rsaEncrypt(p: number, q: number, message: string): string {

        const n: number = p * q;
        const phi: number = (p - 1) * (q - 1);
        const e: number = 65537;


        const d: number = (e ** -1) % phi;

        let encryptedMessage: string = "";
        for (let i = 0; i < message.length; i++) {
            const m: number = message.charCodeAt(i);
            const c: number = (m ** e) % n;
            encryptedMessage += String.fromCharCode(c);
        }
        return encryptedMessage;

    }


    export function rsaDecrypt(p: number, q: number, encryptedMessage: string): string {
        const n: number = p * q;
        const phi: number = (p - 1) * (q - 1);
        const e: number = 65537;
        const d: number = (e ** -1) % phi;

        let decryptedMessage: string = "";
        for (let i = 0; i < encryptedMessage.length; i++) {
            const c: number = encryptedMessage.charCodeAt(i);
            const m: number = (c ** d) % n;
            decryptedMessage += String.fromCharCode(m);
        }
        return decryptedMessage;
    }
`;
