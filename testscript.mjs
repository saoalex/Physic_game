// Start menu


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

import {updateCards, startCards, techCard} from './card.mjs';

// Game Logic

/*Event pop-up: random events should pop-up and take half of the screen when click on end turn button,  blurring the background. 

To add events, copy-paste the title/description in the corresponding area in "const events".
*/
const events = [
  {
    title: "Event 1",
    description: "Description for Event 1... Oh my god this is such a long description I hope it doesn't mess up the display, say hows your day going?  I hope its good, cause mine is currently not going well. Have you eat? What did you eat? I bet its tasty. Anyways, What line am I on? I do hope it automatically changes."
  },
  {
    title: "Event 2",
    description: "Description for Event 2..."
  },
  {
    title: "Event 3",
    description: "Description for Event 3..."
  },
  // Add more events as needed
];


// Function to show the event when end turn button is clicked on.
document.addEventListener('DOMContentLoaded', () => {
  const endTurnButton = document.getElementById('endTurnButton');
  const eventModal = document.getElementById('event-modal');
  const closeButton = document.getElementsByClassName('close-button')[0];
  const closeEventButton = document.getElementById('close-event');
  const gameContainer = document.getElementById('gameContainer');
  const storyArea = document.getElementById('eventArea');

  endTurnButton.addEventListener('click', () => {
    // Select a random event
    const randomEvent = events[Math.floor(Math.random() * events.length)];

    // Update the modal content
    document.getElementById('event-title').textContent = randomEvent.title;
    document.getElementById('event-description').textContent = randomEvent.description;

    // Show the modal
    eventModal.style.display = 'block';

    // using updateCards to get stats for the turn and update the card list.
    // newCards, statChanges, newDescriptions = updateCards(cardList);
    

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
    const newEventDescription = `<p>Narrator: ${document.getElementById('event-description').textContent}</p>`;
    document.getElementById('eventArea').innerHTML += newEventDescription;
    // Scroll to the latest event description
    eventArea.scrollTop = eventArea.scrollHeight;
  };

  closeButton.addEventListener('click', closeModal);
  closeEventButton.addEventListener('click', closeModal);

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
