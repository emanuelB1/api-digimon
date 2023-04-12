const digimonContainer = document.querySelector(".digimon-container")
const spinner = document.querySelector("#spinner");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const search = document.querySelector(".btn-outline-primary");
let offset = 0;
let limit = 8;
let lista = document.querySelector(".custom-select");


fetch("https://digimon-api.vercel.app/api/digimon")
.then(res => res.json())
.then(data => {
    for (let dato of data) {
        lista.innerHTML += 
    `   
    <option><a class="dropdown-item" value="${dato.name}"href="#">${dato.name}</a></option>
    
    `
    }

       
});




lista.addEventListener("click", () => {
    remove(digimonContainer);
    var nombre = lista.value;
    fetchDigimonName(nombre);
        previous.addEventListener("click", () => {
            location.reload()
            })
        
        next.addEventListener("click", () => {
            location.reload()
            })
})

    



previous.addEventListener("click", () => {
    if (offset != 0) {
        offset -= 9;
        remove(digimonContainer);
        fetchDigimons(offset, limit);
    }
    
})
next.addEventListener("click", () => {
    offset += 9;
    remove(digimonContainer);
    fetchDigimons(offset, limit);
})

function fetchDigimon(num) {
    fetch("https://digimon-api.vercel.app/api/digimon")
    .then(res => res.json())
    .then(data => {
        createDigimon(data[num]);
        spinner.style.display = "none";
        
    });
}

function fetchDigimonName(name) {
    fetch(`https://digimon-api.vercel.app/api/digimon/name/${name}`)
    .then(res => res.json())
    .then(data => {
        createDigimon(data[0])
        spinner.style.display = "none";
        
    });
}




search.addEventListener("click", () => {
    remove(digimonContainer);
    var nombre = document.querySelector(".form-control").value;
    fetchDigimonName(nombre);
        previous.addEventListener("click", () => {
            location.reload()
            })
        
        next.addEventListener("click", () => {
            location.reload()
            })
})



function fetchDigimons(offset, limit) {
    spinner.style.display = "block";
    for (let i = offset; i <= offset + limit; i++) {
        fetchDigimon(i);
    }
}

function createDigimon(digimon) {
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);

    const card = document.createElement("div");
    card.classList.add("digimon-block");
    
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("img-container");

    const imagen = document.createElement("img");
    imagen.src = digimon.img

    imageContainer.appendChild(imagen)

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = digimon.name

    const level = document.createElement("p");
    level.classList.add("level");
    level.textContent = digimon.level

    card.appendChild(imageContainer);
    card.appendChild(name);
    card.appendChild(level);
    
    const cardBack = document.createElement("div");
    cardBack.classList.add("digimon-block-back");
    
    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);

    digimonContainer.appendChild(flipCard);
}



function remove(page) {
    while (page.firstChild) {
        page.removeChild(page.firstChild);
    }
}

fetchDigimons(offset, limit);