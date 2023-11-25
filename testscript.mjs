import {updateCards, startCards, techCard} from './card.mjs';

// Universal constants
let resources = {
  wealth: 100,
  happiness: 100,
  science: 100
}

const events = [
  {
    title: "Barbarians attack!",
    description: "Your military has failed to defend your borders against barbarian tribes. Your state is being invaded and your great cities are being sacked! There is chaos on the streets and the barbarians are plundering your treasury. <br> Reduce gold: 5% <br> Reduce happiness: 50%",
    effect: {wealth: 5, happiness: 50}
  },
  {
    title: "Piracy and Thievery",
    description: "It’s tough being rich. Pirates have attacked your convoy and stolen a great amount of treasure. Just hope it wasn’t the convoy with your greatest new technology! <br>Reduce gold: 8% <br>Reduce your happiness 10%",
    effect: {wealth: 8, happiness: 10}
  },
  {
    title: "War with neighbouring states",
    description: "You have been dragged into a brutal war with your neighbours that leaves your society devastated and treasury depleted. Your peaceful focus on technological development is thrown into chaos. <br> Reduce gold: 30% <br> Reduce happiness: 40%",
    effect: {wealth: 30, happiness: 40}
  },
  {
    title:"Famine",
    description: "A combination of drought and disease have blighted your crops. The harvest has failed again and your people are on the brink of starvation <br>Reduce gold:50% <br>Reduce happiness: 75%",
    effect: {wealth: 50, happiness: 75}
  },
  {
    title:"Plague",
    description:"A deadly plague envelops your lands. It spreads like fire among the populace, killing countless scores and disabling many others. The destruction of productivity is profound. <br>Reduce gold: 30% <br>Reduce happiness: 75%",
    effect:{wealth: 30, happiness: 75}
  },
  {
    title:"Earhquake/Tsunami",
    description: "Seismic activity below the Earth’s surface triggers a shock, either on land or on water. This results in much of your civilization being reduced to rubble. <br>Reduce gold: 40% <br>Reduce happiness: 50%",
    effect:{wealth: 30, happiness: 50}
  },
  {
    title:"Flood",
    description: "Rising water levels flood your civilization, stranding and drowning many of your citizens. <br>Reduce gold: 35% <br>Reduce happiness: 45%",
    effect: {wealth: 35, happiness: 45}
  },
  {
    title:"Tropical cyclone",
    description:"A tropical cyclone touches down on your civilization. The slew of thunderstorms and tornadoes damage much of your society. <br>Reduce gold: 25% <br>Reduce happiness: 35%",
    effect: {wealth: 25, happiness: 35}
  },
  {
    title: "Recession",
    description: "Economic mismanagement and reckless speculation has your economy in shambles. The suffering populace start losing faith in your rule and are more reluctant to invest in frivolous research. <br>Reduce gold: 50% <br>Reduce happiness: 60%",
    effect: {wealth: 50, happiness: 60}
  },
  {
    title: "New land acquired",
    description: "Congrats, you just acquired new lands and have expanded your nation! This brings new peoples and new fortunes, increasing the potential of your civilization. (Just don’t ask us whose land it is or how we acquired it…)<br>Increse gold: 15% <br>Increase happiness: 30%",
    effect: {wealth: -15, happiness: -30}
  },
  {
    title:"Higher birthrate",
    description:"Something is in the air and more babies are being born than ever before! This baby boom brings some growing pains but will provide many new labourers and thinkers to increase the greatness of your civilization. <br>Increase gold: 10% <br>Increase happiness: 20%",
    effect: {wealth: -10, happiness: -20}
  },
  {
    title:"New technology from the foreign lands",
    description:"Your traders discovered a new technology used in a distant land. They have brought it back for you to study and apply in your civilization. <br>Increase happiness: 10% <br>Unlocks new technology for free",
    effect: {happiness: -10}
  },
  {
    title:"Science prophet born",
    description: "Some people are just born different. Such is the case with this prodigious child born in your capital. At the age of six, she is impressing your scholars. Her gifts will be numerous. <br>Increase happiness: 15% <br>Increase science: 15%",
    effect: {happiness: -15, science:-15}
  },
  {
    title: "Increase of state funding",
    description: "The state recognizes the importance of basic research and opens its wallet to the desires of scientists and scholars. Others might feel neglected, though. <br>Increase gold: 30% <br>Increase science: 25% <br>Reduce happiness: 15%",
    effect: {wealth: -30, happiness: 15, science: -25}
  },
  {
    title: "Agriculture surplus",
    description: "You have vast stores of crops, much more than what is necessary to feed your people at the moment. This attracts hungry stragglers, eager to bow to your rule for a morsel of food, and fellow leaders of civilizations, eager to buy crops from you to feed their people. <br>Increase gold: 35% <br>Increase happiness: 45%",
    effect: {wealth: -35, happiness: -45}
  }
];


// Initilization code of Start menu
document.addEventListener('DOMContentLoaded', (event) => {
  /*
  Right now there is only a start button
  */
  const startButton = document.getElementById('startButton');
  const gameContainer = document.getElementById('gameContainer');
  const menuContainer = document.getElementById('menuContainer');

  startButton.addEventListener('click', () => {
    // Hide the menu and show the game container
    menuContainer.style.display = 'none';
    gameContainer.style.display = 'block';
  });

});


