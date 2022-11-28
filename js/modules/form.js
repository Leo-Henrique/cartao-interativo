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
                const accept = this.format.accept;
                const insert = this.format.insert;

                if (value.match(reject))
                    cancelCharacter(reject);

                if (value.match(accept))
                    field.value = value.replace(accept, insert);
            }

            this.handleRender(true);
        }

        value.match(this.reject) ? cancelCharacter(this.reject) : acceptCharacter();
    }
    handleRender(filled) {
        const value = this.field.value;

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
        } else if (filled)
            this.element.innerText = value;
        else
            this.element.innerText = this.empty;
    }
    setEvents() {
        const handleRegex = ({target: field}) => {
            field.value ? this.handleFill(field) : this.handleRender();
        }

        this.field.addEventListener("input", handleRegex);
    }
}


const handleData = () => {
    const eachData = Object.keys(data);

    eachData.forEach(dataName => {
        const dice = {id: dataName};
        const eachKey = Object.keys(data[dataName]);

        eachKey.forEach(key => dice[key] = data[dataName][key]);
        new CardData(dice).setEvents();
    });
}
handleData();


// reject characters
// standard format (insert zero)

// empty field (insert zero)

// finished field = block new characters and focus next field