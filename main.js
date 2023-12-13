//#region Class for Cards
class techCard {
  /* 
  This class requires there to be a css section for:
  .card
  .card-title
  .card-value
  .highlighted
  */


  constructor(name, cost, description, gpt, happiness, science) {
      this._name = name;
      this._cost = cost;
      this._description = description; // This is the description that will display after this card has been used.
      this._gpt = gpt; // This is gold per turn.
      this._happiness = happiness;
      this._science = science; // This is societal support
      this._hardChildren = [];
      this._softChildren = [];

      // Creating a card display here
      this._card = this.createCard();
      this.addClickEvent()
  }

  get name() {
      return this._name;
  }

  get cost() {
      return this._cost;
  }

  get description() {
      return this._description;
  }

  get gpt() {
      return this._gpt;
  }

  get happiness() {
      return this._happiness;
  }

  get science() {
      return this._science;
  }

  get hardChildren() {
      return this._hardChildren;
  }

  get softChildren() {
      return this._softChildren;
  }

  // Function to add a hard child to the card
  addHardChild(childCard) {
      this.hardChildren.push(childCard);
      // Update the displayed number of hard children
      // this.updateHardChildrenCount();
  }

  // Function to add a soft child to the card
  addSoftChild(childCard, discount) {
      /**
       * Adds a soft child and a discount value to the card.
       * 
       * Stores both as a two value array. The 0th index is the card, the 1st index is the discount.
       */
      
      const newChild = [childCard, discount];
      this.softChildren.push(newChild);
  }

  createCard() {
      /* 
      This method creates a div html element with class name researchCard.
      
      use .researchCard to update the css for this.

      The html card includes the title, the gold per turn as gpt, the science, and happiness given by the card.
      */
      
      const new_card = document.createElement('div');
      new_card.className = 'card';
      new_card.innerHTML = `<div class="card-title">${this._name}</div>
                      <div class="card-value">Cost: ${this._cost} </div>
                      <div class="card-value">+${this._gpt} Gold per Turn</div>
                      <div class="card-value">+${this._happiness} Happiness</div>
                      <div class="card-value">+${this._science} Support</div>`;

      return new_card;
  }

  addClickEvent() {
      /* 
      When the card is clicked, this function will highlight the card.
      */
      this._card.addEventListener('click', () => {
        this.toggleHighlight();
      });
  }

  toggleHighlight() {
      /* 
      This function is a helper for the click event. It will cause the card to take on a new html class "highlighted". 
      The purpose of highlighted is to show the player that a card has been selected.

      Clicking once will highlight on. Clicking again will highlight off.
      */
      this._card.classList.toggle('highlighted');
  }

  
  appendTo(parentElement) {
      /* 
      This function is used to place the card in the desired element in the html.
      
      Example use:
      techCard1.appendTo(document.body);

      This line will place the card in the body of the document.
      */
      parentElement.appendChild(this._card);
  }

  
  show() {
      /* 
      Once the card is placed in the html, use this method to display the card.

      Just type:
      techCard1.show();
      */
      this.box.style.display = 'block';
  }
  
  hide() {
      /* 
      This removes the card from the html.
      */
      this._card.remove();
  }

  softDiscount(discount) {
      /**
       * This function is used if the soft prerequisite of this techCard is researched.
       * 
       * The discount variable it takes is found in index 1 of the array that is stored in the softChildren attribute.
       */

      this._cost -= discount;
  }
}

class wonder extends techCard {
  constructor(name, cost, description, gpt, happiness, science, startTime, endTime) {
      /**
       * This class is specifically for building wonders like stonehenge. It includes a start and ending year which dictates when the wonder can be constructed.
       */
      super(name, cost, description, gpt, happiness, science);
      this._times = [startTime, endTime];
  }

  get times() {
      return this._times;
  }

  checkTime(year) {
      /**
       * This function takes the current year of the game, and returns true if this wonder can be built in that year. If not, return false.
       */
      if (this._times[0] < year && year < this._times[1]) {
          return true;
      } else {
          return false;
      }
  }
}

