import data from "./data.js";

export const hide = (field, callback) => {
    const container = field.nextElementSibling;
    const transition = "data-transition";

    if (!container.hasAttribute(transition)) {
        container.setAttribute(transition, "");
        container.style.height = `${container.scrollHeight}px`;
        container.classList.remove("show");
        field.classList.remove("error");
        setTimeout(() => container.style.height = 0);
        setTimeout(() => {
            container.remove();
            if (callback)
                callback();
        }, 300);
    }
}

const showError = (text, field) => {
    const container = document.createElement("div");
    const element = document.createElement("span");
    const className = "error-msg";
    const duration = 300;
    const show = () => {
        field.after(container);
        const transition = "data-transition";
        const height = container.scrollHeight;
        const animation = () => {
            container.classList.add("show");
            container.style.height = `${height}px`;
            setTimeout(() => {
                container.style.removeProperty("height");
                container.removeAttribute(transition);
            }, duration)
        }

        if (!container.hasAttribute(transition)) {
            container.setAttribute(transition, "");
            container.style.height = 0;
            field.classList.add("error");
            setTimeout(animation, 20);
        }
    }
    const insertion = () => {
        const elementAfterField = field.nextElementSibling;
        const spanNotExist = !elementAfterField || !elementAfterField.classList.contains(className);

        spanNotExist ? show() : hide(field, show);
    }

    container.classList.add(className);
    container.appendChild(element);
    element.innerText = text;
    insertion();
}

const btn = document.getElementById("btnConfirm");

const success = () => {
    const form = document.querySelector(".form-fields");
    const result = form.nextElementSibling;
    const transition = "data-transition";
    const duration = 300;
    const hide = (element) => {
        if (!element.hasAttribute(transition)) {
            element.setAttribute(transition, "");
            element.classList.remove("show");
            setTimeout(() => {
                element.classList.remove("display");
                element.removeAttribute(transition);
            }, duration)
        }
    }
    const show = (element) => {
        if (!element.hasAttribute(transition)) {
            element.setAttribute(transition, "");
            element.classList.add("display");
            setTimeout(() => element.classList.add("show"), 20);
            setTimeout(() => element.removeAttribute(transition), duration + 20);
        }
    }
    const changeToForm = () => {
        hide(result)
        setTimeout(() => show(form), duration);
        btn.innerText = "Confirmar";
        btn.removeEventListener("click", changeToForm);
        btn.addEventListener("click", submit);
    }

    hide(form)
    setTimeout(() => show(result), duration);
    btn.innerText = "Continuar";
    btn.removeEventListener("click", submit);
    btn.addEventListener("click", changeToForm);
}

function submit() {
    const fieldsID = Object.keys(data);
    const fields = fieldsID.map(id => document.getElementById(id));
    const fieldsEmpty = fields.filter(field => !field.value);
    const fieldsInvalid = fields.filter(field => !field.value.match(data[field.id].finished));

    fields.forEach(field => {
        if (!field.value) 
            showError("O campo está vazio!", field);
        else if (!field.value.match(data[field.id].finished))
            showError("O formato é inválido!", field);
    });
    
    if (!fieldsEmpty.length && !fieldsInvalid.length) {
        success();
        fields.forEach(field => {
            field.value = "";
            field.classList.remove("success");
        });
    };
}

btn.addEventListener("click", submit);