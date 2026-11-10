
const animalCategory = document.getElementById("animalCategory");
const breedSelect = document.getElementById("breedSelect");
const imageGallery = document.getElementById("imageGallery");
const fetchButton = document.getElementById("fetchButton");
const statusText = document.getElementById("status");

const tableElements = {
    element: document.getElementById("element1"),
    type: document.getElementById("type1"),
    meaning: document.getElementById("meaning1")
};

let images = [];
let currentImageIndex = 0;
let loadedAnimal = "";
let loadedCategory = "";

const animalTypes = {
    cats: ["Persian", "Siamese", "Maine Coon", "Bengal", "Ragdoll", "Sphynx", "British Shorthair", "Domestic Shorthair"],
    birds: ["Parrot", "Canary", "Cockatiel", "Budgerigar", "Eagle", "Owl", "Pigeon", "Peacock"],
    fishes: ["Goldfish", "Betta Fish", "Guppy", "Clownfish", "Angelfish", "Koi Fish"],
    horses: ["Arabian", "Thoroughbred", "Clydesdale", "Mustang", "Appaloosa", "Friesian", "Quarter Horse"],
    chickens: ["Silkie", "Rhode Island Red", "Leghorn", "Plymouth Rock", "Orpington", "Sussex", "Brahma"]
};

const animalNames = {
    dogs: "Dog",
    cats: "Cat",
    birds: "Bird",
    fishes: "Fish",
    horses: "Horse",
    chickens: "Chicken"
};

