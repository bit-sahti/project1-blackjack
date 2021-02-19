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

let deck = new Deck()
deck.build()
