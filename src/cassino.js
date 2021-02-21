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
}

const cassino = new Cassino();
cassino.listen()