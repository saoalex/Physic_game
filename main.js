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
      this._prereq_number = 0;
      this._softChildDiscount = [];

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
  
  get softChildDiscount() {
      return this._softChildDiscount;
  }

  get prereq_number() {
    return this._prereq_number;
  }

  set cost(newCost) {
    this._cost = newCost;
    const costElement = this._card.querySelector('.card-cost');
    if (costElement) {
      costElement.textContent = `Cost: ${this._cost}`;
    }
  }

  // Function to add a hard child to the card
  addHardChild(childCard) {
      this.hardChildren.push(childCard);
      childCard._prereq_number = childCard._prereq_number + 1
      // Update the displayed number of hard children
      // this.updateHardChildrenCount();
  }

  // Function to add a soft child to the card
  addSoftChild(childCard, discount) {
      /**
       * Adds a soft child and a discount value to the card.
       * 
       * Stores both in their respective arrays. Get the discount based on the array index of the child card.
       */
      this.softChildren.push(childCard);
      this.softChildDiscount.push(discount);
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
                      <div class="card-value card-cost">Cost: ${this._cost} </div>
                      <div class="card-value">+${this._gpt} Gold per Turn</div>
                      <div class="card-value">${this._happiness >= 0 ? '+' : '-'}${Math.abs(this._happiness)} Happiness</div>
                      <div class="card-value">${this._science >= 0 ? '+' : '-'}${Math.abs(this._science)} Science</div>`;

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

      First it will check if the required number of hard prerequisite cards have been researched. 
      If there are still more techs needed, it will reduce the prereq number by 1, and not append.
      If the call to this function is called by the last tech needed, then the card will be appended to the html.

      This line will place the card in the body of the document.
      */
      if (this._prereq_number > 0) {
        this._prereq_number = this._prereq_number - 1
      }

      if (this._prereq_number == 0) {
        parentElement.appendChild(this._card);
      }
      
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

      this.cost = this._cost - discount;
  }

  updateDisplayAfterDiscount() {
    this.hide();
    this._card = this.createCard();
    this.show();
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

  const timedTechs = initializeTechTree(stoneTools, selectBreed, earlyAstro);

  var cardList = [];
  cardList.push(stoneTools);
  cardList.push(selectBreed);
  cardList.push(earlyAstro)
  
  //return cardList;
  return {
    a: cardList,
    b: timedTechs
  };
}

function initializeTechTree(stoneTools, selectBreed, earlyAstro) {
  const earlyAgri = new techCard('Early Agriculture', 20, 'Wild crops and animals are not the best foods for an agricultural society, but by breeding the ones that are the most edible, you manage to domesticate them and make them more suitable for mass cultivation. This is an early example of human impacts on the environment and is necessary for the rise of agricultural civilizations.', 15, 10, 0);
  const urbanTech = new techCard('Urban Technology', 15, 'You create the earliest civilizations, in the forms of tribes and villages as people have more resources.', 12, 10, 0);
  const irriDike = new techCard('Irrigation and Dikes', 24, 'Your civilization finds its home around a river valley. Its flooding provides much needed water for agriculture but threatens your society, so you invest in sophisticated water control systems for irrigation and flood control. These vastly improve quality of life.', 30, 20, 0);
  const babyAstro = new techCard('Babylonian Astronomy', 22, 'Building on early observations, you catalog the stars with a base-60 numeral system and apply basic mathematics to make predictions and discover a cycle of Lunar Eclipses. You become the most advanced astronomers of your time.', 3, 15, 0);
  const stoneHenge = new techCard('Stonehenge', 300, 'Yay you put a bunch of rocks in a circle! Oh and you summoned aliens to earth', 0, 40, 50);
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
  const helioModel2 = new techCard('Better Heliocentric Model', 80, 'Some natural philosophers have come up with a heliocentric model, which contradicts the current geocentric model of the solar system. Many people in your society are unhappy with this discovery, and are confronted with humanity’s loss of significance. The head researcher of the team is banished for heresy.', 0, -15, 50);
  const calculus = new techCard('Calculus', 275, 'A drive to understand the nature of motion and change leads your scholars to develop the notion of limits and infinitesimal. These powerful mathematical tools unlock a deeper understanding of the nature of functions and the world they describe, proving foundational for later developments.', 0, 3, 20);
  const elecGen = new techCard('Electrostatic Generator', 300, 'Your scientists develop a strange contraption containing sulfur that emits bolts of light when applied to certain objects. Further research into what is behind this effect (electricity) can no be more easily done.', 3, 5, 20);
  const teleScope = new techCard('Invention of Telescopes', 500, 'A contraption made to observe distant objects is the latest to come out of your civilization. It initially uses a series of lenses to take a far-away image, clean it up, and enlarge it for the view. Your scientists also experiment with using mirrors to create a different kind of telescope. Using this new equipment, you can now easily look up into the night sky and see what planets and stars look like.', 2, 5, 20);
  const newtonMotion = new techCard('Newton’s Laws of Motion', 410, 'Based on the experiments of Galileo, Newton overthrows the Aristotolean worldview with his three laws of motion that allow for predicting the future motion of bodies and imply conservation of momentum. He applies it successfully to many systems. This mathematical description of motion represents the dawn of modern physics.', 12, 10, 15);
  const planetMotion = new techCard('Planetary Motion', 350, 'Equipped with a newly developed understanding of the Solar System, Tycho Brahe makes exquisite observations of the motions of the planets, leading Kepler to discern three laws of planetary motion, such that the planets orbit in ellipses. These empirical laws lead Newton to conclude that gravitation is an inverse square force.', 10, 30, 10);
  const steamEngines = new techCard('Steam Engines', 500, 'You develop a system that takes water vapour and uses the pressure generated to actuate a piston. The system can be supplemented with gears and rods to perform heavy duty labour. Your civilization implements this technology in the most arduous positions in factories, farms, and transportation. This profoundly affects your efficiency in these sectors, increasing profits. This also has the side effect of shifting some labourers to machine operators, increasing happiness.', 75, 10, 0);
  const waveQuake = new techCard('Wave Theory of Earthquakes', 200, 'John William Strutt, otherwise known as Lord Rayleigh, theorises that the waves seen at sea are an adequate analogy to how the Earth’s mantle and crust work. These waves can be used to study the effects of earthquakes and human infrastructure on the interior of the Earth.', 0, 10, 10);
  const modChem = new techCard('Conservation of Mass', 300, 'Antoine Lavoisier, a chemist and physicist, performs experiments on the prevailing theory that mass changes with heat. He promptly debunks this theory, and in doing so, supports the law of the conservation of mass. This leads to a new approach to understanding chemicals. Scientists now are interested in understanding chemical events and reactions, and are moving away from alchemy towards what we would now call modern chemistry.', 45, 0, 15);
  const lightExp = new techCard('Lightning Experiments', 200, 'Seeking to understand the nature of lightning, scientists propose experiments to fly kites in storms with a key attached on one end, hoping to conduct lightning through the kite. These daring experimenters, led by Ben Franklin, conclude that lightning is a form of electricity, a unification that harkens developments to come.', 25, -25, 5);
  const artRefrig = new techCard('Artificial Refrigeration', 250, 'Using a vacuum pump, and later a vapour compression system using gases such as ammonia, and alcohol, you can create ice and use it to chill objects. This has immediate advantages in the household, where food that once spoiled quickly can be kept fresh for longer.', 15, 20, 15);
  const analEng = new techCard('Analytic Engine', 390, 'Advances in science and technology require a lot of intense computations, leading many to yearn for automated ways of computing. Charles Babbage conjures a revolutionary design for a computer, a programmable machine with a full instruction set, memory, and control flow. Although he never manages to build it, the design lays the foundation for future work on automated computing.', 5, 40, 15);
  const fluidDyn = new techCard('Fluid Dynamics', 350, 'Physicists develop a mathematical understanding of fluid motion starting from the principles of Newtonian mechanics. The culmination of this effort are the Navier-Stokes Equations, a system of partial differential equations describing conservation of momentum and mass in fluids. This theory is applied to oceanic waves, water flows in pipes, and everything in between, providing a newfound command over fluid behaviour.', 45, 0, 20);
  const teleGraph = new techCard('Telegraph', 300, 'Using results from electricity experimentation from the electrostatic generator, you discover that electricity can be used to relay messages across distances. You put this to use in your railways to manage individual trains, and prevent deadly accidents and costly delays.', 70, 20, 0);
  const battery = new techCard('Battery', 400, 'A physicist by the name of Alessandro Volta creates something called a Voltaic Pile. It is a stack of copper and zinc plates, separated by brine-infused paper sheets. The pile was capable of creating and maintaining a steady current. While Volta isn’t quite sure how his pile does this, it serves as inspiration to build better piles, now known as batteries, serving important roles in future scientific advancements in electricity.', 40, 15, 20);
  const cottonGin = new techCard('Cotton Gin', 200, 'The rise of cotton demand prompts your inventors to devise more efficient harvest mechanisms, leading to the cotton gin, a device that allows for quick separation of cotton fibres from their seeds. This greatly boosts the productivity of cotton harvesters, which includes slaves throughout the American South, leading to slavery’s proliferation there.', 20, -30, 0);
  const thermoDyn = new techCard('Thermodynamics', 450 , 'The amazing energy created by the steam engine prompts your scientists to explore the nature of heat and energy transfer. They focus their study on gases and define bulk properties, such as entropy and pressure, eventually developing four basic laws. These principles see quick application in the development of more efficient engines and other technologies.', 45, 5, 15);
  const realAnal = new techCard('Real Analysis', 600, 'Your greatest mathematicians are uncomfortable with the existing treatment of calculus and seek to recast it as a formal and rigorous branch of mathematics, known as analysis. They study the properties of real numbers and real functions, proving incredible theorems and uncovering pathological counterexamples. The theory rests upon the epsilon-delta definition of the limit, which haunts students for decades to come.', 3, -30, 5);
  const boolAlg = new techCard('Boolean Algebra', 300, 'An investigation of logic leads George Boole to extend algebra to deal with binary truth values (true or false) acted upon by logical operations. Esoteric in its time, it eventually provided foundational concepts in set theory and electronic computing.', 3, 0, 5);
  const semiCond = new techCard('Semiconductors', 500, 'You discover that certain materials are not strictly conductors or strictly insulators, rather, their conductivity is in between these two extremes, and it’s resistivity decreases as temperatures increase. Your scientists use semiconductors for various purposes (selenium to transport sound via light beams, harness solar power using selenium and gold, etc.). Semiconductors such as silicon would later be used in electronic chip manufacturing.', 30, 0, 20);
  const piezoQuartz = new techCard('Piezoelectric Properties of Quartz', 200, 'The Curie brothers apply the fact that certain materials create a temporary voltage when exposed to heat change, to crystals. This results in the discovery of quartz possessing this property. While it was relegated to the lab at first, quartz would eventually find its way into clocks.', 15, 10, 10);
  const photoFilm = new techCard('Photography and Film', 300, 'You discover that taking a camera obscura (a closed box, with a pinhole at its front to let light pass through), and putting plated silver in the box, then exposing the plate to mercury results in an image developing from the perspective of the pin hole. Over time, your scientists work to improve the design and make it portable enough to capture subjects in realistic detail. You further flash a series of “photos” in succession, creating the illusion of a moving picture, or film. Your discovery dazzles the general public, who are eager to utilise this technology to entertain and document.', 25, 40, 0);
  const statMech = new techCard('Statistical Mechanics', 400, 'Thermodynamics proves a smashing success, but your physicists are not satisfied with its macroscopic description of reality. They apply statistical theory to the ensembles of microscopic particles that comprise gases and are able to explain quantities like pressure and temperature in terms of their motions. This general framework comprises one of the core components of modern physics.', 8, 10, 10);
  const elecDyn = new techCard('Electrodynamics', 900, 'Successive experiments reveal more about the nature of electricity and explore magnetism. Faraday introduces the idea of fields and discovers a changing magnetic field causes a current and Ampere discovers how currents create magnetic fields. Putting these discoveries together and applying his own brilliant insight, Maxwell posits his equations unifying and describing the complete nature of electricity and magnetism and discovers light is an electromagnetic wave. These discoveries comprise one of the most monumental achievements in science and underlie many technologies to come.', 25, 50, 30);
  const perTable = new techCard('Periodic Table', 400, 'Advancements in chemistry lead to the discovery of several new elements, which seem to exhibit a curious periodicity in their properties that prompts many attempts to classify them. Mendeleev makes a table of the elements of the course of the day, organising by periodicity and atomic weights. His vigorous defence and use of periodicity to make predictions about new elements establishes the Periodic Table as a fundamental tool of chemistry.', 15, 10, 10);
  const elecmagComp = new techCard('Electromechanical Computation', 850, 'Manual mechanical calculators give way to electromechanical devices, relying on parts such as switches, relays, and gears. These devices can interface with punched carts and greatly speed up tasks like census taking. Later developments introduce vacuum tubes to provide digital logic. These computers grow remarkably complex and fill entire rooms, finding myriad applications. The dream of general purpose computation lies on the horizon.', 80, 50, 50);
  const radiation = new techCard('Radiation', 900, 'Your scientists discover that several materials glow, literally. They investigate the nature of this energy and discover that matter itself is radioactive and decays. Applying these tools, they discover new elements and treatments. Most curiously, they discover that their theory of blackbody radiation predicts infinite radiation, an obvious failure of classical physics that sets the stage for a new theory. ', 40, -5, 25);
  const wireComm = new techCard('Wireless Communication', 700, 'The discovery of electromagnetic waves provides a new way to transmit information. Inspired by telegraphy, Marconi develops a communication scheme with radio waves and eventually transmits them across the Atlantic. Later developments allow for two way communication and radios quickly become an indispensable tool in war, commerce, and everyday life.', 100, 50, 20);
  const flight = new techCard('Flight', 1000, 'After numerous attempts have been made by past peoples, you finally develop a craft that is heavier than air and is still able to propel itself into the sky, and maintain its distance from the ground for a short period of time. This invention paves the way for the development of travel by air, either for pleasure, transportation, or combat.', 90, 50, 0);
  const quartzClocks = new techCard('Quartz Clocks', 400, 'Following the discovery of piezoelectric properties in quartz, your scientists get the idea of using quartz as an oscillator, a device that uses the changes in quartz to measure time. In time, this evolves to quartz clocks, a more stable method of measuring time.', 30, 15, 10);
  const relativity = new techCard('Relativity', 1500, 'The GOAT Albert Einstein completely reshapes the way your civilization thinks about the universe. He realises that the laws of physics are invariant, leading to crazy ideas like space and time being relative and energy and mass being related. His magnum opus is the General Theory of Relativity, which describes the universe as a four-dimensional curved spacetime continuum, with mass-energy following geodesics. His theory is as beautiful as it is revolutionary, although it lacks immediate applications.', 5, 100, 50);
  const seisEng = new techCard('Seismic Engineering', 1000, 'You start critically examining the impacts earthquakes have on your existing infrastructure, identifying potential weak points. You use this knowledge to develop earthquake-resistant infrastructure, saving the lives of your citizens, and their property.', 10, 50, 30);
  const haberPro = new techCard('Haber Process', 800, 'Your scientists uncover a way to create ammonia, from nitrogen, using hydrogen and iron catalysts under high temps and pressures. The process creates large amounts of ammonia, which is a critical ingredient in fertilisers for crops, and a way to create nitrates for munitions and explosive disposables. The excess nitrogen also plays a part in population increase in your civilization. Unfortunately, the process leaches toxic chemicals into groundwater sources, and contributes to the greenhouse effect.', 120, -30, 10);
  const extragalAstro = new techCard('Extragalactic Astronomy', 950, 'For centuries, your astronomers have noted distinct collections of stars, which they used to think were nebulae in the Milky Way. A series of increasingly careful observations of the brightness of distant stars leads Edwin Hubble to conclude that there exist other galaxies beyond the Milky Ways, dramatically increasing the size of the universe. He later discovers by observing redshifts that the universe is also expanding. These discoveries further question traditional notions about humanity’s place in the universe.', 5, -10, 15);
  const quantMech = new techCard('Quantum Mechanics', 1700, 'Classical physics fails on multiple fronts, leading your scientists to devise heuristic corrections to existing laws that involve quantizing various properties. This quantum theory is set on a proper foundation by Schrodinger, Hiesenberg, and Dirac, who establish the basic rules governing the quantum world, such as the uncertainty principle and wave nature of matter. This theory completely changes the way your civilization views the world, raising many uncomfortable questions about reality, but its success in making predictions about microscopic systems is unquestionable.', 30, -15, 75);
  const gradDesc = new techCard('Gradient Descent', 800, 'Your evolving civilization is obsessed with optimization, leading your mathematicians to work on a method called gradient descent. It iteratively optimizes a multivariable function by following the path suggested by its gradient field, which always points in the direction of steepest ascent. The method gains increasing importance as computational power advances.', 30, 0, 10);
  const compNet = new techCard('Computer Networks', 1500, 'You develop a system where computers can “talk” to each other. This results in better productivity from computer operators as they can now collaborate over these networks, increasing workflow, and in turn generating profits. Over time this network would encompass nearly every aspect of your civilization, from defence to social welfare, to science, to entertainment.', 150, 50, 50);
  const transistor = new techCard('Transistor', 1500, 'Your scientists create a semiconductor that has three connections to electronics. One takes an input (electrical signal/power), while a voltage is applied to the second connection, serving as the controller for the input, with the output going out of the final connector. The voltage can modify the input signal, and even amplify it. This revolutionary device allows you to perform basic mathematical operations on electric signals/power, which paves the way for groups of transistors to form a computer.', 250, 30, 50);
  const partColl = new techCard('Particle Colliders', 2000, 'The quest to understand the fundamental components of matter leads to the advent of particle colliders, complex devices that harness electromagnetic fields to accelerate subatomic particles and smash them into each other to study interactions and create new particles. The energies of these colliders grow over time in the quest to produce more exotic particles, captivating minds but raising questions of value.', 40, 40, 20);
  const laserMaser = new techCard('Lasers and Masers', 1000, 'Your scientists unlock the ability to produce beams of electromagnetic radiation. Using the quantum mechanical process of stimulated emission, an ensemble of atoms can be made to emit light at a very specific frequency, providing a powerful and beautiful beam. This technology quickly finds applications across research in the sciences, in technologies such as manufacturing processes and surgery, and laser light shows!', 50, 20, 40);
  const satellites = new techCard('Satellites', 1400, 'You throw things into the sky, and discover if you throw them high enough, they escape Earth’s gravitational pull and instead orbit around the Earth. Your scientists figure out that by launching such objects with certain electronics onboard, you can have orbiters record the Earth, measure atmospheric changes, and relay messages and global position. Your citizens benefit from lightning fast wireless communication, an being able to accurately track their position on the globe using GPS.', 80, 25, 30);
  const dna = new techCard('DNA', 1000, 'You discover the secret to life itself, polymer chains containing instructions set to build virtually any form of life. You discover that these chains are composed of 4 compounds and name them cytosine, guanine, adenine and thymine. This breakthrough in biology unleashes further potential to toy with the creation of life through altering DNA sequences. However, you also know how it can be used to determine connections between crime scene evidence and potential suspects, making for a potent litmus test for crime analysis.', 20, 20, 50);
  const nanoTech = new techCard('Nanotechnology', 1200, 'You are now able to manipulate matter the size of nanometers. Using this, you can create new compounds for use in everyday items. If a material can be used to improve a product, chances are you are already designing nanotechnology that lets you implant said material into said product.', 60, 20, 30);
  const atmoModel = new techCard('Atmospheric Modelling', 800, 'In the quest to predict the weather, your scientists deploy new computational tools to model the atmosphere. These models employ a sophisticated understanding of fluid dynamics and the complexities of the atmosphere. Their attempts, although successful, are ultimately constrained by the sensitivity of the atmosphere to initial conditions, leading to the discovery of chaos theory. Some scientists also model long-term patterns of the climate, raising uncomfortable questions about humanity’s impact on the planet.', 60, 35, 15);
  const quantDot = new techCard('Quantum Dots', 1400, 'Playing around with semiconductors leads your scientists to create materials on the scale of nanometers that confine electrons, a kind of “artificial atom” known as a quantum dot. Much like atoms, they can emit and absorb light, and thus look very pretty. Their small size makes quantum effects prominent, providing a platform to study the behaviour of quantum materials and develop new technologies, such as quantum information processing and novel photovoltaics.', 30, 5, 15);
  const graphPro = new techCard('Graphics Processing', 1600, 'The rise of electronic computers leads to a desire for more intuitive ways to interact with them, creating the field of computer graphics. It becomes a staple of computing and is especially enjoyed in activities such as modelling and gaming. As graphics become more intensive, your engineers invent dedicated semiconductor processing chips to handle them, providing many cores for parallel processing of graphics. Their massively parallel nature later leads to GPUs being applied for many non-graphical problems.', 90, 35, 15);
  const storMed = new techCard('Storage Media', 1900, 'Computers require robust ways to store information. Your engineers develop various schemes involving sophisticated microelectronic structures, including magnetic drives, optical disks, and solid state drives. Although initially expensive, rapid developments make them cheaper and better, enabling a proliferation of storage capacity that allows your citizens to harness the full potential of computers.', 120, 40, 15);
  const medImg = new techCard('Medical Imaging', 1800, 'Until now, doctors could only see the inside of patients during surgeries. Advances in your understanding of electromagnetism and radiation lead to novel ways of seeing inside the body without penetrating it. These include x-ray scans for bones, Computed Tomography (CT) scans for cross-sectional views of the body, and Magnetic Resonance Imaging (MRI) for soft tissues. These techniques enable doctors to better understand their patients and make informed diagnoses, improving health outcomes.', 125, 35, 5);
  const genoSeq = new techCard('Genome Sequencing', 1950, 'While your scientists understand DNA, the entire DNA sequence that makes an organism unique (its genome) is another beast. Starting from rudimentary techniques, your scientists attempt to determine the sequence of base pairs that comprise the genomes of various species. This leads to a massive project to sequence the entire human genome. Later advances make genome sequencing a routine task, allowing for more personalised medicine and a better understanding of how organisms function and are related to each other.', 70, 15, 15);
  const uvLith = new techCard('Extreme UV Lithography', 2100, 'The quest for more powerful electronics leads your engineers to develop a new kind of fabrication technique relying on the high frequency end of the ultraviolet spectrum. Lasers etch tiny patterns onto a substrate covered by a photoresistive material. This advanced technique allows transistors to be scaled down to a few nanometers and enables an increasing density of transistors on microprocessors.', 250, 5, 15);
  const blackholeImg = new techCard('Blackhole Imaging', 2000, 'Following General Relativity’s prediction of black holes, their existence is later confirmed indirectly by the anomalous emission of strong electromagnetic radiation and gravitational lensing. A team of your best astrophysicists want something more, though. Using a global array of advanced radio telescopes and massive data processing, they image the event horizons of several supermassive black holes, producing stunning images that provide a new way to study these spacetime anomalies.', 15, 20, 10);
  const aiEth = new techCard('AI Ethics', 2500, 'Decades of advancing computer hardware and software culminate in the development of machines that seem to think and learn. These primitive artificial intelligences raise many ethical considerations, such as who owns works produced by AIs, whether AIs have rights, and how to proceed with their development in a way that benefits humanity. This joint and decentralised venture brings together your best scholars from across computer science, philosophy, economics, and other disciplines.', 15, -20, 5);
  const antiAging = new techCard('Anti-Aging', 3500, 'Can death be defeated? A group of your scientists dare to say so. Building on the promise of emerging medical interventions, such as gene therapy, regenerative medicine, and STEM cell therapy, they claim that the human lifespan can be radically extended, possibly indefinitely. The hope inspires much research, mainly focused on improving quality of life, but raises some philosophical questions about “playing God”.', 60, 50, 30);
  const nanoLith = new techCard('Nanoimprint Lithography', 2700, 'Your nanotechnologists research new methods of fabricating nanoscale structures utilising mechanical deformation of polymer materials. This method has the advantage of being far simpler than extant nanolithography techniques, providing far greater access to nanostructures for broadened applications. ', 200, 15, 15);
  const ftlProp = new techCard('FTL Propulsion', 1000, 'Einstein’s Relativity proclaims that matter cannot travel faster than light. But your most radical scientists are not deterred by mere words. They develop models of faster-than-light propagation, whether by exotic particles, traversable wormholes, or specialised engines that warp spacetime around a ship. These highly speculative attempts are brushed off by most of your scientists, but they may yet yield something of value…', 0, 0, 10);
  const gravCosmo = new techCard('Gravitational Wave Cosmology', 4000, 'Seeking to see the universe in a new way, your astronomers and engineers construct giant interferometers that measure tiny ripples in spacetime generated by distant astrophysical phenomena, such as the collisions of black holes. This opens the field of gravitational wave astronomy. Different detectors at different scales (including measurements of the rotations of pulsars across the whole Milky Way) can be used to probe different regimes, including the very earliest stages of the universe', 25, 25, 25);
  const aliens = new techCard('Extraterrestrial Life', 10000, '01001000 00000000 01100101 00000000 01101100 00000000 01101100 00000000 01101111 00000000 00100000 00000000 01001000 00000000 01110101 00000000 01101101 00000000 01100001 00000000 01101110 00000000 00100001 00000000 00100000 00000000 01010100 00000000 01101000 00000000 01100001 00000000 01101110 00000000 01101011 00000000 01110011 00000000 00100000 00000000 01100110 00000000 01101111 00000000 01110010 00000000 00100000 00000000 01110000 00000000 01101100 00000000 01100001 00000000 01111001 00000000 01101001 00000000 01101110 00000000 01100111 00000000 00100001 00000000', 500, 1000, 250);
  const earlyMed = new techCard('Early Medicine', 40, 'Your burgeoning civilization tries to understand the nature of disease and how to combat it. They compile detailed texts listing different symptoms and providing guidance on diagnosis and cure. Their understanding of the cause of disease is understandably limited and they believe it to be a product of supernatural influences. That leads your people to sometimes attempt supernatural cures to little effect.', 5, 10, 2);
  const anaStud = new techCard('Anatomical Studies', 40, 'Building upon early expositions of disease, the physician Galen undertakes a revolutionary study of the body by performing dissections on similar animals. He learned about different organ systems and how blood circulates through the body. His early empirical studies comes to define the field of medicine for over a millennium.', 4, 0, 10);
  const earlySurg = new techCard('Early Surgery', 65, 'The craft of surgery makes several major advancements. Your physician Sushruta compiles detailed accounts of many surgeries, including particularly stunning results on plastic surgery. Meanwhile, Hua Tuo puts his patients under a herbal concoction during surgery, the first use of an anaesthetic. These early advancements will lay the groundwork for so much to come. ', 4, 10, 7);
  const hosSys = new techCard('Hospital Systems', 250, 'Your society takes a giant leap towards the professionalization of medicine and the advent of a public health system by creating hospitals. These were spaces where medical knowledge was freely shared, a dedicated staff to care for patients, and hygiene practices. This concept shapes the future delivery of healthcare in your civilization.', 17, 25, 10);
  const microScope = new techCard('Invention of the Microscope', 480, 'Leaping from a rudimentary knowledge of optics, your tinkerer\'s combine lenses and microscopes in ways that magnify very small objects - the first microscopes! While at first mere novelties, they quickly find application in the study of biological tissues, leading to the discover of red blood cells.', 2, 5, 15);
  const germTheory = new techCard('Germ Theory of Disease', 500, 'Harnessing microscopes, your physicians make a fundamental leap in your society’s understanding of disease. They directly observe the microorganisms that comprise yeast and their self-replicating properties. Using spores of a bacterium, scientists successfully infect rats, an experimental triumph for the germ theory of disease. It overthrows “bad air” as the prime explanation for illness and leads to interventions such as sanitation to reduce disease spread.', 45, 25, 20);
  const vax = new techCard('Vaccination', 400, 'Your physicians notice that those infected with smallpox rarely contract it again, leading to the practice of deliberately exposing people to small amounts of smallpox - variolation. Edward Jenner develops a method using cowpox - a less deadly variant - to much success and this inoculation spreads across the globe. It proves a crucial fight against the scourge of smallpox and lays the foundation for more developed vaccinations that will turn the tide for humanity against infectious disease.', 80, 35, 10);
  const antibio = new techCard('Antibiotics', 1400, 'Now understanding the cause of disease, your scientists seek to devise ways to kill microscopic pathogens. They experiment with synthetic chemicals such as dyes, which selectively bind to and kill microbes but mostly preserve human cells. They find out that certain molds naturally kill bacteria, leading to the discovery and distribution of penicillin. New antibiotics are discovered rabidly to fight off various bacteria, creating a world largely free of death from infectious disease.', 130, 75, 10);
  const prost = new techCard('Prosthetics', 850, 'An advanced understanding of mechanical machinery and the body itself leads to the development of movable prosthetic limbs, replete with sockets and joints. These prosthetics evolve to more naturally integrate into the body and even be controllable by electrical impulses from the nervous system. They enable an unfortunate segment of your population to regain their dignity and mobility.', 50, 30, 5);
  const epidModel = new techCard('Epidemiological Modelling', 1000, 'The wealth of data your society generates and the sophisticated computing machinery you have to analyse allows your scientists to create sophisticated models of the spread of disease. They can track epidemics in real time, make projections, and recommendations for containment and future preparation. Surely it will prevent any major pandemics from occurring???', 50, 10, 5);
  const carbCapt= new techCard('Carbon Capture', 3000, 'The impact of humanity on the composition of the atmosphere is indisputable and the effects of the resultant warming are already being felt. In a desperate bid, you begin initiatives to remove carbon dioxide and other greenhouse gases from the atmosphere. These measures include devices to scrub carbon from polluting sources, chemical processes to capture extant carbon from the air, and reservoirs to store them underground. These methods are expensive and show limited promise as climate solutions.', 30, 5, 0);
  
  stoneTools.addHardChild(earlyAgri);
  stoneTools.addHardChild(urbanTech);
  stoneTools.addHardChild(irriDike);
  stoneTools.addHardChild(stoneHenge);
  stoneTools.addHardChild(sunDials);
  stoneTools.addHardChild(ironMetal);
  
  selectBreed.addHardChild(earlyAgri);
  selectBreed.addSoftChild(irriDike, 4);
  
  earlyAstro.addHardChild(heliomodel1);
  earlyAstro.addHardChild(helioModel2);
  earlyAstro.addHardChild(planetAstro);
  earlyAstro.addSoftChild(pythMath, 5);
  earlyAstro.addSoftChild(babyAstro, 8);
  earlyAstro.addSoftChild(stoneHenge, 50);
  earlyAstro.addSoftChild(sunDials, 7);
  earlyAstro.addSoftChild(comet, 10);
  
  earlyAgri.addHardChild(terraFarm);
  earlyAgri.addHardChild(agriField);
  earlyAgri.addSoftChild(pythMath, 10);

  urbanTech.addHardChild(romeConc);
  urbanTech.addHardChild(windPower);
  urbanTech.addHardChild(earlyMed);
  urbanTech.addSoftChild(terraFarm, 5);
  urbanTech.addSoftChild(pythMath, 10);

  irriDike.addSoftChild(terraFarm, 4);

  sunDials.addHardChild(planetAstro);
  sunDials.addSoftChild(calAstro, 10);

  pythMath.addHardChild(axiomGeom);
  pythMath.addSoftChild(natPhil, 10);
  pythMath.addSoftChild(statics, 10);

  ironMetal.addHardChild(gothArch);
  ironMetal.addHardChild(seismo);
  ironMetal.addSoftChild(romeConc, 10);

  earlyMed.addHardChild(anaStud);

  natPhil.addHardChild(aliens);
  natPhil.addHardChild(expResearch);
  natPhil.addSoftChild(zero, 10);
  natPhil.addSoftChild(inertia, 10);
  natPhil.addSoftChild(optics, 10);
  natPhil.addSoftChild(alchemy, 10);
  natPhil.addSoftChild(anaStud, 10);
  

  statics.addHardChild(earlyMech);

  planetAstro.addHardChild(calAstro);
  planetAstro.addHardChild(magDec);
  planetAstro.addHardChild(geoMorph);
  planetAstro.addSoftChild(teleScope, 100);

  heliomodel1.addSoftChild(helioModel2, 20);

  seismo.addHardChild(waveQuake);

  anaStud.addHardChild(earlySurg);
  anaStud.addHardChild(hosSys);

  earlySurg.addSoftChild(hosSys, 25);

  inertia.addSoftChild(earlyMech, 65);
  inertia.addSoftChild(galileoExp, 10);

  zero.addHardChild(algebra);

  algebra.addHardChild(madApprox);
  algebra.addHardChild(comVar);
  algebra.addHardChild(mapProj);
  algebra.addHardChild(boolAlg);
  algebra.addHardChild(calculus);
  algebra.addHardChild(analEng);

  optics.addHardChild(eyeGlasses);
  optics.addHardChild(laserMaser);
  optics.addHardChild(teleScope);
  optics.addHardChild(microScope);

  alchemy.addHardChild(gunPowder1);
  alchemy.addHardChild(modChem);

  windPower.addHardChild(manuShips);

  expResearch.addHardChild(magDec);
  expResearch.addSoftChild(empire, 240);

  gunPowder1.addSoftChild(gunPowder2, 85);

  earlyMech.addSoftChild(manuShips, 85);
  earlyMech.addSoftChild(mechClocks, 20);

  geoMorph.addHardChild(currWind);

  magDec.addHardChild(newWorld);

  manuShips.addHardChild(newWorld);

  agriField.addSoftChild(natRefig, 20);

  mechClocks.addHardChild(piezoQuartz);
  mechClocks.addHardChild(cottonGin);
  mechClocks.addSoftChild(steamEngines, 100);

  eyeGlasses.addSoftChild(microScope, 100);

  currWind.addHardChild(newWorld);
  currWind.addSoftChild(fluidDyn, 40);

  empire.addHardChild(modChem);
  empire.addHardChild(galileoExp);
  empire.addHardChild(lightExp);
  empire.addHardChild(artRefrig);
  empire.addHardChild(germTheory);
  empire.addHardChild(vax);
  empire.addSoftChild(microScope, 40);
  

  natRefig.addSoftChild(artRefrig, 50);

  comVar.addSoftChild(flight, 500);
  comVar.addSoftChild(quantMech, 250);

  galileoExp.addHardChild(newtonMotion);

  hosSys.addSoftChild(vax, 50);
  hosSys.addSoftChild(prost, 100);

  helioModel2.addHardChild(planetMotion);

  calculus.addHardChild(realAnal);
  calculus.addHardChild(fluidDyn);
  calculus.addHardChild(epidModel);
  calculus.addHardChild(statMech);
  calculus.addHardChild(elecDyn);
  calculus.addSoftChild(thermoDyn, 50);

  elecGen.addSoftChild(lightExp, 100);
  elecGen.addSoftChild(elecDyn, 75);

  newtonMotion.addHardChild(steamEngines);
  newtonMotion.addHardChild(fluidDyn);
  newtonMotion.addHardChild(quantMech);
  newtonMotion.addHardChild(relativity);
  newtonMotion.addHardChild(seisEng);
  newtonMotion.addHardChild(prost);
  newtonMotion.addHardChild(extragalAstro);
  newtonMotion.addSoftChild(thermoDyn, 20);

  microScope.addHardChild(germTheory);

  planetMotion.addHardChild(extragalAstro);

  steamEngines.addHardChild(thermoDyn);

  waveQuake.addHardChild(seisEng);

  modChem.addHardChild(carbCapt);
  modChem.addHardChild(photoFilm);
  modChem.addHardChild(battery);
  modChem.addHardChild(haberPro);
  modChem.addHardChild(perTable);
  modChem.addSoftChild(antibio, 200);

  lightExp.addHardChild(teleGraph);
  lightExp.addHardChild(semiCond);
  lightExp.addHardChild(piezoQuartz);
  lightExp.addHardChild(elecDyn);

  artRefrig.addSoftChild(thermoDyn, 30);

  analEng.addHardChild(elecmagComp);

  fluidDyn.addHardChild(flight);
  fluidDyn.addHardChild(atmoModel);

  teleGraph.addHardChild(wireComm);

  battery.addSoftChild(elecDyn, 75);

  thermoDyn.addHardChild(statMech);
  thermoDyn.addHardChild(carbCapt);
  thermoDyn.addHardChild(haberPro);

  germTheory.addHardChild(antibio);
  germTheory.addHardChild(epidModel);

  realAnal.addHardChild(gradDesc);

  boolAlg.addSoftChild(elecmagComp, 80);

  semiCond.addHardChild(transistor);

  piezoQuartz.addHardChild(quartzClocks);

  photoFilm.addHardChild(blackholeImg);

  statMech.addSoftChild(quantMech, 50);
  statMech.addHardChild(nanoTech);

  elecDyn.addHardChild(radiation);
  elecDyn.addHardChild(wireComm);
  elecDyn.addHardChild(relativity);
  elecDyn.addHardChild(transistor);
  elecDyn.addHardChild(laserMaser);

  perTable.addHardChild(radiation);

  elecmagComp.addHardChild(compNet);
  elecmagComp.addHardChild(atmoModel);
  elecmagComp.addSoftChild(gradDesc, 100);

  radiation.addHardChild(medImg);
  radiation.addHardChild(dna);
  radiation.addHardChild(quantMech);

  wireComm.addHardChild(satellites);
  wireComm.addSoftChild(compNet, 500);

  relativity.addHardChild(partColl);
  relativity.addHardChild(ftlProp);
  relativity.addHardChild(satellites);
  relativity.addHardChild(gravCosmo);
  relativity.addHardChild(blackholeImg);

  extragalAstro.addHardChild(blackholeImg);
  extragalAstro.addHardChild(gravCosmo);

  quantMech.addHardChild(transistor);
  quantMech.addHardChild(partColl);
  quantMech.addHardChild(laserMaser);
  quantMech.addHardChild(nanoTech);

  gradDesc.addSoftChild(graphPro, 100);

  compNet.addHardChild(blackholeImg);
  compNet.addSoftChild(epidModel, 100);
  compNet.addSoftChild(genoSeq, 200);

  transistor.addHardChild(graphPro);
  transistor.addHardChild(storMed);
  transistor.addHardChild(gravCosmo);
  transistor.addHardChild(genoSeq);
  transistor.addHardChild(uvLith);
  transistor.addHardChild(epidModel);
  transistor.addHardChild(aiEth);

  partColl.addSoftChild(graphPro, 100);
  partColl.addSoftChild(storMed, 150);
  partColl.addSoftChild(medImg, 150);

  laserMaser.addHardChild(quantDot);
  laserMaser.addHardChild(storMed);
  laserMaser.addHardChild(uvLith);

  satellites.addHardChild(aliens);

  dna.addHardChild(genoSeq);

  nanoTech.addHardChild(uvLith);

  atmoModel.addHardChild(carbCapt);

  graphPro.addSoftChild(aiEth, 200);

  medImg.addSoftChild(antiAging, 200);

  genoSeq.addHardChild(antiAging);

  uvLith.addHardChild(nanoLith);

  blackholeImg.addSoftChild(ftlProp, 300);


  
  const earlyMan = [babyAstro]
  const ironAge = [pythMath]
  const ancientGreece = [natPhil, statics]
  const deadJesus = [zero, inertia, comet]
  const goldenIslam = [optics, alchemy]
  const midevalTimes = [gunPowder2, mechClocks]
  const renaissance = [printPress, empire, natRefig]
  const enlightenment = [elecGen]
  const modernDay = []
  
return [earlyMan, ironAge, ancientGreece, deadJesus, goldenIslam, midevalTimes, renaissance, enlightenment, modernDay]
  
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

// Define the current remaining duration for each building type
let buildingDuration = {
  military: 0,
  circus: 0,
  school: 0,
};

// Function to handle building construction when a button is clicked
const mPrice = document.getElementById('militaryPrice');
const cPrice = document.getElementById('circusPrice');
const sPrice = document.getElementById('schoolPrice');
mPrice.textContent = buildingCosts.military
cPrice.textContent = buildingCosts.circus
sPrice.textContent = buildingCosts.school
function buildBuilding(buildingType) {
  if (!resources.buildings[buildingType]) {
      // Deduct the gold cost and mark the building as constructed
      if (resources.wealth - buildingCosts[buildingType] < 0) {
        return;
      }

      resources.wealth -= buildingCosts[buildingType];
      resources.buildings[buildingType] = true;
      buildingDuration[buildingType] = 5;
      resources.wealth = Math.round(resources.wealth)



      //Reflect the changes in the resource bar
      document.getElementById('wealthBar').textContent = resources.wealth;

      // Disable the button after construction
      document.getElementById(`build-${buildingType}`).disabled = true;
  }
}



// Add click event listeners to the building buttons
buildMilitaryButton.addEventListener('click', () => {
    buildBuilding('military')
    if (resources.buildings['military']) {
      militaryImage.src = 'library/backgrounds/shield.png'; // Set the image source for military building
    }
});

buildCircusButton.addEventListener('click', () => {
  buildBuilding('circus')
  if (resources.buildings['circus']) {
    circusImage.src = 'library/backgrounds/circus.png'; // Set the image source for circus building
  }
});

buildSchoolButton.addEventListener('click', () => {
  buildBuilding('school')
  if (resources.buildings['school']) {
    schoolImage.src = 'library/backgrounds/book.png'; // Set the image source for school building
  }
});

//#endregion

//#region Code for events
const events = [
  {
    title: "Barbarians attack!",
    description: "Your military has failed to defend your borders against barbarian tribes. Your state is being invaded and your great cities are being sacked! There is chaos on the streets and the barbarians are plundering your treasury. <br> Reduce gold: 5% <br> Reduce happiness: 50%",
    effect: {wealth: 40, happiness: 50},
    chance: 36, // This should be 12.
    MilitaryEvent: "You were attacked by savage barbarians, but your military successfully protected your nation and minimized the losses caused by the attack. <br> Reduce gold: 5% <br> Reduce happiness: 5%",
    MilitaryEffect: {wealth: 5, happiness: 5},
    modifiers: {
      military: 0.3, // This will multiply the chance of this event happening. 1.2 would mean a 20% increased chance. 
      circus: 1.0, // Decreases chance by 0% if circus building is constructed
      school: 1.0, // No effect on chance if school building is constructed
    }
  },
  {
    title: "Piracy and Thievery",
    description: "It’s tough being rich. Pirates have attacked your convoy and stolen a great amount of treasure. Just hope it wasn’t the convoy with your greatest new technology! <br>Reduce gold: 8% <br>Reduce your happiness 10%",
    effect: {wealth: 8, happiness: 10},
    chance: 33,
    MilitaryEvent: "Thieves and cutthroats attempted to ambush your convoy but were thwarted by the talented military platoon that accompanied it, protecting your trade goods and gold.",
    MilitaryEffect: {},
    modifiers: {
      military: 0.3 // This will multiply the chance of this event happening. 1.2 would mean a 20% increased chance.
    }
  },
  {
    title: "War with neighbouring states",
    description: "You have been dragged into a brutal war with your neighbours that leaves your society devastated and treasury depleted. Your peaceful focus on technological development is thrown into chaos. <br> Reduce gold: 30% <br> Reduce happiness: 40%",
    effect: {wealth: 30, happiness: 40},
    chance: 20,
    MilitaryEvent: "A neighboring state declared war on you, but thanks to your military might and superior technology, you were able to fend off their attacks. An economic boom has taken place in your civilization, and new technological advancements have been made in the endeavor for more powerful tools of war, for better or for worse... <br> Increase gold: 30% <br>",
    MilitaryEffect: {wealth: -30},
    modifiers: {
      military: 0.2 // This will multiply the chance of this event happening. 1.2 would mean a 20% increased chance.
    }
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
    chance: 2.4,
    ScienceEvent: true
  },
  {
    title:"Science prophet born",
    description: "Some people are just born different. Such is the case with this prodigious child born in your capital. At the age of six, she is impressing your scholars. Her gifts will be numerous. <br>Increase happiness: 15% <br>Increase science: 15%",
    effect: {happiness: -15, science:-15},
    chance: 1.4,
    ScienceEvent: true
  },
  {
    title: "Increase of state funding",
    description: "The state recognizes the importance of basic research and opens its wallet to the desires of scientists and scholars. Others might feel neglected, though. <br>Increase gold: 30% <br>Increase science: 25% <br>Reduce happiness: 15%",
    effect: {wealth: -30, happiness: 15, science: -25},
    chance: 5,
    ScienceEvent: true
  },
  {
    title: "Agriculture surplus",
    description: "You have vast stores of crops, much more than what is necessary to feed your people at the moment. This attracts hungry stragglers, eager to bow to your rule for a morsel of food, and fellow leaders of civilizations, eager to buy crops from you to feed their people. <br>Increase gold: 35% <br>Increase happiness: 45%",
    effect: {wealth: -35, happiness: -45},
    chance: 10
  },
  {
    title: "Mass Urbanisation",
    description: "Your people are moving in droves from the country farms to your burgeoning cities in search of new opportunities. Existing urban problems become greater challenges but the increased productivity is worth it. <br>Increase gold: 20% <br>Decrease happiness: 20%",
    effect: {wealth: -20, happiness: 20},
    chance: 10,
    isGoodEvent: true
  },
  {
    title: "Luddite riots",
    description: "Some people don't like changes. The future is now old man! <br>Reduce happiness: 8%",
    effect: {happiness: 8},
    chance: 3,
    isGoodEvent: true
  },
  {
    title: "Political Turbulance",
    description: "There is general unrest in your civilization. People are more divided than ever, and you are too distracted by the turmoil to focus on science. <br>Reduce happiness: 10%",
    effect: {happiness: 10},
    chance: 7,
    isGoodEvent: false
  },
  {
    title: "Hackers",
    description:"Welcome to the cyber age! Hackers have infiltrated your computer systems and compromised some of your most valuable secrets. This is annoying but manageable, as long as they did not encrypt the files describing your latest and greatest invention…<br> Reduce gold: 10% <br>Reduce happiness: 5%",
    effect:{wealth: 10, happiness: 5},
    chance: 20,
    isGoodEvent: false,
    techCondition: 'Computer Networks' // This event should only happen once Computer Networks are researched.
  },
  {
    title: "Technological increase in production",
    description:"The advances in technology have compounded to truly transform the way your economy works. The application of new machines and methods is causing production to boom like never before. More, More, More!<br>Increase gold: 20%<br>Increase happiness: 20%",
    effect:{wealth: -20, happiness:-20},
    chance: 10,
    isGoodEvent: true,
    techCondition: 'Steam Engines'
  },
  {
    title: "Increase in private funding",
    description: "Private capital is flooding the market. People are quickly jumping on board, investing money in all kinds of ventures, including science, which they hope will have present returns.<br>Increase science: 10% ",
    effect:{science: -10},
    chance: 10,
    isGoodEvent:true,
    timeCondition: 1800 // This event can only happen after the year 1800 CE.
  },
  {
    title: "Antiscience act",
    description: "Your research has gained the ire of certain groups. They are accusing it of being demonic and are trying to force you to discontinue your program.<br>Reduce happiness: 10% <br>Reduce science: 10%",
    effect:{happiness: 10, science: 15},
    chance: 3,
    isGoodEvent: false
  },
  /*
  {
    title: "New government system",
    description: "50/50 chance for Political Turbulence or Increase in State Funding next turn",
    chance:10,
    isGoodEvent: true
  },
  {
    title: "State censorship",
    description: "The powers that be are concerned with preserving the existing order, with them at the top. These new research directions threaten that status quo, so they’ve shut it down, at least to the extent they can. <br>One research option is shut down for the turn/one tree shut down for multiple turns/one technology devolved.",
    chance: 10
  }
  */
];

const noEventChance = 0.1; // A 10% chance that no events will trigger.
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
      if (resources.science > scienceThreshhold && event.ScienceEvent) {
        // If player's science is above the threshold and it's a good event, increase chance
        weightedChance *= 1.5; // Increase chance by 50%
      }

      if (event.techCondition) {
        if (!researchedCards.includes(event.techCondition)) {
          weightedChance *= 0;
        }
      }

      if (event.timeCondition) {
        if (event.timeCondition > resources.year) {
          weightedChance *= 0;
        }
      }

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
    document.getElementById("barbarianBar").textContent = researchedCards.length;

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

  if (event.MilitaryEvent) {
    triggerMilitaryEvent(event);
    return;
  } 

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


function triggerMilitaryEvent(event) {
  const randomNumber = Math.random() * 100;

  if (!resources.buildings['military'] || randomNumber < 74) {
    for (const resource in event.effect) {
      if (resources.hasOwnProperty(resource)) {
        const decreaseAmount = resources[resource] * (event.effect[resource] / 100);
        resources[resource] -= decreaseAmount;
      }
    }
    showEventModal(event);
    return;
  }
  
  for (const resource in event.MilitaryEffect) {
    if (resources.hasOwnProperty(resource)) {
      const decreaseAmount = resources[resource] * (event.effect[resource] / 100);
      resources[resource] -= decreaseAmount;
    }
  }
  showEventModal(event, event.MilitaryEvent);
}


function showEventModal(event, description = event.description) {
  document.getElementById('event-title').innerHTML = event.title;
  document.getElementById('event-description').innerHTML = description;

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
  if (!resources.buildings['school']) {
    resources.science -= 10;
  }
  if (resources.buildings['circus']) {
    resources.happiness += 10
  }
  

  // Science should not go below 0% or above 100%
  if (resources.science > 100) {
    resources.science = 100; }

  if (resources.science < 0) {
    resources.science = 0; }

  // Happiness should not go below 0.
  if (resources.happiness < 0) {
    resources.happiness = 0
  }

  document.getElementById('wealthBar').textContent = Math.round(resources.wealth);
  document.getElementById('happinessBar').textContent = Math.round(resources.happiness);
  document.getElementById('scienceBar').textContent = Math.round(resources.science);
  document.getElementById('gptBar').textContent = resources.gpt;

  if (resources.year < 0) {
    document.getElementById('yearBar').textContent = -resources.year + " BCE";
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
    // BEFORE ANYTHING HAPPENS, CHECK IF GOLD WILL BECOME NEGATIVE:
    if (debtChecker(cardList)) {
      alert("You do not have enough gold!")
      return;
    }
    
    // Update wealth based on gold per turn from the previous turn.
    resources.wealth += resources.gpt;

    // Select a random event and trigger its effects
    turnCount ++;
    updateTurn();

    // Update the duration of active buildings, and cancel them if they have no remaining duration.
    for (const buildingType in resources.buildings) {
      if (resources.buildings[buildingType]) {
          //resources.wealth -= maintenanceCosts[buildingType];
          //document.getElementById('wealthBar').textContent = Math.round(resources.wealth);
          buildingDuration[buildingType] -= 1;
          
          if (buildingDuration[buildingType] <= 0) {
            // turn the building to false, and reactivate the button.
            resources.buildings[buildingType] = false;

            document.getElementById(`build-${buildingType}`).disabled = false;
          }
      }
  }

    // card populate and get card descriptions.
    const newDescriptions = updateCards(cardList);

    // Trigger event only when the player gets to round 3
    if (turnCount > 3) {
    tryTriggerEvent()
    }

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
  const startSound = document.getElementById('startSound');

  startButton.addEventListener('click', () => {
    // Hide the menu and show the game container
    menuContainer.style.display = 'none';
    gameContainer.style.display = 'block';
    startSound.play();
  });

});

// Intialization code for about button
const aboutModal = document.getElementById('about-modal');
const aboutButton = document.getElementById('about-button');
const closeButton = document.querySelector('.close');

// Open the modal when the "About" button is clicked
aboutButton.addEventListener('click', () => {
    aboutModal.style.display = 'block';
});

// Close the modal when the close button is clicked
closeButton.addEventListener('click', () => {
    aboutModal.style.display = 'none';
});

// Close the modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === aboutModal) {
        aboutModal.style.display = 'none';
    }
});

// Intialization code for restart button
document.addEventListener('DOMContentLoaded', () => {
  const restartButton = document.getElementById('restartButton');
  restartButton.addEventListener('click', () => {
    location.reload(); // Reloads the current page
  });
});

// Initialize log button
const logModal = document.getElementById("log-modal");
const logButton = document.getElementById("logButton");
const logContent = document.getElementById("log-text");
const closeButt = document.querySelector('.close-butt');

logButton.addEventListener('click', () => {
  logModal.style.display = 'block';
  logContent.textContent = researchedCards;
  
});

// Close the modal when the close button is clicked
closeButt.addEventListener('click', () => {
  logModal.style.display = 'none';
});

//#endregion

//#region Initialize the Cards

// This will initialize the cards at the beginning of the game, as well as keep a running list of all cards in the game at the moment.

//var cardList = startCards();
var result = startCards();
var cardList = result.a;
var timedTech = result.b;


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


function debtChecker(cardList) {
  let predictedCost = 0;
  const processedCards = new Set();

  cardList.forEach(card => {
    if (card._card.classList.contains('highlighted')) {
          // Check if the card has not been processed already
          if (!processedCards.has(card._card)) {
              predictedCost += card.cost;
              processedCards.add(card._card); // Add the card to the set of processed cards
          }
    }
  })
  document.getElementById("barbarianBar").textContent = predictedCost;
  return resources.wealth - predictedCost < 0;
}

// This variable can be used to check what cards have been researched based on their title name. The array should only contain strings.
var researchedCards = [];

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

      var i = 0;
      while (i < card.softChildren.length) {
        var reduction = card.softChildDiscount[i]; 
        card.softChildren[i].softDiscount(reduction);
        i++;
      }
    
      card._card.classList.remove('highlighted');
      researchedCards.push(card.name);
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

  // This gives a notification that a building is in effect.
  if (resources.buildings['military']) {
    const paragraph = document.createElement('p');

    paragraph.textContent = 'Your military is vigilantly defending your borders and maintaining peace in your cities.';

    descriptionArea.appendChild(paragraph);
  }

  if (resources.buildings['circus']) {
    const paragraph = document.createElement('p');

    paragraph.textContent = 'Your circus is putting on shows across your lands, lightening your people\'s moods and bringing laughter to their lives. You gain 10 happiness.';

    descriptionArea.appendChild(paragraph);
  }

  if (resources.buildings['school']) {
    const paragraph = document.createElement('p');

    paragraph.textContent = 'The children taught in your schools will keep your citizens well informed and inspired to make new discoveries in the world. Your science will not decrease this turn.';

    descriptionArea.appendChild(paragraph);
  }

  if (resources.happiness < 101) {
    const paragraph = document.createElement('p');
  
    paragraph.textContent = 'Your people are pretty unhappy. Maybe you should think about making them happier.';

    descriptionArea.appendChild(paragraph);
  }



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


// These variables are used to stop timedTechs from being put into the game a second time.
// They are used in the function moveTime()
var earlyMan0 = false;
var bronzeAge0 = false;
var ancientGreece0 = false;
var deadJesus0 = false;
var goldenIslam0 = false;
var midevalTimes0 = false;
var renaissance0 = false;
var enlightenment0 = false;
var modernDay0 = false;


function moveTime() {
  /**
   * This function will move time forward depending on what the year is.
   * 
   * It will also manage adding techs that have no hard prerequisites at their associated era. 
   * 
   * In earlier years, time will move faster per turn, and it gets slower the closer you get to the modern era.
   */

  if (resources.year < -2000) {
    resources.year += 3000
  }

  else if(-2000 <= resources.year  && resources.year < 0) {
    resources.year += 250
  }

  else if (0 <= resources.year && resources.year < 1800) {
    resources.year += 100
  }

  else if (1800 <= resources.year && resources.year < 1900) {
    resources.year += 10
  }

  else {
    resources.year += 10
  }


  // This will add babylonian astronomy once the year 2300 BC has passed.
  if (resources.year > -2300 && earlyMan0 === false) {
    populateCards(timedTech[0]);
    //cardList.push(timedTech[0][0]);
    timedTech[0].forEach(card => {
      cardList.push(card);
    })
    earlyMan0 = true;
  }

  // This will add pythMath once the bronze age rolls around, 1200 BC.
  if (resources.year > -1200 && bronzeAge0 === false) {
    populateCards(timedTech[1]);
    //cardList.push(timedTech[1][0]);
    timedTech[1].forEach(card => {
      cardList.push(card);
    })
    bronzeAge0 = true;
  }

  // This will add ancient greek stuff, natural philosophy is 600 BC, so I set it to 600 BC.
  if (resources.year > -600 && ancientGreece0 === false) {
    populateCards(timedTech[2]);
    timedTech[2].forEach(card => {
      cardList.push(card);
    })
    ancientGreece0 = true;
  }

  // This will add techs from around the year zero.
  if (resources.year >= 0 && deadJesus0 === false) {
    populateCards(timedTech[3]);
    timedTech[3].forEach(card => {
      cardList.push(card);
    })
    deadJesus0 = true;
  }

  // yadayadayada.
  if (resources.year >= 600 && goldenIslam0 === false) {
    populateCards(timedTech[4]);
    timedTech[4].forEach(card => {
      cardList.push(card);
    })
    goldenIslam0 = true;
  }


  if (resources.year >= 1000 && midevalTimes0 === false) {
    populateCards(timedTech[5]);
    timedTech[5].forEach(card => {
      cardList.push(card);
    })
    midevalTimes0 = true;
  }


  if (resources.year >= 1400 && renaissance0 === false) {
    populateCards(timedTech[6]);
    timedTech[6].forEach(card => {
      cardList.push(card);
    })
    renaissance0 = true;
  }


  if (resources.year >= 1780 && enlightenment0 === false) {
    populateCards(timedTech[7]);
    timedTech[7].forEach(card => {
      cardList.push(card);
    })
    enlightenment0 = true;
  }

  /*
  if (resources.year >= 2010 && modernDay0 === false) {
    populateCards(timedTech[8]);
    timedTech[8].forEach(card => {
      cardList.push(card);
    })
    modernDay0 = true;
  }
  */
  






}


//#endregion
