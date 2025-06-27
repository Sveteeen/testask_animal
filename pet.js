let pet = null;

function createPet(name) {
    pet = {
        name,
        age: 0,
        health: 100,
        hunger: 0,
        mood: 100,
        statuss: 'alive',
        lastUpdate: Date.now()
    };
}

function calculateMood() {
    pet.mood = (pet.health + (100 - pet.hunger)) / 2;
}

function updateStatus(){
    if (!pet || pet.statuss === 'dead') return;

    const now = Date.now();  //текущее время в миллисекундах
    const minutesPassed = Math.floor((now - pet.lastUpdate) / 60000);

    for (let i = 0; i < minutesPassed; i++) {
        pet.age += 1;
        pet.hunger += 3;
        if (pet.hunger > 70) {
            pet.health -= 5;
        } else {
            pet.health -= 2;
        }
        calculateMood();
        getStatus();
        
        if (pet.statuss === 'dead') break;
    }
    pet.lastUpdate = now;
}

function getStatus() {
    if (pet.health > 30) {
        pet.statuss = "alive";
    } else if (pet.health > 0 && pet.health <= 30) {
        pet.statuss = "sick";
    } else if (pet.health <= 0 || pet.hunger >= 100) {
        pet.statuss = "dead";
    }
}

function feedPet() {
    if (pet.statuss === "dead") return false;

    pet.hunger = Math.max(0, pet.hunger - 30);
    pet.mood = Math.min(100, pet.mood + 10);
    calculateMood();
    getStatus();
    return true;
}

function healPet() {
    if (pet.statuss === "dead") return false;

    pet.health = Math.min(100, pet.health + 20);
    pet.hunger = Math.max(0, pet.hunger - 10);
    calculateMood();
    getStatus();
    return true;
}

function playPet() {
    if (pet.statuss === "dead") return false;

    pet.mood = Math.min(100, pet.mood + 15);
    pet.hunger = Math.min(100, pet.hunger + 5);
    calculateMood();
    getStatus();
    return true;
}

module.export = {
    pet,
    createPet,
    updateStatus,
    feedPet,
    healPet,
    playPet
};