function startCards() {
  /*
  This function should be called at the start of the game.

  It creates and initialises every card in the game, and puts the first techCards in the card list.
  */
  // initializeTechTree(); Maybe use an entirely new mjs file to define every tech? it will be very long.

  /*
  const stoneTools = new techCard('Stone Tools', 5, 'Your people have learned how to use stone to create tools for various purposes!', 5, 5, 0);
  const animalHusbandry = new techCard('Animal Husbandry', 100, 'People raise animal. People kill animal. Profit.', 69, 69, 1);
  const exampleStartingTech = new techCard('Example Starting Tech', 1, 'Your people learned to do this thing. Yay!', 20, 10, -5);
  
  const ironTools = new techCard('Iron Tools', 5, 'placeholder', 99, 99, 0)
  stoneTools.addHardChild(ironTools);
  const bronzeTools = new techCard('Bronze Tools', 5, 'placeholder', 99, 99, 0)
  ironTools.addHardChild(bronzeTools);
  */

  const stoneTools = new techCard('Stone Tools', 10, 'You make fundamental advances in stone tool technology (including further specialisation of tools and increasing sophistication of crafting). Your people apply them in hunting, construction, and clearing and they are a prerequisite for the rest of civilizational development.', 15, 5, 0);
  const selectBreed = new techCard('Selective Breeding', 17, 'Wild crops and animals are not the best foods for an agricultural society, but by breeding the ones that are the most edible, you manage to domesticate them and make them more suitable for mass cultivation. This is an early example of human impacts on the environment and is necessary for the rise of agricultural civilizations..', 12, 3, 0)
  const earlyAstro = new techCard('Early Astronomy', 15, 'Your people begin looking to the skies and noticing patterns in the motions of the Sun, Moon, and the stars. You attempt, however you can, to explain the motions and make predictions, typically spiritually. In a sense, astronomy is the first science.', 0, 15, 0);

  initializeTechTree(stoneTools, selectBreed, earlyAstro);

  var cardList = [];
  cardList.push(stoneTools);
  cardList.push(selectBreed);
  cardList.push(earlyAstro)
  
  return cardList;
}

function discountCards(softChildren) {
  softChildren.forEach(child => {
    child.softDiscount();
  })
}

function updateCards(cardList) {
  /*

  THIS FUNCTION CURRENTLY DOES NOT SEEM TO WORK AS INTENDED.

  This function should be called every time a turn is ended.

  It checks to see if any cards are highlighted.
  If a card is highlighted, it records the stats from the card, removes the card, and returns the summation of the stats.

  The returning values are:

  newCards: The new list of cards that should be displayed.
  changeGold: The change in gold that the player should have. Should be a negative number.
  changeGPT: The change in gold per turn.
  changeHappiness: The change in happiness after the turn.
  changeScience: The change in science or support after the turn.
  newDescription: A list of all the descriptions of each card. This will need to be looped over to be displayed.
  */

  var newCards = [];

  var changeGold = 0;
  var changeGPT = 0;
  var changeHappiness = 0;
  var changeScience = 0;

  var newDescription =  [];

  cardList.forEach(card => {
      if (card._card.classList.contains('highlighted')) {
          changeGold += -card.cost;
          changeGPT += card.gpt;
          changeHappiness += card.happiness;
          changeScience += card.science;
          
          newDescription.push(card.description);
          
          card.hardChildren.forEach(hardChild => {
              newCards.push(hardChild);
          })
          
          card._card.classList.remove('highlighted');
          card.hide();

      } else {
          // Possible bug here, old cards are put into new list here,
          // but the cards have not been removed from the html. If that is a problem,
          // the solution is probably to include card.hide(); below.
          // card.hide();
          newCards.push(card);
      }
  })

  const statChanges = [changeGold, changeGPT, changeHappiness, changeScience];

  return newCards, statChanges, newDescription;
}

