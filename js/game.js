//Game

let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    // Characters

    characters: ['bmo',
    'bubblegum',
    'finn',
    'flame',
    'iceKing',
    'jake',
    'lady',
    'lich',
    'marceline',
    'marshall'],

    //SetCard

    setCard: function(id){

        let card = this.cards.filter(card=>card.id===id)[0];

        if(card.flipped || this.lockMode){
            return false;
        }

        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }else{
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }

    },

    //Check Match

    checkMatch: function(){

        if(!this.firstCard || !this.secondCard){
            return false;
        };

        return this.firstCard.icon === this.secondCard.icon;
    
    },

    //Clear Cards

    clearCards: function(){

        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;

    },

    //Unflip Cards

    unflipCards(){

        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();

    },

    //Check GameOver

    checkGameOver(){

        return this.cards.filter(card => !card.flipped).length ==0;

    },
    
    //Create Cards
    
    cards: null,

    createCardsFromCharacters: function () {

        this.cards = [];

        this.characters.forEach((character) => {
            this.cards.push(this.createPairFromCharacter(character));
        });
    
        this.cards = this.cards.flatMap(pair=>pair);
        this.shuffleCards();
        return this.cards;

    },

    //Create Pair

    createPairFromCharacter: function(character){

        return [{
            id: this.createIdWithCharacter(character),
            icon: character,
            flipped: false,
        }, {
            id: this.createIdWithCharacter(character),
            icon: character,
            flipped: false,
        }]

    },

    //Create Id Of Character

    createIdWithCharacter: function(character){

        return character + parseInt(Math.random() * 1000);

    },

    //Shuffle Cards

        shuffleCards: function(cards){

        let currentIndex = this.cards.length;
    
        let randomIndex = 0;

        while (currentIndex !== 0){

            randomIndex = Math.floor(Math.random() * currentIndex)
        
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]

        }

    }

}

