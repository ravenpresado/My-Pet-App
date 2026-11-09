
const animalCategory = document.getElementById("animalCategory");
const breedSelect = document.getElementById("breedSelect");
const imageGallery = document.getElementById("imageGallery");
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
    const animalOrigins = {
        // Dogs
        "Shih Tzu": "China",
        "Beagle": "England",
        "Bulldog": "England",
        "Chihuahua": "Mexico",
        "Dachshund": "Germany",
        "Golden Retriever": "Scotland",
        "German Shepherd": "Germany",
        "Siberian Husky": "Siberia",
        "Labrador Retriever": "Canada",
        "Poodle": "Germany and France",
        "Pomeranian": "Pomerania, Europe",
        "Pug": "China",

        // Cats
        "Persian": "Persia (modern-day Iran)",
        "Siamese": "Thailand",
        "Maine Coon": "United States",
        "Bengal": "United States",
        "Ragdoll": "United States",

        // Birds
        "Parrot": "Various tropical regions",
        "Canary": "Canary Islands",
        "Cockatiel": "Australia",
        "Budgerigar": "Australia",
        "Peacock": "South Asia",

        // Fishes
        "Goldfish": "China",
        "Betta Fish": "Southeast Asia",
        "Guppy": "South America",
        "Clownfish": "Indo-Pacific region",
        "Koi Fish": "Japan",

        // Horses
        "Arabian": "Arabian Peninsula",
        "Thoroughbred": "England",
        "Clydesdale": "Scotland",
        "Mustang": "North America",
        "Friesian": "Netherlands",

        // Chickens
        "Silkie": "China",
        "Rhode Island Red": "United States",
        "Leghorn": "Italy",
        "Plymouth Rock": "United States",
        "Orpington": "England"
    };

    const characteristics = animalDescriptions[name] ||
        `A type of ${category.slice(0, -1)} with its own unique features.`;

    const origin = animalOrigins[name] || "Origin information unavailable.";

    const information = [
        [name, "Selected Animal", name],
        [origin, "Country or Region", origin],
        [characteristics, "Characteristics", characteristics]
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
async function fetchDogImages(breed) {
    const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/images`
    );

    const data = await response.json();

    if (!response.ok || data.status !== "success") {
        throw new Error("Unable to fetch dog images.");
    }

    const shuffled = [...data.message].sort(() => Math.random() - 0.5);

    return shuffled.slice(0, 8);
}

// Search for other animal images using Wikimedia Commons

async function fetchOtherAnimalImages(name) {
    const category = animalCategory.value;

    const categoryNames = {
        cats: "cat",
        birds: "bird",
        fishes: "fish",
        horses: "horse",
        chickens: "chicken"
    };

    const searchTerm = `${name} ${categoryNames[category]}`;

    const apiURL =
        "https://commons.wikimedia.org/w/api.php" +
        "?action=query" +
        "&generator=search" +
        "&gsrnamespace=6" +
        "&gsrlimit=50" +
        "&prop=imageinfo" +
        "&iiprop=url%7Cmime" +
        "&iiurlwidth=600" +
        "&format=json" +
        "&origin=*" +
        "&gsrsearch=" + encodeURIComponent(searchTerm);

    const response = await fetch(apiURL);
    const data = await response.json();

    if (!response.ok || !data.query || !data.query.pages) {
        throw new Error("No images found.");
    }

    const pages = Object.values(data.query.pages);

    const images = pages
        .filter(page =>
            page.imageinfo &&
            page.imageinfo.length > 0 &&
            page.imageinfo[0].mime &&
            page.imageinfo[0].mime.startsWith("image/")
        )
        .map(page =>
            page.imageinfo[0].thumburl ||
            page.imageinfo[0].url
        );

    return [...new Set(images)]
        .sort(() => Math.random() - 0.5)
        .slice(0, 8);
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
        imageGallery.innerHTML = "";
        statusText.textContent = "Fetching pictures...";

        let images = [];

        if (category === "dogs") {
            images = await fetchDogImages(selectedAnimal);
        } else {
            images = await fetchOtherAnimalImages(selectedAnimal);
        }

        if (images.length === 0) {
            throw new Error("No pictures found.");
        }

        const animalName = category === "dogs"
            ? formatBreedName(selectedAnimal)
            : selectedAnimal;

        updateAnimalTable(animalName, category);

        for (let i = 0; i < images.length; i++) {
            imageGallery.innerHTML = "";

            const image = document.createElement("img");
            image.src = images[i];
            image.alt = animalName;
            image.className = "gallery-image";

            imageGallery.appendChild(image);

            statusText.textContent =
                `Showing picture ${i + 1} of ${images.length}`;

            await new Promise(resolve => setTimeout(resolve, 1500));
        }

        statusText.textContent = "Finished showing pictures!";

    } catch (error) {
        console.error("FETCH ERROR:", error);
        statusText.textContent = error.message;

    } finally {
        fetchButton.disabled = false;
    }
}



// Change animal category
animalCategory.addEventListener("change", async () => {
    await loadAnimalTypes();
});

// FETCH button
fetchButton.addEventListener("click", fetchAnimalImage);

// Load app


loadAnimalTypes();