const characteristics = {
    // Dogs
    "Affenpinscher": "A small dog with a rough coat, a short face, and a lively, curious personality.",
    "African": "A medium-sized, hardy dog native to Africa, known for its adaptability, alertness, and independence.",
    "Airedale": "A large terrier with a wiry coat, known for its intelligence, courage, and playful nature.",
    "Akita": "A large, powerful dog from Japan, known for its loyalty, confidence, and thick double coat.",
    "Appenzeller": "A strong Swiss mountain dog with a tricolor coat, known for its energy, intelligence, and protective nature.",
    "Australian": "A smart and energetic herding dog, known for its intelligence and colorful coat.",
    "Bakharwal": "The Bakharwal is a large Indian mountain dog known for its strength and protective nature.",
    "Basenji": "The Basenji is a small hunting dog known for its short coat and unusual yodel-like bark.",
    "Beagle": "The Beagle is a friendly, curious hound with long ears and a strong sense of smell.",
    "Bluetick": "The Bluetick Coonhound is a hunting dog known for its blue-speckled coat and tracking ability.",
    "Borzoi": "The Borzoi is a tall, graceful dog with a long face and silky coat.",
    "Borzi": "The Borzoi is a tall, graceful dog with a long face and silky coat.",
    "Bouvier": "The Bouvier is a strong, large dog with a thick coat and hardworking nature.",
    "Boxer": "The Boxer is a muscular, playful dog known for its energy and loyalty.",
    "Brabancon": "The Brabancon is a small companion dog with a short face and expressive eyes.",
    "Briard": "The Briard is a large French herding dog with a long, wavy coat.",
    "Buhund": "The Norwegian Buhund is an energetic herding dog with pointed ears and a thick coat.",
    "Bulldog": "The Bulldog is a sturdy dog with a wrinkled face and a short, broad body.",
    "Bullterrier": "The Bull Terrier is a muscular dog recognized by its egg-shaped head and playful personality.",
    "Bullterier": "The Bull Terrier is a muscular dog recognized by its egg-shaped head and playful personality.",
    "Havanese": "The Havanese is a small, friendly dog with a soft, long coat.",
    "Hound": "Hounds are dogs known for their hunting skills and excellent sense of smell.",
    "Husky": "The Husky is a strong, energetic dog with a thick coat and striking appearance.",
    "Keeshond": "The Keeshond is a fluffy dog with a thick coat and friendly personality.",
    "Kelpie": "The Australian Kelpie is an intelligent herding dog known for its energy and agility.",
    "Kombai": "The Kombai is an Indian hunting dog known for its strength, courage, and loyalty.",
    "Komondor": "The Komondor is a large Hungarian dog with a distinctive corded coat.",
    "Kuvasz": "The Kuvasz is a large white Hungarian dog known for its protective nature.",
    "Labradoodle": "The Labradoodle is a friendly dog bred from a Labrador Retriever and a Poodle.",
    "Labrador": "The Labrador Retriever is a friendly, intelligent dog known for its love of swimming and retrieving.",
    "Lhasa": "The Lhasa Apso is a small dog with a long coat and an alert personality.",
    "Malamute": "The Alaskan Malamute is a powerful sled dog with a thick coat and strong build.",
    "Malinois": "The Belgian Malinois is an intelligent, athletic dog often trained for working tasks.",
    "Malanois": "The Belgian Malinois is an intelligent, athletic dog often trained for working tasks.",
    "Maltese": "The Maltese is a small companion dog with a long, silky white coat.",
    "Mastiff": "The Mastiff is a very large, powerful dog known for its calm and protective nature.",
    "Mexicanhairless": "The Mexican Hairless, also called Xoloitzcuintli, is an ancient dog breed known for its hairless skin.",
    "Mexucanhairless": "The Mexican Hairless, also called Xoloitzcuintli, is an ancient dog breed known for its hairless skin.",
    "Mix": "A mixed-breed dog has parents from different breeds and may have many different traits.",
    "Mountain": "Mountain dogs are generally strong breeds developed to work in cold and rugged environments.",
    "Mudhol": "The Mudhol Hound is an Indian hunting dog known for its speed, slim body, and endurance.",
    "Newfoundland": "The Newfoundland is a large, gentle dog known for its thick coat and swimming ability.",
    "Otterhound": "The Otterhound is a large hunting dog with a rough coat and excellent sense of smell.",
    "Ovcharka": "The Ovcharka is a large livestock guardian dog known for its strength and protective instincts.",
    "Papillon": "The Papillon is a small, intelligent dog recognized by its butterfly-shaped ears.",
    "Pariah": "The Pariah dog is a naturally developed dog type known for its adaptability and alertness.",
    "Pekinese": "The Pekingese is a small companion dog with a flat face and long coat.",
    "Pekingese": "The Pekingese is a small companion dog with a flat face and long coat.",
    "Pembroke": "The Pembroke Welsh Corgi is a small herding dog with short legs and a long body.",
    "Pinscher": "The Pinscher is an alert, energetic dog known for its muscular body and confident nature.",
    "Pitbull": "The Pit Bull is a muscular, energetic dog type known for its strength and affectionate nature.",
    "Pointer": "Pointers are hunting dogs known for their ability to locate and point toward game.",
    "Pomeranian": "The Pomeranian is a small dog with a fluffy coat and lively personality.",
    "Poodle": "The Poodle is an intelligent dog known for its curly coat and trainability.",
    "Pug": "The Pug is a small dog with a wrinkled face, short muzzle, and playful personality.",
    "Puggle": "The Puggle is a friendly mixed breed created from a Pug and a Beagle.",
    "Pyrenees": "The Great Pyrenees is a large, fluffy dog known for guarding livestock.",
    "Redbone": "The Redbone Coonhound is a hunting dog with a smooth red coat and strong tracking ability.",
    "Retriever": "Retrievers are friendly, intelligent dogs bred to retrieve objects during hunting.",
    "Ridgeback": "The Ridgeback is a strong, athletic dog recognized by the ridge of hair along its back.",
    "Rottweiler": "The Rottweiler is a powerful, confident dog known for its loyalty and protective nature.",
    "Rough": "The Rough Collie is a graceful herding dog with a long, thick coat.",
    "Saluki": "The Saluki is a slim, graceful hunting dog known for its speed and long ears.",
    "Samoyed": "The Samoyed is a fluffy white dog known for its friendly nature and smiling expression.",
    "Schipperke": "The Schipperke is a small, energetic Belgian dog with a thick black coat.",
    "Schnauzer": "The Schnauzer is an alert dog recognized by its bushy eyebrows and beard.",
    "Segugio": "The Segugio is an Italian hunting hound known for its strong sense of smell.",
    "Setter": "Setters are hunting dogs known for their friendly nature and ability to locate birds.",
    "Sharpei": "The Shar Pei is a dog recognized by its loose, wrinkled skin and small ears.",
    "Sheepdog": "Sheepdogs are intelligent herding dogs trained to guide and protect sheep.",
    "Shiba": "The Shiba Inu is a small Japanese dog known for its alert expression and curled tail.",
    "Shih Tzu": "The Shih Tzu is a sturdy little dog with a short snout and normally has large, dark brown eyes.",
    "Shihtzu": "The Shih Tzu is a sturdy little dog with a short snout and normally has large, dark brown eyes.",
    "Spaniel": "Spaniels are friendly dogs often bred for hunting and retrieving birds.",
    "Spitz": "Spitz dogs are known for their pointed ears, curled tails, and thick coats.",
    "Springer": "The Springer Spaniel is an energetic hunting dog known for its friendly nature.",
    "St Bernard": "The Saint Bernard is a giant, gentle dog originally bred for mountain rescue.",
    "Stbernard": "The Saint Bernard is a giant, gentle dog originally bred for mountain rescue.",
    "Terrier": "Terriers are energetic dogs originally bred to hunt small animals.",
    "Tervuren": "The Belgian Tervuren is an intelligent herding dog with a long coat.",
    "Vizsla": "The Vizsla is an athletic Hungarian hunting dog with a short, reddish-gold coat.",
    "Visla": "The Vizsla is an athletic Hungarian hunting dog with a short, reddish-gold coat.",
    "Waterdog": "Water dogs are breeds known for swimming and helping with water-related work.",
    "Weimaraner": "The Weimaraner is an athletic hunting dog known for its silver-gray coat.",
    "Whippet": "The Whippet is a slim, gentle dog known for its speed and graceful movement.",
    "Wolfhound": "The Irish Wolfhound is a giant, gentle dog with a tall body and rough coat.",

    // Cats
    "Persian": "The Persian is a long-haired cat known for its round face, short nose, and calm personality.",
    "Siamese": "The Siamese is a slender cat with blue eyes, pointed coloring, and a vocal personality.",
    "Maine Coon": "The Maine Coon is a large cat with a long coat, tufted ears, and a friendly personality.",
    "Bengal": "The Bengal is a domestic cat with a spotted or marbled coat and an active personality.",
    "Ragdoll": "The Ragdoll is a gentle cat with blue eyes, soft fur, and an affectionate nature.",
    "Sphynx": "The Sphynx is a nearly hairless cat with large ears and an affectionate personality.",
    "British Shorthair": "The British Shorthair is a sturdy cat with a dense coat, round face, and calm nature.",
    "Domestic Shorthair": "The Domestic Shorthair is a short-haired cat with different coat colors and patterns.",

    // Birds
    "Parrot": "A parrot is a colorful bird with a curved beak and strong learning ability.",
    "Canary": "The Canary is a small bird known for its beautiful singing.",
    "Cockatiel": "The Cockatiel is a friendly bird with a distinctive crest and orange cheek patches.",
    "Budgerigar": "The Budgerigar is a small, colorful parakeet known for its playful behavior.",
    "Eagle": "The Eagle is a large bird of prey with powerful wings and excellent eyesight.",
    "Owl": "The Owl is a bird with large eyes, soft feathers, and nighttime activity.",
    "Pigeon": "The Pigeon is a bird with a short neck, small head, and strong flying ability.",
    "Peacock": "The Peacock is known for its colorful feathers and large decorative tail.",

    // Fish
    "Goldfish": "The Goldfish is a freshwater fish commonly recognized by its bright orange color.",
    "Betta Fish": "The Betta Fish is a colorful freshwater fish known for its flowing fins.",
    "Guppy": "The Guppy is a small freshwater fish with colorful tails.",
    "Clownfish": "The Clownfish is an orange marine fish with white stripes.",
    "Angelfish": "The Angelfish is a freshwater fish with a tall, flattened body.",
    "Koi Fish": "The Koi Fish is a colorful ornamental carp with beautiful scale patterns.",

    // Horses
    "Arabian": "The Arabian is a horse known for its refined head, endurance, and high tail carriage.",
    "Thoroughbred": "The Thoroughbred is an athletic horse known for its speed and racing ability.",
    "Clydesdale": "The Clydesdale is a large draft horse with a strong body and feathered legs.",
    "Mustang": "The Mustang is a hardy free-roaming horse known for its strength.",
    "Appaloosa": "The Appaloosa is a horse recognized by its distinctive spotted coat.",
    "Friesian": "The Friesian is a horse known for its black coat, long mane, and graceful movement.",
    "Quarter Horse": "The Quarter Horse is a muscular horse known for its speed and versatility.",

    // Chickens
    "Silkie": "The Silkie is a chicken known for its soft, fluffy feathers and gentle personality.",
    "Rhode Island Red": "The Rhode Island Red is a chicken with rich red feathers, commonly raised for eggs.",
    "Leghorn": "The Leghorn is a lightweight chicken known for its excellent egg production.",
    "Plymouth Rock": "The Plymouth Rock is a friendly chicken with distinctive barred feathers.",
    "Orpington": "The Orpington is a large chicken with soft feathers and a calm personality.",
    "Sussex": "The Sussex is a chicken with a broad body and different feather colors.",
    "Brahma": "The Brahma is a large chicken with feathered legs and a calm temperament."
};

