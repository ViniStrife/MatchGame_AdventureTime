// Classes

const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";
const LOGO = "logo";

//Start Game

startGame();

function startGame(){

    initializeCards( game.createCardsFromCharacters());

}

//Visual Cards

function initializeCards(cards){

    let gameBoard = document.getElementById("gameBoard");

    gameBoard.innerHTML = '';
    
    game.cards.forEach(card => {

        let cardElement = document.createElement('div');

        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);

    })

}

//Create Card Content

function createCardContent(card, cardElement){

        createCardFace(FRONT, card, cardElement);
        createCardFace(BACK, card, cardElement);

}

//Create Card Face

function createCardFace(face, card, element){

    let cardElementFace = document.createElement('div');

    cardElementFace.classList.add(face);

    if(face === FRONT){
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    }else{
        let logoElement = document.createElement('img');
        logoElement.classList.add(LOGO);
        logoElement.src = "./assets/images/" + LOGO + ".png";
        cardElementFace.appendChild(logoElement);
    }

    element.appendChild(cardElementFace);

}

//Flip Card

function flipCard(){

    if (game.setCard(this.id)){
        this.classList.add("flip");
        
        if(game.secondCard){

            if(game.checkMatch()){
                game.clearCards();

                if(game.checkGameOver()){
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = 'flex';
                }

            }else{
                setTimeout(() => {
                let firstCardView = document.getElementById(game.firstCard.id);
                let secondCardView = document.getElementById(game.secondCard.id);

                firstCardView.classList.remove('flip');
                secondCardView.classList.remove('flip');
                game.unflipCards();
                },  1000);
            }
        }

    }

}

//RestartGame

function restart(){

    game.clearCards();

    startGame();

    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';

}



