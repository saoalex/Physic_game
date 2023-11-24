class techCard {
    /* 
    This class requires there to be a css section for:
    .researchCard
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
        /*
        const new_card = document.createElement('div');
        new_card.classList.add('researchCard')
        new_card.innerHTML = `<div class="card-title">${this._name}</div>
                        <div class="card-value">Cost: ${this._cost} </div>
                        <div class="card-value">+${this._gpt} GPT</div>
                        <div class="card-value">+${this._happiness} Happiness</div>
                        <div class="card-value">+${this._science} Support</div>`;
        */

        const new_card = document.createElement('div');
        new_card.className = 'card';
        new_card.innerHTML = `<div class="card-title">${this._name}</div>
                        <div class="card-value">Cost: ${this._cost} </div>
                        <div class="card-value">+${this._gpt} GPT</div>
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

    const stoneTools = new techCard('Stone Tools', 5, 'Your people have learned how to use stone to create tools for various purposes!', 5, 5, 0);
    const animalHusbandry = new techCard('Animal Husbandry', 100, 'People raise animal. People kill animal. Profit.', 69, 69, 1);
    const exampleStartingTech = new techCard('Example Starting Tech', 1, 'Your people learned to do this thing. Yay!', 20, 10, -5);
    
    const ironTools = new techCard('Iron Tools', 5, 'placeholder', 99, 99, 0)
    stoneTools.addHardChild(ironTools);
    const bronzeTools = new techCard('Bronze Tools', 5, 'placeholder', 99, 99, 0)
    ironTools.addHardChild(bronzeTools);

    var cardList = [];
    cardList.push(stoneTools);
    cardList.push(animalHusbandry);
    cardList.push(exampleStartingTech)
    
    return cardList;
}


function updateCards(cardList) {
    /*
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
            
            newCards = newCards.concat(card.hardChildren);
            
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

    return newCards, changeGold, changeGPT, changeHappiness, changeScience, newDescription;
}

function initializeTechTree() {

}


export {updateCards, startCards, techCard}





