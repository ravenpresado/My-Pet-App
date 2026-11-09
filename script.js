
const animalCategory = document.getElementById("animalCategory");
const breedSelect = document.getElementById("breedSelect");
const dogImage = document.getElementById("dogImage");
const fetchButton = document.getElementById("fetchButton");
const statusText = document.getElementById("status");

const tableElements = [
    {
        element: document.getElementById("element1"),
        type: document.getElementById("type1"),
        meaning: document.getElementById("meaning1")
    },
    {
        element: document.getElementById("element2"),
        type: document.getElementById("type2"),
        meaning: document.getElementById("meaning2")
    },
    {
        element: document.getElementById("element3"),
        type: document.getElementById("type3"),
        meaning: document.getElementById("meaning3")
    }
];

const animalTypes = {
    cats: [
        "Persian", "Siamese", "Maine Coon", "Bengal",
        "Ragdoll", "Sphynx", "British Shorthair",
        "Domestic Shorthair"
    ],
    birds: [
        "Parrot", "Canary", "Cockatiel", "Budgerigar",
        "Eagle", "Owl", "Pigeon", "Peacock"
    ],
    fishes: [
        "Goldfish", "Betta Fish", "Guppy", "Clownfish",
        "Angelfish", "Koi Fish", "Tuna", "Salmon"
    ],
    horses: [
        "Arabian", "Thoroughbred", "Clydesdale",
        "Mustang", "Appaloosa", "Friesian", "Quarter Horse"
    ],
    chickens: [
        "Silkie", "Rhode Island Red", "Leghorn",
        "Plymouth Rock", "Orpington", "Sussex", "Brahma"
    ]
};

const animalDescriptions = {
    "Persian": "A long-haired cat breed known for its calm personality.",
    "Siamese": "A social cat breed known for its distinctive coloring.",
    "Maine Coon": "A large domestic cat breed with a long coat.",
    "Bengal": "A domestic cat breed known for its spotted or marbled coat.",
    "Ragdoll": "A gentle cat breed with blue eyes and a soft coat.",
    "Sphynx": "A cat breed known for its nearly hairless appearance.",
    "Parrot": "A bird known for its curved beak and intelligence.",
    "Canary": "A small songbird known for its singing.",
    "Cockatiel": "A friendly pet bird with a distinctive crest.",
    "Budgerigar": "A small, colorful parakeet often kept as a pet.",
    "Eagle": "A large bird of prey with strong eyesight.",
    "Owl": "A bird known for its large eyes and nighttime activity.",
    "Goldfish": "A freshwater fish commonly kept in aquariums.",
    "Betta Fish": "A colorful freshwater fish also called Siamese fighting fish.",
    "Guppy": "A small freshwater fish known for its colorful tail.",
    "Clownfish": "A colorful marine fish often associated with sea anemones.",
    "Arabian": "A horse breed known for its endurance and distinctive head shape.",
    "Thoroughbred": "A horse breed commonly associated with racing.",
    "Clydesdale": "A large draft horse known for its strength.",
    "Mustang": "A free-roaming horse descended from domestic horses.",
    "Silkie": "A chicken breed known for its soft, fluffy feathers.",
    "Rhode Island Red": "A chicken breed commonly raised for eggs and meat.",
    "Leghorn": "A chicken breed well known for egg production.",
    "Plymouth Rock": "A friendly chicken breed with barred feather patterns.",
    "Orpington": "A chicken breed known for its calm nature and soft feathers."
};

function formatBreedName(breed) {
    return breed
        .replace(/-/g, " ")
        .replace(/\b\w/g, letter => letter.toUpperCase());
}

// Update the information table
function updateAnimalTable(name, category) {
    const categoryNames = {
        dogs: "Dog",
        cats: "Cat",
        birds: "Bird",
        fishes: "Fish",
        horses: "Horse",
        chickens: "Chicken"
    };

    const description =
        animalDescriptions[name] ||
        `${name} is a type of ${categoryNames[category].toLowerCase()}.`;

    const information = [
        ["Animal Name", "Breed or Type", name],
        ["Animal Category", "Group", categoryNames[category]],
        ["Description", "Information", description]
    ];

    information.forEach((item, index) => {
        tableElements[index].element.textContent = item[0];
        tableElements[index].type.textContent = item[1];
        tableElements[index].meaning.textContent = item[2];
    });
}