function initializeTechTree(stoneTools, selectBreed, earlyAstro) {
  const earlyAgri = new techCard('Early Agriculture', 20, 'Wild crops and animals are not the best foods for an agricultural society, but by breeding the ones that are the most edible, you manage to domesticate them and make them more suitable for mass cultivation. This is an early example of human impacts on the environment and is necessary for the rise of agricultural civilizations.', 15, 10, 0);
  const urbanTech = new techCard('Urban Technology', 15, 'You create the earliest civilizations, in the forms of tribes and villages as people have more resources.', 12, 10, 0);
  const irriDike = new techCard('Irrigation and Dikes', 24, 'Your civilization finds its home around a river valley. Its flooding provides much needed water for agriculture but threatens your society, so you invest in sophisticated water control systems for irrigation and flood control. These vastly improve quality of life.', 30, 20, 0);
  const babyAstro = new techCard('Babylonian Astronomy', 22, 'Building on early observations, you catalog the stars with a base-60 numeral system and apply basic mathematics to make predictions and discover a cycle of Lunar Eclipses. You become the most advanced astronomers of your time.', 3, 15, 0);
  const stoneHenge = new techCard('Stonehenge', 300, 'Yay you put a bunch of rocks in a circle! Oh and you summoned aliens to earth', 0, 1, 1);
  const sunDials = new techCard('Sundials', 15, 'You build the earliest timekeeping device, which indicates the time by the shadow of the dial based on the position of the Sun. People work more efficiently knowing the time.', 2, 0, 0);
  const pythMath = new techCard('Pythagorean Math', 45, 'The Pythagorean school of mathematics emerges. Your scholars explore the nature of numbers and their spirituality. They define the platonic solids and posit early geometric theorems. Although superstitious, they share their philosophy and are the finest mathematicians of their day.', 2, -5, 7);
  const ironMetal = new techCard('Iron Metallurgy', 45, 'Your civilization discovers iron ores and gains the ability to process them, giving your people access to a material stronger than stones.', 5, 0, 0);
  const terraFarm = new techCard('Terrace Farming', 20, 'Your civilization now sees hilly terrain as a potential farm', 5, 3, 0);
  const axiomGeom = new techCard('Axioms of Geometry', 20, 'Your scholar Euclid devises a new approach to mathematics. He compiles all of mathematics into a few books and invents the axiomatic method, wherein a few basic facts are taken as true and all other results are derived from them via proof. His emphasis on rigour comes to define mathematics. ', 5, 0, 30);
  const natPhil = new techCard('Natural Philosophy', 30, 'Your scholar Aristotle creates a term called “natural philosophy”, which spans modern day physics, chemistry, and biology (among others). He is determined to create logical reasoning behind how the natural world operates. His philosophy would be the driving force in creating an experimental research system.', 5, 0, 30);
  const statics = new techCard('Statics', 33, 'Your scholar Archimedes founds the field of statics with his famous principle about buoyancy, which he discovered while taking a bath. He also explores levers and the theory of simple machines. His work on statics indirectly lays the foundation for machines and mechanics.', 10, 0, 5);
  const planetAstro = new techCard('Planetary and Astronomical Measurements', 35, 'Your civilization starts to gain a better understanding of the universe by making specific measurements of astronomical phenomena. They measure the sizes of the Moon and Sun and the distances to them. They further realise the Earth is round and make a surprisingly accurate calculation of its radius.', 5, 0, 5);
  const heliomodel1 = new techCard('Heliocentric Model', 38, 'Based on astronomical measurements, your scholar Aristarchus proposes that the Earth and other planets revolve around the Sun, which he determines to be the largest thing in the solar system. His theory overcomes its rival Ptolemaic theory, which up until now had made better predictions. It is a triumph of reasoning.', 2, -15, 5);
  const zero = new techCard('Zero', 35, 'Although zero was previously used as a placeholder, it begins life as its own number and concept when Brahmagupta pioneers arithmetic with zero. It represents a major philosophical evolution in mathematics.', 0, -2, 10);
  const romeConc = new techCard('Roman Concrete', 50, 'Your civilization can now build much more extravagant buildings and landmarks. These buildings are surprisingly durable, due to concrete\'s composition of rock and ash, compressed together to form a bond stronger than brick and stone of the time.', 10, 10, 0);
  const seismo = new techCard('Seismoscope', 40, 'Your people can now build instruments to detect and measure ground motion, which are largely used to provide visual indication of earthquake\'s occurance. (Affects the random event “Earthquake”, reducing loss of resources.)', 0, 10, 10);
  const inertia = new techCard('Inertia', 40, 'Your people discover a phenomena such that objects resist changes to its state of motion unless acted upon an external force.', 2, 0, 10);
  const calAstro = new techCard('Calender Astronomy', 30, 'Your people make the first calendars reflecting day and night cycles as well as seasonal changes based on astronomical measurements such as Earth\'s rotation and its orbit around the Sun.', 2, 0, 2);
  const comet = new techCard('Comet', 30, 'Look, a shooting star! Quick, make a wish!', 0, 10, 0);
  const algebra = new techCard('Algebra', 65, 'Your scholars develop the theory of equations, solving them with geometric arguments and balancing across equalities. They treat equations as interesting mathematical options in their own right, forming the basis of algebra and mathematical study for the next millennium', 0, 10, 15);
  const optics = new techCard('Optics', 50, 'Your scholars investigate refraction and reflection. Their findings determine light reflected in any straight line from an object, which enters the human eye somehow (they haven\'t figured this part out yet :( )', 0, 10, 10);
  const alchemy = new techCard('Alchemy', 50, 'You can\'t create gold from lead, nevertheless, you learn of the existence of gunpowder, a powerful material that can ward off invading foes. The ensuing discussion on alchemy creates interest in understanding the natural materials around us, which pushes a desire for chemistry.', 0, 10, 10)
  const windPower = new techCard('Harnessing Wind Power', 60, 'Your civilization starts to make use of wind power. Primarily in the forms of windmills which help with aspects such as grinding grains and pumping water. ', 15, 10, 0);
  const expResearch = new techCard('Experimental Research', 95, 'While revolutionising optics, Ibn al-Haytham posits that scientific hypotheses and models must be confirmed by experiments to be accepted as true. He pioneers the ideas of scepticism and awareness of bias in experiments. The scientific method lays the foundation for all future science.', 0, 0, 65);
  const gunPowder1 = new techCard('Gunpowder', 70, 'Your people invent gunpowder for medicinal purposes. This is the essential research for weapons associated due to its nature of being incendiary.', 5, -15, 0);
  const earlyMech = new techCard('Early Mechanics', 65, 'Your people begin to study force and motion comprehensively. (Your second to develop “Inertia”.)', 0, 0, 10);
  const geoMorph = new techCard('Geomorphology', 80, 'Your scientists begin the study of Earth\'s landforms. Your civilization gains a better understanding of geological phenomena such as tectonic uplifts and subsidence, as well as actions of wind, water, glaciers and wildfires. (Reduce the loss of natural disasters.)', 5, 5, 5);
  const magDec = new techCard('Magnetic Declination', 70, 'The discovery of certain properties of metals like iron leads to the development of a compass, a tool that always points to the magnetic north. The compass is a vital tool for long-distance navigation.', 5, 10, 0);
  const gothArch = new techCard('Gothic Architechture', 400, 'Your civilization\'s architecture evolves into a grandiose style, incorporating geometric elements such as the arch, a defining element of Gothic architecture.', 35, 50, 0);
  const manuShips = new techCard('Maneuverable Sailing Ships', 80, 'Your people develop early vessels to travel across rivers and seas, which facilitates trading, exploration and cultural exchange between different human civilizations.', 15, 10, 0);
  const agriField = new techCard('Agriculture (3 Field Systems)', 70, 'Comprising 2 fields comprising separate crops, and a fallow (a plot of land left to rest and recover), this system increases the crop output of your farms.', 20, 15, 0);
  const gunPowder2 = new techCard('European Gunpowder', 85, 'Your people invent gunpowder, an incendiary substance that quickly finds application in rocketry, siege artillery, and firearms. Its quick adoption prompts an arms race for gunpowder technologies and leads to the formation of large gunpowder-based empires.', 15, -50, 0);
  const mechClocks = new techCard('Mechanical Clocks', 90, 'Mechanical Clocks serve 2 purposes for your civilization: telling time, and aiding astronomy and astrology. These clocks were driven by weights, and controlled by an oscillating mechanism. Several types of clocks are made, ranging from simple ones to call for prayer, to ornate models, meant to display various forms of time, and model the solar system.', 15, 20, 20);
  const eyeGlasses = new techCard('Eyeglasses', 60, 'Harnessing their knowledge of optics, your craftsmen develop glasses to correct people\'s vision impairments. These glasses quickly proliferate in style and sophistication, allowing people to live up to their potential and contributing back to society.', 15, 18, 0);
  const madApprox = new techCard('Madhava π Approximation', 60, 'Your scholar Madhava pioneers calculations with infinite series and uses them to develop a cutting-edge approximation for pi to 11 decimal places. He further develops an understanding of approximation error.', 0, 5, 5);
  const printPress = new techCard('Gutenberg Press', 1000, 'Your civilization gains the ability to mass produce copies of text. Demand for printed texts skyrockets, and your scholars rush to translate key works stuck on old, foreign texts. From now on, discoveries can be quickly published and distributed, driving down costs.', 80, 80, 80);
  const currWind = new techCard('Mapping Currents and Winds', 145, 'Your greatest sailors, hoping to break out from coastal exploration, map the winds and currents off your coastlines. With their newfound knowledge, they are able to sail further than ever before and discover new lands by sea. They open opportunities for your civilization to go global.', 30, 20, 0);
  const empire = new techCard('Empiricism', 250, 'Your philosophers posit that what is real is what is sensed. Francis Bacon argues that scientific knowledge comes from careful observations of nature and inductive reasoning. With his advocacy of skepticism, he founded the modern scientific method, the system on which all future science relies.', 0, 0, 85);
  const natRefig = new techCard('Natural Refrigeration', 100, 'Your people now store food in cool environments such as natural snow pits on high mountains. This method significantly slows down food spoilage.', 15, 15, 0);
  const comVar = new techCard('Complex Variables', 180, 'Driven by the quest to solve algebraic equations, your mathematicians invent a new number equal to the square root of negative one. Although immensely helpful in solving polynomials, it is hotly contested and will take many centuries to be incorporated into theoretical canon.', 0, -30, 5);
  const mapProj = new techCard('Map Projections', 70, 'With the knowledge gained from countless explorations, your people now can create maps representing the surface of the globe. This gives your people a better understanding of the world and benefits navigation and wayfinding.', 15, 10, 0);
  const newWorld = new techCard('Discovery of the New World', 500, 'Your sailors come back with news that they have found an entirely new continent, with lots of precious resources and people. You can make the most of this opportunity by exploiting the new land and its people.. Unfortunately the propagation of disease kills tens of millions of the indigenous inhabitants.', 100, -80, 0);
  const galileoExp = new techCard('Galileo\'s Experiments', 30, 'A dude named Galileo (no relation to Galileo) dropped some weights off of a tower to demonstrate that objects fall at the same speed regardless of weight.', 0, 0, 5);
  const helioModel2 = new techCard('Heliocentric Model', 80, 'Some natural philosophers have come up with a heliocentric model, which contradicts the current geocentric model of the solar system. Many people in your society are unhappy with this discovery, and are confronted with humanity’s loss of significance. The head researcher of the team is banished for heresy.', 0, -15, 50);

  selectBreed.addHardChild(earlyAgri);
  stoneTools.addHardChild(urbanTech);
  stoneTools.addHardChild(irriDike);
  stoneTools.addHardChild(stoneHenge);
  stoneTools.addHardChild(sunDials);
  stoneTools.addHardChild(ironMetal);
  earlyAstro.addHardChild(babyAstro);
  earlyAgri.addHardChild(terraFarm);
  urbanTech.addHardChild(pythMath);
  urbanTech.addHardChild(romeConc);
  pythMath.addHardChild(axiomGeom);
  pythMath.addHardChild(natPhil);
  pythMath.addHardChild(statics);
  sunDials.addHardChild(planetAstro);
  planetAstro.addHardChild(heliomodel1);
  natPhil.addHardChild(zero);
  natPhil.addHardChild(inertia);
  natPhil.addHardChild(optics);
  natPhil.addHardChild(alchemy);
  natPhil.addHardChild(expResearch);
  ironMetal.addHardChild(seismo);
  planetAstro.addHardChild(calAstro);
  planetAstro.addHardChild(comet);
  zero.addHardChild(algebra);
  urbanTech.addHardChild(windPower);
  alchemy.addHardChild(gunPowder1);
  statics.addHardChild(earlyMech);
  planetAstro.addHardChild(geoMorph);
  expResearch.addHardChild(magDec);
  ironMetal.addHardChild(gothArch);
  windPower.addHardChild(manuShips);
  earlyAgri.addHardChild(agriField);
  gunPowder1.addHardChild(gunPowder2);
  earlyMech.addHardChild(mechClocks);
  optics.addHardChild(eyeGlasses);
  algebra.addHardChild(madApprox);
  mechClocks.addHardChild(printPress);
  geoMorph.addHardChild(currWind);
  expResearch.addHardChild(empire);
  agriField.addHardChild(natRefig);
  algebra.addHardChild(comVar);
  algebra.addHardChild(mapProj);
  manuShips.addHardChild(newWorld);
  empire.addHardChild(galileoExp);
  heliomodel1.addHardChild(helioModel2);
}
//#endregion



