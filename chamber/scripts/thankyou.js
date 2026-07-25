const params = new URLSearchParams(window.location.search);

document.getElementById("firstName").textContent =
    params.get("first-name");

document.getElementById("lastName").textContent =
    params.get("last-name");

document.getElementById("email").textContent =
    params.get("email");

document.getElementById("phone").textContent =
    params.get("phone");

document.getElementById("business").textContent =
    params.get("organization");

document.getElementById("timestamp").textContent =
    params.get("timestamp");