// Check that the required HTML elements exist
function checkElements() {
    const missing = [];

    if (!animalCategory) missing.push("animalCategory");
    if (!breedSelect) missing.push("breedSelect");
    if (!imageGallery) missing.push("imageGallery");
    if (!fetchButton) missing.push("fetchButton");
    if (!statusText) missing.push("status");

    if (!tableElements.element) missing.push("element1");
    if (!tableElements.type) missing.push("type1");
    if (!tableElements.meaning) missing.push("meaning1");

    if (missing.length > 0) {
        console.error("Missing HTML elements:", missing.join(", "));
        return false;
    }

    return true;
}

function formatBreedName(breed) {
    return breed
        .replace(/-/g, " ")
        .replace(/\b\w/g, letter => letter.toUpperCase());
}

// Update the animal information table
function updateAnimalTable(name, category) {
    if (!checkElements()) return;

    const animalName = animalNames[category] || "Animal";
    const normalizedName = name.trim().toLowerCase();

    const matchingBreed = Object.keys(characteristics).find(
        breed => breed.toLowerCase() === normalizedName
    );

    let description;

    if (matchingBreed) {
        description = characteristics[matchingBreed];
    } else {
        description = category === "dogs"
            ? `The ${name} is a dog breed.`
            : `The ${name} is a type of ${animalName.toLowerCase()}.`;
    }

    tableElements.element.textContent = animalName;
    tableElements.type.textContent = name;
    tableElements.meaning.textContent = description;
}