// Load available choices for the selected category
async function loadAnimalTypes() {
    const category = animalCategory.value;

    breedSelect.innerHTML = "";

    if (category === "dogs") {
        try {
            statusText.textContent = "Loading dog breeds...";

            const response = await fetch(
                "https://dog.ceo/api/breeds/list/all"
            );

            const data = await response.json();

            if (!response.ok || data.status !== "success") {
                throw new Error("Unable to load dog breeds.");
            }

            const breeds = Object.keys(data.message).sort();

            breeds.forEach(breed => {
                const option = document.createElement("option");
                option.value = breed;
                option.textContent = formatBreedName(breed);
                breedSelect.appendChild(option);
            });

            breedSelect.value = "shihtzu";

        } catch (error) {
            statusText.textContent = "Unable to load dog breeds.";
            console.error(error);
        }

    } else {
        animalTypes[category].forEach(type => {
            const option = document.createElement("option");
            option.value = type;
            option.textContent = type;
            breedSelect.appendChild(option);
        });

        statusText.textContent = "Select an animal type and click FETCH.";
    }
}

// Fetch a dog image using Dog CEO
async function fetchDogImage(breed) {
    const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random`
    );

    const data = await response.json();

    if (!response.ok || data.status !== "success") {
        throw new Error("Unable to fetch dog image.");
    }

    return data.message;
}

// Search for other animal images using Wikimedia Commons
async function fetchOtherAnimalImage(name) {
    const category = animalCategory.value;

    const searchTerm = `${name} ${category === "fishes" ? "fish" : category.slice(0, -1)}`;

    const apiURL =
        "https://commons.wikimedia.org/w/api.php" +
        "?action=query" +
        "&generator=search" +
        "&gsrnamespace=6" +
        "&gsrlimit=20" +
        "&prop=imageinfo" +
        "&iiprop=url" +
        "&iiurlwidth=800" +
        "&format=json" +
        "&origin=*" +
        "&gsrsearch=" + encodeURIComponent(searchTerm + " filetype:bitmap");

    const response = await fetch(apiURL);
    const data = await response.json();

    if (!response.ok || !data.query || !data.query.pages) {
        throw new Error("No image found for this animal.");
    }

    const pages = Object.values(data.query.pages);

    const imagePages = pages.filter(page =>
        page.imageinfo &&
        page.imageinfo.length > 0 &&
        page.imageinfo[0].mime &&
        page.imageinfo[0].mime.startsWith("image/")
    );

    if (imagePages.length === 0) {
        throw new Error("No suitable image found.");
    }

    const randomPage =
        imagePages[Math.floor(Math.random() * imagePages.length)];

    return randomPage.imageinfo[0].thumburl ||
        randomPage.imageinfo[0].url;
}

// FETCH button function
async function fetchAnimalImage() {
    const category = animalCategory.value;
    const selectedAnimal = breedSelect.value;

    if (!selectedAnimal) {
        statusText.textContent = "Please select an animal.";
        return;
    }

    try {
        fetchButton.disabled = true;
        statusText.textContent = "Fetching animal image...";

        let imageURL;

        if (category === "dogs") {
            imageURL = await fetchDogImage(selectedAnimal);
        } else {
            imageURL = await fetchOtherAnimalImage(selectedAnimal);
        }

        dogImage.onload = () => {
            updateAnimalTable(
                category === "dogs"
                    ? formatBreedName(selectedAnimal)
                    : selectedAnimal,
                category
            );

            statusText.textContent =
                `Showing a ${selectedAnimal} image.`;

            fetchButton.disabled = false;
        };

        dogImage.onerror = () => {
            statusText.textContent = "Unable to display image. Try again.";
            fetchButton.disabled = false;
        };

        dogImage.src = imageURL;
        dogImage.style.display = "block";

    } catch (error) {
        statusText.textContent =
            "Unable to fetch image. Please try again.";

        fetchButton.disabled = false;
        console.error(error);
    }
}

// Change animal category
animalCategory.addEventListener("change", async () => {
    await loadAnimalTypes();
});

// FETCH button
fetchButton.addEventListener("click", fetchAnimalImage);

// Load app
async function initializeApp() {
    await loadAnimalTypes();
    await fetchAnimalImage();
}

initializeApp();

