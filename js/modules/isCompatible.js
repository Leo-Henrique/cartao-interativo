import { storage, closeModal } from "./loading.js"
export default (() => {});

if (!localStorage[storage]) closeModal();