// Load animal choices
async function loadAnimalTypes() {
    if (!checkElements()) return;

    const category = animalCategory.value;

    breedSelect.innerHTML = "";
    images = [];
    currentImageIndex = 0;
    loadedAnimal = "";
    loadedCategory = "";
    imageGallery.innerHTML = "";

    statusText.textContent = "Loading animal choices...";

    if (category === "dogs") {
        try {
            const response = await fetch("https://dog.ceo/api/breeds/list/all");
            const data = await response.json();

            if (!response.ok || data.status !== "success") {
                throw new Error("Unable to load dog breeds.");
            }

            Object.keys(data.message).sort().forEach(breed => {
                const option = document.createElement("option");
                option.value = breed;
                option.textContent = formatBreedName(breed);
                breedSelect.appendChild(option);
            });

        } catch (error) {
            statusText.textContent = "Unable to load dog breeds.";
            console.error(error);
            return;
        }
    } else {
        animalTypes[category].forEach(type => {
            const option = document.createElement("option");
            option.value = type;
            option.textContent = type;
            breedSelect.appendChild(option);
        });
    }

    statusText.textContent = "Select an animal and click FETCH.";
}

// Fetch dog images
async function fetchDogImages(breed) {
    const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/images`
    );

    const data = await response.json();

    if (!response.ok || data.status !== "success") {
        throw new Error("Unable to fetch dog images.");
    }

    return [...data.message]
        .sort(() => Math.random() - 0.5)
        .slice(0, 8);
}

// Fetch other animal images
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
        "?action=query&generator=search&gsrnamespace=6&gsrlimit=50" +
        "&prop=imageinfo&iiprop=url%7Cmime&iiurlwidth=600" +
        "&format=json&origin=*&gsrsearch=" +
        encodeURIComponent(searchTerm);

    const response = await fetch(apiURL);
    const data = await response.json();

    if (!response.ok || !data.query || !data.query.pages) {
        throw new Error("No images found.");
    }

    const pages = Object.values(data.query.pages);

    return [...new Set(
        pages
            .filter(page =>
                page.imageinfo &&
                page.imageinfo.length > 0 &&
                page.imageinfo[0].mime &&
                page.imageinfo[0].mime.startsWith("image/")
            )
            .map(page =>
                page.imageinfo[0].thumburl || page.imageinfo[0].url
            )
    )].sort(() => Math.random() - 0.5).slice(0, 8);
}

// Display only ONE image at a time
function displayCurrentImage(animalName) {
    imageGallery.innerHTML = "";

    const image = document.createElement("img");
    image.src = images[currentImageIndex];
    image.alt = animalName;
    image.className = "gallery-image";

    imageGallery.appendChild(image);
    statusText.textContent = "";
}

// FETCH button: each click displays the next image
async function fetchAnimalImage() {
    if (!checkElements()) return;

    const category = animalCategory.value;
    const selectedAnimal = breedSelect.value;

    if (!selectedAnimal) {
        statusText.textContent = "Please select an animal.";
        return;
    }

    fetchButton.disabled = true;

    try {
        const animalName = category === "dogs"
            ? formatBreedName(selectedAnimal)
            : selectedAnimal;

        if (
            selectedAnimal !== loadedAnimal ||
            category !== loadedCategory
        ) {
            statusText.textContent = "Fetching pictures...";
            imageGallery.innerHTML = "";

            if (category === "dogs") {
                images = await fetchDogImages(selectedAnimal);
            } else {
                images = await fetchOtherAnimalImages(selectedAnimal);
            }

            if (images.length === 0) {
                throw new Error("No pictures found.");
            }

            loadedAnimal = selectedAnimal;
            loadedCategory = category;
            currentImageIndex = 0;

            updateAnimalTable(animalName, category);

        } else {
            currentImageIndex++;

            if (currentImageIndex >= images.length) {
                currentImageIndex = 0;
            }
        }

        displayCurrentImage(animalName);

    } catch (error) {
        console.error("FETCH ERROR:", error);
        statusText.textContent = error.message;

    } finally {
        fetchButton.disabled = false;
    }
}

// Event listeners
if (checkElements()) {
    animalCategory.addEventListener("change", loadAnimalTypes);

    breedSelect.addEventListener("change", () => {
        images = [];
        currentImageIndex = 0;
        loadedAnimal = "";
        loadedCategory = "";
        imageGallery.innerHTML = "";
        statusText.textContent = "Click FETCH to see pictures.";
    });

    fetchButton.addEventListener("click", fetchAnimalImage);

    // Open dropdown only when the arrow is clicked
    const categoryArrow = document.getElementById("categoryArrow");
    const breedArrow = document.getElementById("breedArrow");

    if (categoryArrow) {
        categoryArrow.addEventListener("click", () => {
            animalCategory.showPicker();
        });
    }

    if (breedArrow) {
        breedArrow.addEventListener("click", () => {
            breedSelect.showPicker();
        });
    }

    // Initial loading
    loadAnimalTypes();
}
