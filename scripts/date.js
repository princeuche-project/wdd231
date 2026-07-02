// Get current year
const year = new Date().getFullYear();

// Insert year into footer
document.getElementById("currentyear").textContent = `© ${year} Uchenna Godstime, Imo State, Nigeria. CopyRight Reserved`;

// Get last modified date
const lastModified = document.lastModified;

// Insert last modified date
document.getElementById("lastModified").textContent = `Last Modification: ${lastModified}`;