//Initial constants for resources
let resources = {
  wealth: 100,
  happiness: 100,
  science: 100,
  gpt: 0,

  // Whether the player has built the building
  buildings: {
    military: false,
    circus: false,
    school: false,
},

  // Including the year in resources for now until we decide a better place to put it.
  year: -10500
}
let turnCount = 1; // Initialize user's turn


//#region Code for buildings
// Select the building buttons and the corresponding images
const buildMilitaryButton = document.getElementById('build-military');
const buildCircusButton = document.getElementById('build-circus');
const buildSchoolButton = document.getElementById('build-school');
const militaryImage = document.querySelector('.building-option:nth-child(1) img');
const circusImage = document.querySelector('.building-option:nth-child(2) img');
const schoolImage = document.querySelector('.building-option:nth-child(3) img');

const buildingCosts = {
  military: 50,
  circus: 75,
  school: 100,
};

// Define maintenance costs for each building type
const maintenanceCosts = {
  military: 20,
  circus: 30,
  school: 40,
};

// Function to handle building construction when a button is clicked
function buildBuilding(buildingType) {
  if (!resources.buildings[buildingType]) {
      // Deduct the gold cost and mark the building as constructed
      resources.wealth -= buildingCosts[buildingType];
      resources.buildings[buildingType] = true;

      //Reflect the changes in the resource bar
      document.getElementById('wealthBar').textContent = Math.round(resources.wealth);

      // Disable the button after construction
      document.getElementById(`build-${buildingType}`).disabled = true;
  }
}

