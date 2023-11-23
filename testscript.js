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
function showDescription(cardId) {
  var description = document.getElementById("infoArea");
  const message = document.getElementById(cardId + "-description").innerHTML
  description.textContent = message;
}

function hideDescription(cardId) {
  var description = document.getElementById("infoArea");
  description.textContent = "Nothing yet";
}

// Add more game logic if needed