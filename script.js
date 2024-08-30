let character = {
    name: '',
    gender: '',
    height: 170,
    eyeColor: '#0000ff',
    age: 0,
    career: '',
    health: 100,
    happiness: 100,
    wealth: 0,
};

function startLife() {
    character.name = document.getElementById('name').value;
    character.gender = document.getElementById('gender').value;
    character.height = parseInt(document.getElementById('height').value);
    character.eyeColor = document.getElementById('eyeColor').value;

    document.getElementById('character-customization').style.display = 'none';
    document.getElementById('status-bars').style.display = 'block';
    document.getElementById('activities').style.display = 'block';
    updateStatusBars();
    startAging();
}

function updateStatusBars() {
    document.getElementById('healthFill').style.width = character.health + '%';
    document.getElementById('happinessFill').style.width = character.happiness + '%';
    document.getElementById('wealthFill').style.width = character.wealth + '%';
    document.getElementById('ageFill').style.width = character.age + '%';

    document.getElementById('healthValue').innerText = character.health;
    document.getElementById('happinessValue').innerText = character.happiness;
    document.getElementById('wealthValue').innerText = character.wealth;
    document.getElementById('ageValue').innerText = character.age;
}

function performActivity(activity) {
    switch(activity) {
        case 'dating':
            character.happiness += 10;
            character.wealth -= 20;
            break;
        case 'gambling':
            let result = Math.random();
            if (result < 0.5) {
                character.wealth -= 50;
            } else {
                character.wealth += 100;
            }
            break;
        case 'work':
            character.wealth += 50;
            character.happiness -= 10;
            break;
        case 'volunteer':
            character.happiness += 20;
            character.wealth -= 10;
            break;
        case 'retire':
            endGame('Congratulations! You have retired.');
            return;
    }
    updateStatusBars();
}

function startAging() {
    setInterval(() => {
        character.age += 1;
        character.health -= 1;
        character.happiness -= 1;
        updateStatusBars();
        checkRandomEvent();
    }, 5000); // Increase age every 5 seconds (adjust as needed)
}

function checkRandomEvent() {
    if (Math.random() < 0.1) { // 10% chance of a random event
        showRandomEvent();
    }
}

function showRandomEvent() {
    const events = [
        'You won a small lottery! Your wealth increases by 500.',
        'You caught a cold. Your health decreases by 10.',
        'You found a new hobby. Your happiness increases by 15.',
        'You had an argument with a friend. Your happiness decreases by 20.',
    ];

    const randomEvent = events[Math.floor(Math.random() * events.length)];
    document.getElementById('randomEventMessage').innerText = randomEvent;

    if (randomEvent.includes('wealth')) {
        character.wealth += 500;
    } else if (randomEvent.includes('cold')) {
        character.health -= 10;
    } else if (randomEvent.includes('hobby')) {
        character.happiness += 15;
    } else if (randomEvent.includes('argument')) {
        character.happiness -= 20;
    }

    updateStatusBars();
    document.getElementById('random-event').style.display = 'block';
}

function closeRandomEvent() {
    document.getElementById('random-event').style.display = 'none';
}

function handleConflict(action) {
    switch(action) {
        case 'attack':
            character.health -= 20;
            break;
        case 'insult':
            character.happiness -= 10;
            break;
        case 'ignore':
            character.happiness -= 5;
            break;
        case 'befriend':
            character.happiness += 15;
            break;
    }
    updateStatusBars();
    document.getElementById('conflict-handling').style.display = 'none';
}

function handleDisease(action) {
    switch(action) {
        case 'fight':
            character.health -= 20;
            break;
        case 'ignore':
            character.health -= 10;
            break;
        case 'seekHelp':
            character.health += 10;
            break;
    }
    updateStatusBars();
    document.getElementById('disease-event').style.display = 'none';
}

function endGame(message) {
    document.getElementById('endMessage').innerText = message;
    document.getElementById('status-bars').style.display = 'none';
    document.getElementById('activities').style.display = 'none';
    document.getElementById('end-game').style.display = 'block';
}

function restartGame() {
    document.getElementById('character-customization').style.display = 'block';
    document.getElementById('end-game').style.display = 'none';
    document.getElementById('status-bars').style.display = 'none';
    document.getElementById('activities').style.display = 'none';
}
