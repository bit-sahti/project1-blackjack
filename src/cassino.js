class Cassino {
    constructor() {
        this.startGame = document.querySelector('.start')
        this.rules = document.querySelector('.rules')
        this.playerHit = document.querySelector('.hit')
        this.playerDeal = document.querySelector('.deal')
        this.playerStand = document.querySelector('.stand')
        this.playerCash = document.querySelector('.cash')
        this.playerBet = document.querySelector('.bet p')
        this.messagesSection = document.querySelector('.messages')
    }

    listen() {
        const warning = 'Cards must be dealt.'

        this.startGame.addEventListener('click', () => {
            const main = document.querySelector('main')
            main.classList.remove('hidden')
            main.scrollIntoView()

            document.querySelector('header').classList.add('hidden')
            
            dealer.start(deck, 2, [player, dealer])
        })

        this.rules.addEventListener('click', () => {
            const logo = document.querySelector('header div')
            const explanation = document.querySelector('.explanation')

            logo.classList.add('hidden')
            explanation.classList.remove('hidden')
            
            document.querySelector('.explanation button').addEventListener('click', () => {
                const main = document.querySelector('main')
                main.classList.remove('hidden')
                main.scrollIntoView()

                document.querySelector('header').classList.add('hidden')
                
                dealer.start(deck, 2, [player, dealer])
            })
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
            
        this.playerDeal.addEventListener('click', function dealOnce () {            
            if (player.bet <= 0) {
                window.alert('You must place a bet')
            } else {
                dealer.deal(deck, [player, dealer])
                
                    cassino.playerDeal.classList.add('hidden')
                    player.canBet = false
                    
                
            }

        })
    }

    generateChips(values) {
        this.removeChips()
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
            chips[i].addEventListener('click', function listenToBets () {
                const amount = Number(chips[i].querySelector('span').innerHTML);

                player.makeBet(amount)

                cassino.removeChips()
                cassino.generateChips(player.getExtraChips())

                cassino.updateBet();
            })
        }
    }

    updateBet() {
        this.playerBet.innerHTML = `$${player.bet}`;
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

        // console.log(card);

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
        this.secretCard = document.querySelectorAll('.dealer .hand .card')[1];
        this.secretCard.classList.add('secret');
    }

    revealCard() {
        console.log(dealer.secretCard, this.secretCard);
        if(this.secretCard) {
            console.log('remove called');
            this.secretCard.classList.remove('secret');
        }

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

    showMessage(type) {
        // window.alert(`you win! ${player.bet} added to your balance`);
        const table = document.querySelector('table')
        const message = document.querySelector(`.${type}`)

        

        this.messagesSection.classList.remove('hidden')        
        message.classList.remove('hidden')

        setTimeout(() => {
            dealer.prepareTable([player, dealer])
            player.clearBet()
            this.updateCash(player.cash)

            message.classList.add('hidden')            
            this.messagesSection.classList.add('hidden')
            this.playerDeal.classList.remove('hidden')
        }, 1500)
    }
    
    playerBlackjack() {
        this.showMessage('blackjack')
    }

    playerWin() {
        this.showMessage('win')
    }

    playerLose() {
        // window.alert('you lose. house takes bet')
        // this.updateCash(player.cash)
        // this.updateBet()
        this.showMessage('lose')
    } 

    playerBust() {
        // window.alert('busted! house takes bet')
        // this.updateCash(player.cash)
        // this.updateBet()
        this.showMessage('bust')
    }

    push() {
        this.showMessage('push')
    }

    restart() {
        document.querySelector('header').classList.remove('hidden')
        document.querySelector('.table').classList.add('hidden')


    }
}

//Prepare to run game;
const cassino = new Cassino();
cassino.listen()