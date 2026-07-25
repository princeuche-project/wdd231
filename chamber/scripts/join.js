const links = document.querySelectorAll("[data-modal]");

links.forEach(link => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        const modal = document.getElementById(link.dataset.modal);

        modal.showModal();

    });

});

const closeButtons = document.querySelectorAll(".close");

closeButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.closest("dialog").close();

    });

});

const timestamp = document.getElementById("timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}