/*Event pop-up: random events should pop-up and take half of the screen when click on end turn button,  blurring the background. 
To add events, copy-paste the title/description in the corresponding area in "const events".
*/

//fnuction to apply event affects
function triggerEvent(event) {
  // Apply the negative percentage effects on resources
  for (const resource in event.effect) {
    if (resources.hasOwnProperty(resource)) {
      const decreaseAmount = resources[resource] * (event.effect[resource] / 100);
      resources[resource] -= decreaseAmount;
    }
  }

  // Ensure resources don't go negative
  /*
  for (const resource in resources) {
    if (resources[resource] < 0) {
      resources[resource] = 0;
    }
  }*/

  // Update UI or other game elements based on new resource values
  updateResourceDisplay();
}

//function to update the resources
function updateResourceDisplay() {
  // Example:
  document.getElementById('wealthBar').textContent = Math.round(resources.wealth);
  document.getElementById('happinessBar').textContent = Math.round(resources.happiness);
  document.getElementById('scienceBar').textContent = Math.round(resources.science)
}

// Function to show the event when end turn button is clicked on.
document.addEventListener('DOMContentLoaded', () => {
  const endTurnButton = document.getElementById('endTurnButton');
  const eventModal = document.getElementById('event-modal');
  const closeButton = document.getElementsByClassName('close-button')[0];
  const closeEventButton = document.getElementById('close-event');
  const gameContainer = document.getElementById('gameContainer');
  const storyArea = document.getElementById('eventArea');

  endTurnButton.addEventListener('click', () => {
    // Select a random event and trigger its effects
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    triggerEvent(randomEvent)

    // Update the modal content
    document.getElementById('event-title').textContent = randomEvent.title;
    document.getElementById('event-description').innerHTML = randomEvent.description;

    // Show the modal
    eventModal.style.display = 'block';

    // card populate
    cardList.forEach(card => {
      if (card._card.classList.contains('highlighted')) {
        populateCards(card.hardChildren);
        cardList.concat(card.hardChildren);
        card._card.classList.remove('highlighted');
        card.hide()
      }
    })
  });

  const closeModal = () => {
    eventModal.style.display = 'none';
    // Append new event description to the existing content
    const newEventDescription = `<p>Narrator: ${document.getElementById('event-title').textContent}</p>`;
    document.getElementById('eventArea').innerHTML += newEventDescription;
    // Scroll to the latest event description
    eventArea.scrollTop = eventArea.scrollHeight;
  };

  closeButton.addEventListener('click', closeModal);
  closeEventButton.addEventListener('click', closeModal);

});



// Intialization code for restart button
document.addEventListener('DOMContentLoaded', () => {
  const restartButton = document.getElementById('restartButton');
  restartButton.addEventListener('click', () => {
    location.reload(); // Reloads the current page
  });
});



// (Test) function for showing card decription
/*
const cards = [
  { id: 1, title: "Card 1", available: true, unlock: [2,3], cost: 5, increase: 3, description: "Description for Card 1...", imageUrl: "library/backgrounds/stone_age.png" },
  { id: 2, title: "Card 2", available: false, unlock: [], cost: 4, increase: 2, description: "Description for Card 2..." },
  { id: 3, title: "Card 3", available: false, unlock: [4], cost: 6, increase: 5, description: "This again is another very long description that probably will take up the whole info area, at least I hope it will. But hey you know what, Welcome to the cyber age! Hackers have infiltrated your computer systems and compromised some of your most valuable secrets. This is annoying but manageable, as long as they did not encrypt the files describing your latest and greatest invention. So what do you think about this? You probably will lose some money and stuff, also a lot of sanity too, as if this description itself is not bad enough. But everything to the side, hope you have a great day and see ya.", imageUrl: "library/backgrounds/future.png"},
  {id: 4, title: "Card 4", available: false, unlock: [], cost: 7, increase: 10, description: "Why are you stil here."}
  // Add more card objects here
];

function populateCards() {
  const cardArea = document.getElementById('cardContainer');

  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.innerHTML = `
      <div class="card-title">${card.title}</div>
      <div class="card-cost">Cost: ${card.cost}</div>
      <div class="card-increase">Increase: ${card.increase}</div>
    `;

    cardElement.addEventListener('mouseenter', () => {
      const descriptionArea = document.getElementById('infoArea');
      descriptionArea.innerHTML = `
        <div class="description-content">
          <img src="${card.imageUrl}" alt="${card.title}" class="card-image">
          <div class="card-info">
            <h3 class="card-title">${card.title}</h3>
            <p>${card.description}</p>
          </div>
        </div>
      `;
    });

    });
    cardArea.appendChild(cardElement);
  });
}
*/





var cardList = startCards();

function populateCards(cardList) {
  const cardArea = document.getElementById('cardContainer');
  cardList.forEach(card => {
    card.appendTo(cardArea);
  });
  
}

/*
function populateCards() {
  const cardArea = document.getElementById('cardContainer');

  var cards = startCards();

  cards.forEach(card => {
    cardArea.appendChild(card._card)
  });
}
*/

document.addEventListener('DOMContentLoaded', () => {
  populateCards(cardList);
});



/*
function showDescription(cardId) {
  var description = document.getElementById("infoArea");
  const message = document.getElementById(cardId + "-description").innerHTML
  description.textContent = message;
}

function hideDescription(cardId) {
  var description = document.getElementById("infoArea");
  description.textContent = "Nothing yet";
}
*/
// Add more game logic if needed
