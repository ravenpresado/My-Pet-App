
// Get HTML elements
const breedSelect = document.getElementById("breedSelect");
const dogImage = document.getElementById("dogImage");
const fetchButton = document.getElementById("fetchButton");
const statusText = document.getElementById("status");

// Dog CEO API endpoint
const breedAPI = "https://dog.ceo/api/breeds/list/all";

// Load all available dog breeds
async function loadBreeds() {
    try {
        statusText.textContent = "Loading dog breeds...";

        const response = await fetch(breedAPI);
        const data = await response.json();

        if (data.status !== "success") {
            throw new Error("Unable to load dog breeds.");
        }

        // Clear existing options
        breedSelect.innerHTML = "";

        // Get and sort breed names
        const breeds = Object.keys(data.message).sort();

        // Add breeds to Combo Box
        breeds.forEach(breed => {
            const option = document.createElement("option");

            option.value = breed;

            option.textContent = breed
                .replace(/-/g, " ")
                .replace(/\b\w/g, letter => letter.toUpperCase());

            breedSelect.appendChild(option);
        });

        // Select Shih Tzu by default
        breedSelect.value = "shihtzu";

        statusText.textContent = "Select a breed and click FETCH.";

        // Display initial Shih Tzu image
        await fetchDogImage();

    } catch (error) {
        statusText.textContent = "Failed to load dog breeds.";
        console.error(error);
    }
}

// Fetch a random image based on selected breed
async function fetchDogImage() {
    const selectedBreed = breedSelect.value;

    if (!selectedBreed) {
        statusText.textContent = "Please select a dog breed.";
        return;
    }

    try {
        fetchButton.disabled = true;
        statusText.textContent = "Fetching a new dog image...";

        // Create API endpoint using selected breed
        const imageAPI =
            `https://dog.ceo/api/breed/${selectedBreed}/images/random`;

        const response = await fetch(imageAPI);
        const data = await response.json();

        if (!response.ok || data.status !== "success") {
            throw new Error("Unable to fetch dog image.");
        }

        // Display fetched dog image
        dogImage.src = data.message;
        dogImage.style.display = "block";

        // Update status
        const breedName = selectedBreed
            .replace(/-/g, " ")
            .replace(/\b\w/g, letter => letter.toUpperCase());

        statusText.textContent = `Showing a random ${breedName} image.`;

    } catch (error) {
        statusText.textContent = "Unable to fetch image. Please try again.";
        console.error(error);

    } finally {
        fetchButton.disabled = false;
    }
}

// FETCH button event
fetchButton.addEventListener("click", fetchDogImage);

// Load breeds when the app opens
loadBreeds();
