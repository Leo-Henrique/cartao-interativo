const data = {
    cardholder: {
        empty: "Leonardo Henrique",
        reject: /[^a-zÀ-öù-Ź\s]/gi,
        format: {
            character: " ",
            reject: /(?<!\w)\s/,
            accept: /(?<!\w)[a-z]/g,
            insert(...replaceArgs) {
                return replaceArgs[0].toUpperCase();
            }
        },
        finished: /[a-zÀ-öù-Ź]+ [a-zÀ-öù-Ź ]+/gi,
    },
    cardNumber: {
        empty: 4 * 4,
        reject: /[^\d\s]|(?<=(\d{4}\s?){4,})\d/g,
        format: {
            character: " ",
            reject: /(?<!\d{4})\s/g,
            accept: /\d{4}(?=\d)/g,
            get insert() {
                return `$&${this.character}`
            }
        },
        finished: /(\d{4}\s){3}\d{4}/g,
    },
    expirationMonth: {
        empty: 2,
        reject: /[^\d]|(?<=\d{2})\d/g,
        finished: /0[0-9]|1[0-2]/g,
    },
    expirationYear: {
        empty: 2,
        reject: /[^\d]|(?<=\d{2})\d/g,
        finished: /2[6-9]|[3-9][0-9]/g,
    },
    securityCode: {
        empty: 3,
        reject: /[^\d]|(?<=\d{3})\d/g,
        finished: /\d{3}/g,
    }
}

export default data;