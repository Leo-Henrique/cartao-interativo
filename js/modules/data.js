const data = {
    cardholder: {
        empty: "Leonardo Henrique",
        reject: /[^a-zÀ-öù-Ź\s]/gi,
        format: {
            character: null,
            reject: null,
            accept: /(?<=\s)[a-z]/g,
            insert(...replaceArgs) {
                return replaceArgs[0].toUpperCase();
            }
        },
        finished: /([a-zÀ-öù-Ź]+\s?[a-zÀ-öù-Ź]+\s?){1,}/gi,
    },
    cardNumber: {
        empty: 4 * 4,
        reject: /[^\d\s]/g,
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
        reject: /[^\d]/g,
        finished: /\d{2}/g,
    },
    expirationYear: {
        empty: 2,
        reject: /[^\d]/g,
        finished: /\d{2}/g,
    },
    securityCode: {
        empty: 3,
        reject: /[^\d]/g,
        finished: /\d{3}/g,
    }
}

export default data;