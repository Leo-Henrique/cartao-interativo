// loader
(() => {
    const bgLoader = document.querySelector(".loader-bg");
    const showLoader = () => {
        bgLoader.classList.add("display");
        document.body.classList.add("loader-scrollbar");
        setTimeout(() => bgLoader.classList.add("show"), 20);
    }
    const hideLoader = () => {
        const minTime = 200 * 2;
        const hide = () => {
            bgLoader.classList.remove("show");
            setTimeout(() => {
                bgLoader.classList.remove("display");
                document.body.classList.remove("loader-scrollbar");
            }, 200);
        }

        setTimeout(hide, minTime);
    }
    
    showLoader();
    window.addEventListener("pageshow", hideLoader);
})();


// warning modal
export const storage = "compatible";
const modal = document.querySelector(".modal");
const openModal = () => {
    modal.classList.add("display");
    document.body.classList.add("modal-scrollbar");
    setTimeout(() => modal.classList.add("show"), 20);
}
export const closeModal = () => {
    localStorage[storage] = true;
    modal.classList.remove("display")
    document.body.classList.remove("modal-scrollbar");
}

if (!localStorage[storage]) openModal();