import data from "./data.js";

export default class CardData {
    constructor(data) {
        const eachData = Object.keys(data);

        eachData.forEach(key => this[key] = data[key]);
    }
    get field() {
        return document.getElementById(this.id);
    }
    get element() {
        return document.querySelector(`[data-card="${this.id}"]`);
    }
    get submit() {
        return document.getElementById("btnConfirm");
    }
    get allFields() {
        return Array.from(document.querySelectorAll(".form input"));
    }
    get allElements() {
        return Array.from(document.querySelectorAll(`[data-card]`));
    }
    handleFill(field) {
        const value = field.value;
        const cancelCharacter = (regex) => {
            field.value = value.replace(regex, "");

            if (!field.hasAttribute("data-transition")) {
                const duration = 200;

                field.setAttribute("data-transition", "");
                field.classList.add("error");
                setTimeout(() => field.classList.remove("error"), duration);
                setTimeout(() => field.removeAttribute("data-transition"), duration * 2);
            }
        }
        const acceptCharacter = () => {
            if (this.format) {
                const reject = this.format.reject;

                if (value.match(reject))
                    cancelCharacter(reject);
                else {
                    const accept = this.format.accept;
                    const insert = this.format.insert;

                    this.handleRender(true);
                    if (value.match(accept)) 
                        field.value = value.replace(accept, insert);
                }
            } else 
                this.handleRender(true);
        }
        const finish = () => {
            const notCardName = this.id !== "cardholder";
            const className = "success";

            if (value.match(this.finished)) {
                field.classList.add(className);

                const fieldsNotFinished = this.allFields.filter(field => !field.classList.contains(className));
                
                if (fieldsNotFinished.length && notCardName) {
                    fieldsNotFinished[0].focus();
                } else if (notCardName)
                    this.submit.focus();
                
            } else
                field.classList.remove(className);
        }

        value.match(this.reject) ? cancelCharacter(this.reject) : acceptCharacter();
        finish();
    }
    handleRender(filled) {
        const value = this.field.value;

        if (!filled)
         this.field.classList.remove("success")

        if (typeof this.empty === "number") {
            const fillWithZero = (string) => string.padEnd(this.empty, 0);

            if (this.format) {
                const character = this.format.character;
                const accept = this.format.accept;
                const insert = this.format.insert;
                const valueFormatted = (string) => string.replace(accept, insert);

                if (filled && value.match(character)) {
                    const valueUnformatted = value.replaceAll(character, "");
                    const valueWithZero = fillWithZero(valueUnformatted);

                    this.element.innerText = valueFormatted(valueWithZero);
                } else
                    this.element.innerText = valueFormatted(fillWithZero(value));
            } else
                this.element.innerText = fillWithZero(value);
        } else {
            if (filled) 
                this.element.innerText = value;
            else 
                this.element.innerText = this.empty;  
        } 
    }
    setEvents() {
        const focus = () => {
            this.allElements.forEach(element => element.classList.add("not-focused"));
            this.element.classList.remove("not-focused");
        }
        const focusOut = () => {
            this.allElements.forEach(element => element.classList.remove("not-focused"));
        }
        const validate = (event) => {
            const field = event.target;
            const inputType = event.inputType;

            event.target.value ? this.handleFill(field, inputType) : this.handleRender();
        }

        this.field.addEventListener("focus", focus);
        this.field.addEventListener("focusout", focusOut);
        this.field.addEventListener("input", validate);
        this.field.addEventListener("paste", (e) => e.preventDefault());
    }
}

const handleData = () => {
    const eachData = Object.keys(data);

    eachData.forEach(dataName => {
        const dice = {id: dataName};
        const eachKey = Object.keys(data[dataName]);

        eachKey.forEach(key => dice[key] = data[dataName][key]);
        new CardData(dice).setEvents;
    });
}
handleData();