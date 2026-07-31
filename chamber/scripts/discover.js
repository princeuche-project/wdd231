import {
    places
} from "../data/discover.mjs";

const grid = document.querySelector(".discover-grid");

places.forEach(place => {

    const card = document.createElement("article");

    card.classList.add(`card${place.id}`);

    card.innerHTML = `

<h2>${place.name}</h2>

<figure>

<img src="${place.image}"
alt="${place.name}"
loading="lazy"
width="300"
height="200">

</figure>

<address>${place.address}</address>

<p>${place.description}</p>

<button>Learn More</button>

`;

    grid.appendChild(card);

});



const message = document.querySelector("#visitMessage");

const lastVisit = localStorage.getItem("lastVisit");

const now = Date.now();

if (!lastVisit) {

    message.textContent = "Welcome! Let us know if you have any questions.";

} else {

    const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

    if (days < 1) {

        message.textContent = "Back so soon! Awesome!";

    } else {

        message.textContent = `You last visited ${days} ${days===1?"day":"days"} ago.`;

    }

}

localStorage.setItem("lastVisit", now);