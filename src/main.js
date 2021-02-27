class Deck {
    constructor() {
        this.suits = ['clubs', 'diamonds', 'hearts', 'spades'];
        this.suitSymbols = ['&clubs;', '&diams;', '&hearts;', '&spades;'];
        this.cards = [];
    }

    addSingles(){
        this.suits.forEach((suitName, suitIndex) => {
            for (let i = 2; i < 11; i++) {
                this.cards.push({
                    value: i,
                    suit: suitName,
                    suitSymbol: this.suitSymbols[suitIndex]
                })
            }
        })
    }

    addTens() {
        const names = ['J', 'Q', 'K']

        this.suits.forEach((suitName, suitIndex) => {
            for (let i = 0; i < 3; i++) {
                this.cards.push({
                    name: names[i],
                    value: 10,
                    suit: suitName,
                    suitSymbol: this.suitSymbols[suitIndex]
                })
            }
        })
    }

    addAces() {
        this.suits.forEach((suitName, suitIndex) => {
            this.cards.push({
                name: 'A',
                minValue: 1,
                maxValue: 11,
                suit: suitName,
                suitSymbol: this.suitSymbols[suitIndex]
            })
        })
    }

    build(num) {
        for (let i = 0; i < num; i++) {
            this.addAces(),
            this.addSingles(),
            this.addTens()
        }
    }
}



class Dealer {
    constructor() {
        this.type = 'dealer';
        this.hand = [];
    }
    
    
    hit(deck, player) {        
        let random = Math.floor(Math.random() * deck.cards.length);

        console.log('starting');
        
        player.hand.push(deck.cards[random])
        cassino.handCard(deck.cards[random], player)
        deck.cards.splice(random, 1)
        
        console.log('hit');

        if (player.type === 'player') cassino.displayTotal(player, this.countPoints(player))


        if (player.type === 'player' && this.countPoints(player) >= 21) {
            this.resolve(deck, player)
            console.log('early resolve');
        }
    }
    
    getSecretCard() {
        this.secretCard = this.hand[1];
        cassino.hideCard()
        console.log('secret called');
    }
    
    countPoints(player) {
        let aces = player.hand.filter(card => card.name === 'A')
        let others = player.hand.filter(card => card.value)
        
        let total = others.reduce((acc, card) => acc += card.value, 0)
        
        
        aces.forEach(ace => {
            if (total < 11) {
                total += ace.maxValue;
            } else {
                total += ace.minValue;
            }
        })
        
        return total;
        
    }
    
    consecutiveHits(deck) {
        while (this.countPoints(this) < 17) {
            this.hit(deck, this);
            cassino.displayTotal(dealer, this.countPoints(this))
        }
        
        return this.countPoints(this);
    }
    
    resolve(deck, player) {
        cassino.revealCard();
        const playerTotal = this.countPoints(player);
        
        if (playerTotal === 21) {
            this.countPoints(this) === 21 ? player.push() : player.blackjack();
        } else if (playerTotal > 21) {
            player.bust();
        } else {
            const dealerTotal = this.countPoints(this) < 17 ? this.consecutiveHits(deck) : this.countPoints(this);
            
            // console.log('inside resolve ====> ', 'dealer total => ', dealerTotal, 'player total => ', playerTotal);
            
            if (playerTotal === dealerTotal) {
                player.push();            
            } else if (dealerTotal > 21 || playerTotal > dealerTotal) {
                player.win()
            } else if (playerTotal < dealerTotal) {
                player.lose();
            }

        }
        console.log(player.cash, player.bet);
        
        // console.log(deck);
    }

    deal(deck, players) {
        this.prepareTable(players)
        
        players.forEach(player => {
            this.hit(deck, player);            
        })
        console.log('deal');
    
        players.forEach(player => {
            this.hit(deck, player);
            if (player.type === 'dealer') player.getSecretCard()
        })
        
        console.log('ready to go');
    }

    prepareTable(players) {
        cassino.discartCards(players)
        cassino.hideTotal()

        players.forEach(player => {
            if (player.type === 'player' && player.cash + player.bet < 1) {
                cassino.restart()
                return
            } else if (player.type === 'player') {
                cassino.generateChips(player.getExtraChips())
            }

            player.hand = []
            player.canBet = true;            
        })
        

        

        // cassino.listen()

        // console.log(players[1], players[0].cash);
    }

    restore() {
        this.hand = [];
        // this.secretCard = ;
    }

    start(deck, num, players) {
        deck.cards = [];
        deck.build(num);
        
        players.forEach (player => player.restore())
        dealer.prepareTable([player, dealer])
    }
}

class Player {
    constructor() {
        this.type = 'player';
        this.cash = 5000;
        this.chipsValues = [25, 50, 100, 250, 500, 1000, 5000, 10000, 100000]
        this.bet = 0;
        this.canBet = true;
    }

    getExtraChips() {
        let extraChips = this.chipsValues.filter(value => {
            return this.cash / value >= 1
        })
        
        return extraChips.slice(-6);
    }

    makeBet(amount) {
        if (this.cash >= amount && this.canBet) {
            this.cash -= amount;
            cassino.updateCash(this.cash)
            this.bet += amount;
        } else if (this.cash < amount) {
          this.clearBet();
        } else {
            window.alert('The bet can no longer be altered.')
        }
      
        cassino.updateBet();
    }

    double(deck, dealer) {
        if (this.cash >= this.bet * 2) {
          this.makeBet(this.bet);
          dealer.hit(deck, player);
          dealer.resolve(deck, this)
        }
    }

    clearBet() {
        this.cash += this.bet
        this.bet = 0;
        cassino.generateChips(this.getExtraChips())
        cassino.updateBet();
        cassino.updateCash(this.cash)
    }

    blackjack() {
        // console.log('before blackjack =>', this.cash);
        this.cash += this.bet * 1.5;
        cassino.playerBlackjack();
        // cassino.revealCard()
        this.bet = 0;
        // console.log('after blackjack =>', this.cash);
    }

    win() {
        // console.log('before win =>', this.cash);
        this.cash += this.bet;
        cassino.playerWin();
        // this.bet = 0;
        // console.log('after win =>', this.cash);      
    }

    loseMoney() {
        // let originalBet = this.bet;
        this.bet = 0;
        // this.makeBet(originalBet);
    }

    bust() {
        this.loseMoney();
        cassino.playerBust();
    }

    lose() {
        this.loseMoney();
        cassino.playerLose();
    }

    push() {
        cassino.push()
    }

    restore() {
        this.hand = [];
        this.cash = 5000;
        this.bet = 0;

        cassino.updateCash(this.cash)
        cassino.updateBet()
    }
}

//Prepare to run game
const deck = new Deck()
deck.build(2)

// console.log(deck);

const dealer = new Dealer()
const player = new Player()