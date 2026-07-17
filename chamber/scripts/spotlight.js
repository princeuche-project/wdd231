async function getSpotlights(){

const response =
await fetch("data/members.json");

const data =
await response.json();

const qualified =
data.companies.filter(member =>

member.membershipLevel ==="Gold" ||
member.membershipLevel ==="Silver"

);

qualified.sort(()=>Math.random()-0.5);

const selected =
qualified.slice(0,3);

displaySpotlights(selected);

}

function displaySpotlights(members){

const container =
document.querySelector("#spotlights");

container.innerHTML="";

members.forEach(member=>{

const card=document.createElement("section");

card.innerHTML=`

<h3>${member.name}</h3>

<img src="${member.imageurl}"
alt="${member.name}">

<p> Contact: ${member.contact}</p>

<p> Address: ${member.address}</p>

<p>

<a href="${member.website}">
Visit Website
</a>

</p>

<p> Membership: ${member.membershipLevel}</p>

`;

container.appendChild(card);

});

}

getSpotlights();