// Add click event listeners to the building buttons
buildMilitaryButton.addEventListener('click', () => {
    militaryImage.src = 'library/backgrounds/shield.png'; // Set the image source for military building
    buildBuilding('military')
});

buildCircusButton.addEventListener('click', () => {
    circusImage.src = 'library/backgrounds/circus.png'; // Set the image source for circus building
    buildBuilding('circus')
});

buildSchoolButton.addEventListener('click', () => {
    schoolImage.src = 'library/backgrounds/book.png'; // Set the image source for school building
    buildBuilding('school')
});

//#endregion

//#region Code for events
const events = [
  {
    title: "Barbarians attack!",
    description: "Your military has failed to defend your borders against barbarian tribes. Your state is being invaded and your great cities are being sacked! There is chaos on the streets and the barbarians are plundering your treasury. <br> Reduce gold: 5% <br> Reduce happiness: 50%",
    effect: {wealth: 5, happiness: 50},
    chance: 12,
    isGoodEvent: true,
    modifiers: {
      military: 0, // 
      circus: 1.0, // Decreases chance by 20% if circus building is constructed
      school: 1.0, // No effect on chance if school building is constructed
    }
  },
  {
    title: "Piracy and Thievery",
    description: "It’s tough being rich. Pirates have attacked your convoy and stolen a great amount of treasure. Just hope it wasn’t the convoy with your greatest new technology! <br>Reduce gold: 8% <br>Reduce your happiness 10%",
    effect: {wealth: 8, happiness: 10},
    chance:11
  },
  {
    title: "War with neighbouring states",
    description: "You have been dragged into a brutal war with your neighbours that leaves your society devastated and treasury depleted. Your peaceful focus on technological development is thrown into chaos. <br> Reduce gold: 30% <br> Reduce happiness: 40%",
    effect: {wealth: 30, happiness: 40},
    chance: 4
  },
  {
    title:"Famine",
    description: "A combination of drought and disease have blighted your crops. The harvest has failed again and your people are on the brink of starvation <br>Reduce gold:50% <br>Reduce happiness: 75%",
    effect: {wealth: 50, happiness: 75},
    chance: 3
  },
  {
    title:"Plague",
    description:"A deadly plague envelops your lands. It spreads like fire among the populace, killing countless scores and disabling many others. The destruction of productivity is profound. <br>Reduce gold: 30% <br>Reduce happiness: 75%",
    effect:{wealth: 30, happiness: 75},
    chance: 2
  },
  {
    title:"Earhquake/Tsunami",
    description: "Seismic activity below the Earth’s surface triggers a shock, either on land or on water. This results in much of your civilization being reduced to rubble. <br>Reduce gold: 40% <br>Reduce happiness: 50%",
    effect:{wealth: 30, happiness: 50},
    chance: 7
  },
  {
    title:"Flood",
    description: "Rising water levels flood your civilization, stranding and drowning many of your citizens. <br>Reduce gold: 35% <br>Reduce happiness: 45%",
    effect: {wealth: 35, happiness: 45},
    chance: 7
  },
  {
    title:"Tropical cyclone",
    description:"A tropical cyclone touches down on your civilization. The slew of thunderstorms and tornadoes damage much of your society. <br>Reduce gold: 25% <br>Reduce happiness: 35%",
    effect: {wealth: 25, happiness: 35},
    chance: 7
  },
  {
    title: "Recession",
    description: "Economic mismanagement and reckless speculation has your economy in shambles. The suffering populace start losing faith in your rule and are more reluctant to invest in frivolous research. <br>Reduce gold: 50% <br>Reduce happiness: 60%",
    effect: {wealth: 50, happiness: 60},
    chance: 2
  },
  {
    title: "New land acquired",
    description: "Congrats, you just acquired new lands and have expanded your nation! This brings new peoples and new fortunes, increasing the potential of your civilization. (Just don’t ask us whose land it is or how we acquired it…)<br>Increse gold: 15% <br>Increase happiness: 30%",
    effect: {wealth: -15, happiness: -30},
    chance: 18
  },
  {
    title:"Higher birthrate",
    description:"Something is in the air and more babies are being born than ever before! This baby boom brings some growing pains but will provide many new labourers and thinkers to increase the greatness of your civilization. <br>Increase gold: 10% <br>Increase happiness: 20%",
    effect: {wealth: -10, happiness: -20},
    chance: 8
  },
  {
    title:"New technology from the foreign lands",
    description:"Your traders discovered a new technology used in a distant land. They have brought it back for you to study and apply in your civilization. <br>Increase happiness: 10% <br>Unlocks new technology for free",
    effect: {happiness: -10},
    chance: 2.4
  },
  {
    title:"Science prophet born",
    description: "Some people are just born different. Such is the case with this prodigious child born in your capital. At the age of six, she is impressing your scholars. Her gifts will be numerous. <br>Increase happiness: 15% <br>Increase science: 15%",
    effect: {happiness: -15, science:-15},
    chance: 1.4
  },
  {
    title: "Increase of state funding",
    description: "The state recognizes the importance of basic research and opens its wallet to the desires of scientists and scholars. Others might feel neglected, though. <br>Increase gold: 30% <br>Increase science: 25% <br>Reduce happiness: 15%",
    effect: {wealth: -30, happiness: 15, science: -25},
    chance: 5
  },
  {
    title: "Agriculture surplus",
    description: "You have vast stores of crops, much more than what is necessary to feed your people at the moment. This attracts hungry stragglers, eager to bow to your rule for a morsel of food, and fellow leaders of civilizations, eager to buy crops from you to feed their people. <br>Increase gold: 35% <br>Increase happiness: 45%",
    effect: {wealth: -35, happiness: -45},
    chance: 10
  }
];

