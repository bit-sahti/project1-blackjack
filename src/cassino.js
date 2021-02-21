class Cassino {
    constructor() {
        this.startGame = document.querySelector('.start')
        this.playerHit = document.querySelector('.hit')
        this.playerStand = document.querySelector('.stand')
        this.placeBet = document.querySelector('.bet')
    }

    listen() {
        this.startGame.addEventListener('click', () => dealer.start(deck, [player, dealer]))
        this.playerHit.addEventListener('click', () => dealer.hit(deck, player))
        this.playerStand.addEventListener('click', () => dealer.resolve(deck, player))
        this.placeBet.addEventListener('click', () => player.makeBet(500))
    }

    handCard(card, player) {
        const playerHand = document.querySelector(`.${player.type} .hand`)
        const newDiv = document.createElement('div')

        newDiv.setAttribute('class', 'card') 
        newDiv.classList.add(`${card.suit}`)
        newDiv.innerHTML = `${card.name ? card.name : card.value}`
      

        playerHand.appendChild(newDiv)
        console.log(playerHand)
    }

    discartCards(players) {
        players.forEach(player => {
            const playerHand = document.querySelector(`.${player.type} .hand`)

            while (playerHand.firstChild) {
                playerHand.removeChild(playerHand.lastChild)
            }
        });
    }
}

const cassino = new Cassino();
cassino.listen()
// cassino.handCard(deck, player)