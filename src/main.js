class Deck {
    constructor() {
        this.suits = ['clubs']
        this.cards = []
    }

    addSingles(){
        this.suits.forEach((suitName) => {
            for (let i = 2; i < 11; i++) {
                this.cards.push({
                    value: i,
                    suit: suitName
                })
            }
        })
    }

    addTens() {
        const names = ['Jack', 'Queen', 'King']

        this.suits.forEach((suitName) => {
            for (let i = 0; i < 3; i++) {
                this.cards.push({
                    name: names[i],
                    value: 10,
                    suit: suitName
                })
            }
        })
    }

    addAces() {
        this.suits.forEach(suitName => {
            this.cards.push({
                name: 'Ace',
                minValue: 1,
                maxValue: 11,
                suit: suitName
            })
        })
    }

    build () {
        this.addAces(),
        this.addSingles(),
        this.addTens()
    }
}



class Dealer {
    constructor() {
        this.hand = [];
    }
    
    start(deck, players) {
        console.log('starting');
        
        players.forEach(player => {
            this.hit(deck, player);
        })

        players[players.length - 1].getSecretCard()

        players.forEach(player => {
            this.hit(deck, player);
        })
        
        console.log('ready to go');

    }
    
    hit(deck, player) {        
        let random = Math.floor(Math.random() * deck.cards.length);
            
        player.hand.push(deck.cards[random])
        deck.cards.splice(random, 1)
    
        console.log('hit');      
    }
    
    getSecretCard() {
        this.secretCard = this.hand[0]
    }

    verifyHand(player) {
        let total = player.hand.reduce((acc, card) => {
            return acc += card.value
        }, 0)
        
        if (total === 21){
            console.log('win');
        } else if (total > 21) {
            console.log('lose');
        } else {
            console.log('hit?');
        }
    }
}

class Player {
    constructor() {
        this.cash = 1000;
        // this.chipsValues = [25, 50, 100, 250, 500, 1000, 5000]
        this.chips = [
            {value: 25, quantity: 6},
            {value: 50, quantity: 3},
            {value: 100, quantity: 2},
            {value: 250, quantity: 2},
        ];
        this.bet = 0;
        this.hand = [];
    }        
}