const startGame = document.querySelector('.start')
const playerHit = document.querySelector('.hit')
const playerStand = document.querySelector('.stand')
const placeBet = document.querySelector('.bet')
const hands = document.getElementsByClassName('hand')

startGame.addEventListener('click', () => {
    dealer.start(deck, [player, dealer])
})

playerHit.addEventListener('click', () => {
    dealer.hit(deck, player)
})

playerStand.addEventListener('click', () => {
    dealer.resolve(deck, player)
})

placeBet.addEventListener('click', () => {
    player.makeBet(500)
})