const noEventChance = 0.1; // A 10% chance that no events will trigger
const scienceThreshhold = 50; // Having above 50% science yields more good events.

// Function to calculate the weighted chance of each event based on modifiers
function calculateWeightedChances() {
  changedChances = []
  for (const event of events) {
      let weightedChance = event.chance;

      for (const buildingType in event.modifiers) {
          if (resources.buildings[buildingType]) {
              weightedChance *= event.modifiers[buildingType];
          }
      }
      /**if (resources.science > scienceThreshhold && event.isGoodEvent) {
        // If player's science is above the threshold and it's a good event, increase chance
        weightedChance *= 1.2; // Increase chance by 20%
      }*/
      changedChances.push({ event, weightedChance });
    }
    return changedChances
  }

// Function to generate and apply a random event or no event based on weighted probability
function tryTriggerEvent() {
  // Generate a random number to decide whether an event will happen or not
  const randomValue = Math.random();
  const totalWeight = events.reduce((sum, event) => sum + event.chance, 0);

  // Calculate weighted chances for events based on modifiers
  finalChances = calculateWeightedChances()

  // Calculate cumulative probabilities
  const cumulativeProbabilities = [];
  let cumulativeProbability = 0;
  
  for (const { weightedChance } of finalChances) {
      cumulativeProbability += weightedChance; // sum of chances
      cumulativeProbabilities.push(cumulativeProbability); // stores chances of each event
  }
  // cumulativeProbabilities.sort((a, b) => a - b)

  document.getElementById("chanceBar").textContent = cumulativeProbability;
  if (randomValue > noEventChance) {
    // Generate a random number between 0 and the total weight
    const eventRandomValue = Math.random() * cumulativeProbability;
  
    // Select an event based on its weighted probability
    let selectedEvent = null;
    let cumulativeWeight = 0;
    document.getElementById("testBar").textContent = eventRandomValue;
    document.getElementById("barbarianBar").textContent = finalChances[0].weightedChance;

    for (let i=0; i < finalChances.length; i++) {
        cumulativeWeight += finalChances[i].weightedChance;
            if (eventRandomValue <= cumulativeWeight) {
                  selectedEvent = finalChances[i].event;
                  break;
            }
        }
    triggerEvent(selectedEvent)
  }
}

