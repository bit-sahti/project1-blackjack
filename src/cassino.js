class Cassino {
    constructor() {
        this.startGame = document.querySelector('.start')
        this.playerHit = document.querySelector('.hit')
        this.playerDeal = document.querySelector('.deal')
        this.playerStand = document.querySelector('.stand')
        this.playerCash = document.querySelector('.cash')
        this.playerBet = document.querySelector('.bet p')
    }

    listen() {
        const warning = 'Cards must be dealt.'

        this.startGame.addEventListener('click', () => {
            const main = document.querySelector('main')
            main.classList.remove('hidden')
            main.scrollIntoView()
            
            dealer.prepareTable([player, dealer])
        })

        this.playerHit.addEventListener('click', () => {
            if (player.hand.length < 2) {
                window.alert(warning)
            } else {
                dealer.hit(deck, player)
            }

        })
        
        this.playerStand.addEventListener('click', () => {
            if (player.hand.length < 2) {
                window.alert(warning)
            } else {
                dealer.resolve(deck, player)
            }
        })
            
        this.playerDeal.addEventListener('click', () => {            
            if (player.bet <= 0) {
                window.alert('You must place a bet')
            } else {
                dealer.start(deck, [player, dealer])
            }
        })
    }

    generateChips(values) {
        const chipsContainer = document.querySelector('.chips')
        // console.log(values);
        
        for (let i = 0; i < values.length; i++) {
            // console.log(values);
            const newChip = document.createElement('button')
            newChip.setAttribute('id', `n-${values[i]}`)
            chipsContainer.appendChild(newChip).innerHTML = `<span>${values[i]}</span>`
            // console.log(newChip.innerHTML);
        }

        this.waitBet()
    }

    waitBet() {
        const chips = document.querySelectorAll('.chips button')

        for (let i = 0; i < chips.length; i++) {
            chips[i].addEventListener('click', () => {
                const amount = Number(chips[i].querySelector('span').innerHTML);

                player.makeBet(amount)

                this.removeChips()
                this.generateChips(player.getExtraChips())

                this.playerBet.innerHTML = `$${player.bet}`
            })
        }
    }

    removeChips() {
        const chipsContainer = document.querySelector('.chips')

        while(chipsContainer.firstChild) {
            chipsContainer.removeChild(chipsContainer.lastChild)
        }
    }

    handCard(card, player) {
        const playerHand = document.querySelector(`.${player.type} .hand`)
        const cardDiv = document.createElement('div')

        cardDiv.setAttribute('class', 'card') 
        cardDiv.classList.add(`${card.suit}`)
        cardDiv.innerHTML = `
            <div class="top">
                <span>${card.name ? card.name : card.value}</span>
                <span>${card.suitSymbol}</span> 
            </div>
            <span>${card.suitSymbol}</span>
            <div class="bottom">
                <span>${card.suitSymbol}</span> 
                <span>${card.name ? card.name : card.value}</span>
            </div>`

        playerHand.appendChild(cardDiv)
    }

    discartCards(players) {
        players.forEach(player => {
            const playerHand = document.querySelector(`.${player.type} .hand`)

            while (playerHand.firstChild) {
                playerHand.removeChild(playerHand.lastChild)
            }
        });
    }

    hideCard(){
        this.secretCard = document.querySelector('.dealer .hand .card');
        this.secretCard.classList.add('secret');
    }

    revealCard() {
        this.secretCard.classList.remove('secret');
        this.displayTotal(dealer, dealer.countPoints(dealer))
    }

    displayTotal(player, totalPoints) {
        let totalDisplay = document.querySelector(`.${player.type} .total`);

        totalDisplay.classList.remove('hidden')
        totalDisplay.innerHTML = `Total: ${totalPoints}`
        // console.log('here', points);
    }

    hideTotal() {
        let totalDisplays = document.querySelectorAll('.total');

        totalDisplays.forEach(display => {
            display.classList.add('hidden')
        })
    }

    updateCash(amount) {
        this.playerCash.innerHTML = `$${amount}`
    }
}

//Prepare to run game;
const cassino = new Cassino();
cassino.listen()