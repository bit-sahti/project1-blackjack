class Deck {
    constructor() {
        this.suits = ['clubs', 'diamonds', 'hearts', 'spades']
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
        players.forEach(player => player.hand = [])
        
        console.log('starting');
        console.log(players);
        
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

    countPoints(player) {
        let aces = player.hand.filter(card => card.name === 'Ace')
        let others = player.hand.filter(card => card.value)
        
        let total = others.reduce((acc, card) => acc += card.value, 0)

        
        aces.forEach(ace => {
            if (total < 11) {
                total += ace.maxValue
            } else {
                total += ace.minValue
            }
        })
        
            return total;
        
    }

    consecutiveHits(deck) {
        while (this.countPoints(this) < 17) {
            // console.log('loop', 'total => ', this.countPoints(this));
            this.hit(deck, this);
        }

        return this.countPoints(this);
    }

    resolve(deck, player) {
        const playerTotal = this.countPoints(player);

        if (playerTotal === 21) {
            this.countPoints(this) === 21 ? console.log('push') : player.win();
        } else if (playerTotal > 21) {
            player.bust();
        } else {
            const dealerTotal = this.countPoints(this) < 17 ? this.consecutiveHits(deck) : this.countPoints(this);

            console.log('inside resolve ====> ', 'dealer total => ', dealerTotal, 'player total => ', playerTotal);

            if (playerTotal === dealerTotal) {
                console.log('push');            
            } else if (dealerTotal > 21 || playerTotal > dealerTotal) {
                player.win()
            } else {
                console.log('house wins');
            }
        }

        console.log(deck);
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
    }

    makeBet(amount) {
        this.cash -= amount;
        this.bet += amount;

        console.log('bet placed');
    }

    stand() {
        console.log('waiting');
    }

    win() {
        let originalBet = this.bet
        this.cash += originalBet * 1.5;
        this.bet = 0;
        this.makeBet(originalBet);
        this.hand = [];
        console.log('after win => ', 'cash = ' + this.cash, 'bet = ' + this.bet);        
    }

    bust() {
        let originalBet = this.bet;
        this.bet = 0;
        this.makeBet(originalBet);
        this.hand = []

        console.log('after loss =>', 'cash = ' + this.cash, 'bet = ' + this.bet);
    }
}

let deck = new Deck()
deck.build()
let dealer = new Dealer()
let player = new Player()