function triggerEvent(event) {
  // Apply the negative percentage effects on resources
  for (const resource in event.effect) {
    if (resources.hasOwnProperty(resource)) {
      const decreaseAmount = resources[resource] * (event.effect[resource] / 100);
      resources[resource] -= decreaseAmount;
    }
  }

  // Update UI or other game elements based on new resource values
  //updateResourceDisplay();
  showEventModal(event);
}

/**function tryTriggerEvent() {
  const triggerChance = 0.6; // 60% chance to trigger an event

  if (Math.random() < triggerChance) {
    // Trigger a random event
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    triggerEvent(randomEvent);
  }
}*/

function showEventModal(event) {
  document.getElementById('event-title').innerHTML = event.title;
  document.getElementById('event-description').innerHTML = event.description;

  const modal = document.getElementById('event-modal');
  modal.style.display = 'block';
}

function updateTurn() {
  const messageArea = document.getElementById('eventArea');
  messageArea.textContent = `Turn: ${turnCount}`;
}

function updateResourceDisplay() {
  /**
   * This function updates the resources display on the website.
   */

  resources.science -= 5;

  document.getElementById('wealthBar').textContent = Math.round(resources.wealth);
  document.getElementById('happinessBar').textContent = Math.round(resources.happiness);
  document.getElementById('scienceBar').textContent = Math.round(resources.science);
  document.getElementById('gptBar').textContent = resources.gpt;

  if (resources.year < 0) {
    document.getElementById('yearBar').textContent = resources.year + " BCE";
  }
  else {
    document.getElementById('yearBar').textContent = resources.year + " CE";
  }
}

