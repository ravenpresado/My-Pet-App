
// PET MANAGEMENT APP

// GET HTML ELEMENTS
const petForm = document.getElementById("petForm");
const petId = document.getElementById("petId");
const petName = document.getElementById("petName");
const petType = document.getElementById("petType");
const petBreed = document.getElementById("petBreed");
const petAge = document.getElementById("petAge");
const petGender = document.getElementById("petGender");
const petDescription = document.getElementById("petDescription");

const petList = document.getElementById("petList");
const searchInput = document.getElementById("searchInput");
const filterType = document.getElementById("filterType");

const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

// LOAD SAVED PETS
let pets = JSON.parse(localStorage.getItem("pets")) || [];

// SAVE PETS TO LOCAL STORAGE
function savePets() {
    localStorage.setItem("pets", JSON.stringify(pets));
}

// GET PET ICON
function getPetIcon(type) {
    const icons = {
        Dog: "🐶",
        Cat: "🐱",
        Bird: "🐦",
        Fish: "🐠",
        Other: "🐾"
    };

    return icons[type] || "🐾";
}

// DISPLAY PETS
function displayPets() {
    const searchValue = searchInput.value.toLowerCase();
    const selectedType = filterType.value;

    const filteredPets = pets.filter(pet => {
        const matchesSearch = pet.name.toLowerCase().includes(searchValue);
        const matchesType = selectedType === "All" || pet.type === selectedType;

        return matchesSearch && matchesType;
    });

    petList.innerHTML = "";

    if (filteredPets.length === 0) {
        const message = document.createElement("p");
        message.className = "empty-message";
        message.textContent = pets.length === 0
            ? "No pets added yet. Add your first pet!"
            : "No pets found. Try another search or filter.";

        petList.appendChild(message);
        return;
    }

    filteredPets.forEach(pet => {
        const card = document.createElement("div");
        card.className = "pet-card";

        const icon = document.createElement("div");
        icon.className = "pet-icon";
        icon.textContent = getPetIcon(pet.type);

        const name = document.createElement("h3");
        name.textContent = pet.name;

        const details = document.createElement("div");

        const fields = [
            ["Type", pet.type],
            ["Breed", pet.breed],
            ["Age", `${pet.age} year(s)`],
            ["Gender", pet.gender],
            ["Description", pet.description || "No description provided."]
        ];

        fields.forEach(([label, value]) => {
            const paragraph = document.createElement("p");
            const strong = document.createElement("strong");

            strong.textContent = label + ": ";
            paragraph.append(strong, document.createTextNode(value));
            details.appendChild(paragraph);
        });

        const actions = document.createElement("div");
        actions.className = "pet-actions";

        const editButton = document.createElement("button");
        editButton.className = "edit-btn";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editPet(pet.id));

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deletePet(pet.id));

        actions.append(editButton, deleteButton);
        card.append(icon, name, details, actions);
        petList.appendChild(card);
    });
}

// ADD OR UPDATE PET
petForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const petData = {
        name: petName.value.trim(),
        type: petType.value,
        breed: petBreed.value.trim(),
        age: petAge.value,
        gender: petGender.value,
        description: petDescription.value.trim()
    };

    if (!petData.name || !petData.type || !petData.breed ||
        petData.age === "" || Number(petData.age) < 0 ||
        !petData.gender) {
        alert("Please complete all required fields.");
        return;
    }

    if (petId.value) {
        const index = pets.findIndex(pet => pet.id === petId.value);

        if (index !== -1) {
            pets[index] = {
                ...pets[index],
                ...petData
            };

            alert("Pet information updated successfully!");
        }
    } else {
        const newPet = {
            id: Date.now().toString() + Math.random().toString(36).slice(2),
            ...petData
        };

        pets.push(newPet);
        alert("Pet added successfully!");
    }

    savePets();
    displayPets();
    resetForm();
});

// EDIT PET
function editPet(id) {
    const pet = pets.find(pet => pet.id === id);

    if (!pet) return;

    petId.value = pet.id;
    petName.value = pet.name;
    petType.value = pet.type;
    petBreed.value = pet.breed;
    petAge.value = pet.age;
    petGender.value = pet.gender;
    petDescription.value = pet.description;

    formTitle.textContent = "Edit Pet Information";
    submitBtn.textContent = "Update Pet";
    cancelBtn.hidden = false;

    petForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// DELETE PET
function deletePet(id) {
    const confirmDelete = confirm("Are you sure you want to delete this pet?");

    if (confirmDelete) {
        pets = pets.filter(pet => pet.id !== id);

        savePets();
        displayPets();

        if (petId.value === id) {
            resetForm();
        }

        alert("Pet deleted successfully!");
    }
}

// RESET FORM
function resetForm() {
    petForm.reset();
    petId.value = "";

    formTitle.textContent = "Add New Pet";
    submitBtn.textContent = "Add Pet";
    cancelBtn.hidden = true;
}

// CANCEL EDIT
cancelBtn.addEventListener("click", resetForm);

// SEARCH PETS
searchInput.addEventListener("input", displayPets);

// FILTER PETS
filterType.addEventListener("change", displayPets);

// DISPLAY SAVED PETS WHEN PAGE LOADS
displayPets();
