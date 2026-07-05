const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

//const cards = document.querySelector("#cards");

async function getProphetsData(params) {
    const response = await fetch(url)
    const data = await response.json()
    displayProphets(data.prophets)
}
getProphetsData()

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // create a section element and store it in a variable named card using createElement(),
        let card = document.createElement("section")
        // create an h2 element and store it in a variable named "fullName",
        let fullName = document.createElement("h2")
        // create an img element and store it in a variable named "portrait",
        let portrait = document.createElement("img")
        let p1 = document.createElement("p")
        let p2 = document.createElement("p")



        //populate the heading element with the prophet's full name using a template string to build the full name,
        fullName.textContent = ` ${prophet.name} ${prophet.lastname}`
        p1.textContent = `Date of birth: ${prophet.birthdate}`
        p2.textContent = `Place of birth: ${prophet.birthplace}`
        
        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", `portrait of Prophet ${prophet.portrait}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Append the section(card) with the created elements
        card.appendChild(fullName);    //fill in the blank
        card.appendChild(p1)
        card.appendChild(p2)
        card.appendChild(portrait);
       
        

    cards.appendChild(card);
    })
}