// Actions performed when the end turn button is clicked, including: Show turn count, show event, calculate resources
document.addEventListener('DOMContentLoaded', () => {
  const endTurnButton = document.getElementById('endTurnButton');
  const eventModal = document.getElementById('event-modal');
  const closeButton = document.getElementsByClassName('close-button')[0];
  const closeEventButton = document.getElementById('close-event');
  const gameContainer = document.getElementById('gameContainer');
  const storyArea = document.getElementById('eventArea');
  

  endTurnButton.addEventListener('click', () => {
    // Update wealth based on gold per turn from the previous turn.
    resources.wealth += resources.gpt;

    // Select a random event and trigger its effects
    turnCount ++;
    updateTurn();

    // Update gold based on buildings maintenance cost
    for (const buildingType in resources.buildings) {
      if (resources.buildings[buildingType]) {
          resources.wealth -= maintenanceCosts[buildingType];
          document.getElementById('wealthBar').textContent = Math.round(resources.wealth);
      }
  }

    // Trigger event only when the player gets to round 3
    if (turnCount > 3) {
    tryTriggerEvent()
    }

    // card populate and get card descriptions.
    const newDescriptions = updateCards(cardList);

    // Display the descriptions on the website infoArea.
    updateDescriptions(newDescriptions);

    // Increase the year for the next turn.
    moveTime();

    // Update the resources after everything has been factored into the new resources.
    updateResourceDisplay();
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
//#endregion

//#region Other intialization code
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

// Intialization code for restart button
document.addEventListener('DOMContentLoaded', () => {
  const restartButton = document.getElementById('restartButton');
  restartButton.addEventListener('click', () => {
    location.reload(); // Reloads the current page
  });
});
//#endregion

//#region Initialize the Cards

// This will initialize the cards at the beginning of the game, as well as keep a running list of all cards in the game at the moment.
var cardList = startCards();


function populateCards(cardList) {
  /**
  * This function takes the card html from the techCards in cardList, and applies them to
  * the document element with class 'cardContainer'.
  */
  const cardArea = document.getElementById('cardContainer');
  cardList.forEach(card => {
    card.appendTo(cardArea);
  });
  
}

document.addEventListener('DOMContentLoaded', () => {
  populateCards(cardList);
});

function updateCards(cardList) {
  /**
   * This function will update everything to do with the cards inbetween turns.
   * This includes displaying child cards, removing chosen cards, updating resources, and gathering the descriptions from all chosen cards.
   * 
   * INPUTS:
   * cardList: A list of the current cards in the game.
   * 
   * RETURNS:
   * newDescription: A list of all the descriptions from the cards that were chosen.
   */

  var newDescription = [];

  cardList.forEach(card => {
    if (card._card.classList.contains('highlighted')) {
      resources.wealth -= card.cost;
      resources.gpt += card.gpt;
      resources.happiness += card.happiness;
      resources.science += card.science;

      newDescription.push(card.name + ": " + card.description);

      populateCards(card.hardChildren);
      card.hardChildren.forEach(hardChild => {
        cardList.push(hardChild);
      })

      discountCards(card.softChildren);
    
      card._card.classList.remove('highlighted');
      card.hide()
    }

  })

  return newDescription;
}

function updateDescriptions(descriptionList) {
  /**
   * This function takes a list of descriptions that must be strings.
   * 
   * 
   * Then it fills it with the descriptions for each card that was selected.
   * 
   */

  const descriptionArea = document.getElementById('infoArea');

  descriptionArea.innerHTML = '';

  if (descriptionList.length == 0) {
    const paragraph = document.createElement('p');

    paragraph.textContent = 'Your people have not succeeded in any meaningful research over the past several years.';

    descriptionArea.appendChild(paragraph);
  }


  descriptionList.forEach(desc => {

    const paragraph = document.createElement('p');

    paragraph.textContent = desc;

    descriptionArea.appendChild(paragraph);
  })
}

function moveTime() {
  /**
   * This function will move time forward depending on what the year is. 
   * 
   * In earlier years, time will move faster per turn, and it gets slower the closer you get to the modern era.
   */

  if (resources.year < 0) {
    resources.year += 500
  }

  else if (0 <= resources.year && resources.year < 1800) {
    resources.year += 100
  }

  else {
    resources.year += 10
  }
}


// This object completedTech will store whether a tech has been researched, so that we can check it for events.
let completedTech = {
  seismoscope: false
}
//#endregion
