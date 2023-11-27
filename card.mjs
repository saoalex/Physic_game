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
    addSoftChild(childCard) {
        this.softChildren.push(childCard);
        // Update the displayed number of soft children
        // this.updateSoftChildrenCount();
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


export {updateCards, startCards, techCard}





