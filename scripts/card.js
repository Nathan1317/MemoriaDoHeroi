//Class to manage card creation and actions
class CardManager {
    // Attributes
    flippedCards = new Set();
    urlFactory;

    //  Constructor
    constructor(factory) {
        this.urlFactory = factory;
    }

    // Generate new card based in the hero number
    gen(heroNumber) {
        // Get reference to the template and clone it's contents
        let template = document.getElementById("cardTemplate");
        let clone = template.content.cloneNode(true);

        // Get reference to the image element
        let img = clone.querySelector('img');

        //Change the source of the image
        img.setAttribute('src', this.urlFactory(heroNumber));

        // Handle card clicks
        clone.children[0].addEventListener('click',
            event => this.onClick(event)
        );
        
        return clone; // Return the modified clone
    }

    //Handle click events
    onClick(event) {
        if(this.flippedCards.size >= 2 ){
            this.endTurn();
        }else{
            this.flip(event.target);
        }
    }

    //Change card state

    //Flip the received card
    flip(cardNode) {
        cardNode.children[0].classList.add('selected');
        // Add the card to the set for checking later
        this.flippedCards.add(cardNode);
    }

    //Unflip the received card
    unFlip(cardNode) {
        cardNode.children[0].classList.remove('selected');
    }

    //Set received card as matched
    disable(cardNode) {
        cardNode.children[0].classList.add('matched');
        this.unFlip(cardNode);
    }

    // Turn methods
    
    // Check if is a match
    check(){
        // Turn the set into an array and map it
        let urls = [...this.flippedCards].map((card)=>{
            // Return the src of the image
            return card.querySelector('img').src;
        })
        // Return true only if the url are equals
        return urls[0] == urls[1];
    }
    
    // Finish a turn
    endTurn(){
        // Choose the function to end the turn
        // If is a match, disable cards
        // else unflip the cards
        let handler = this.check() ? (card)=>this.disable(card): this.unFlip;
        // Run the handler in both flipped cards
        this.flippedCards.forEach(handler);
        // Empty the set
        this.flippedCards.clear();
    }

}