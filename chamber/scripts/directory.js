const url = "data/members.json";

async function getCompanyData() {
    const response = await fetch(url);
    const data = await response.json();

    displayMembers(data.companies);   // <-- use the correct function name
}

function displayMembers(companies) {
    members.innerHTML = "";

    companies.forEach(company => {
        const card = document.createElement("section");

        card.innerHTML = `
            <img src="${company.imageurl}"  alt="${company.name}"
            <h2>Company name: ${company.name}</h2>
            <p> Company Contact: ${company.contact}</p>
            <p>Company Address: ${company.address}</p>
            <a href="https://${company.website}" target="_blank">
                Visit Website
            </a>
        `;

        members.appendChild(card);
    });
}

const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const members = document.querySelector("#members");

gridButton.addEventListener("click", () => {
    members.classList.add("grid");
    members.classList.remove("list");
});

listButton.addEventListener("click", () => {
    members.classList.add("list");
    members.classList.remove("grid");
});

 gridButton.addEventListener("click", () => {
     members.classList.add("grid");
     members.classList.remove("list");

     gridButton.classList.add("active");
    listButton.classList.remove("active");
});

listButton.addEventListener("click", () => {
    members.classList.add("list");
    members.classList.remove("grid");

    listButton.classList.add("active");
    gridButton.classList.remove("active");
});


getCompanyData();


