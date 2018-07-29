class Game {
    constructor(cards, shirt, difficulty) {
        if (difficulty === "hight") {
            this.rows = 3;
            this.columns = 8;
        } else if (difficulty === "medium") {
            this.rows = 3;
            this.columns = 6;
        } else {
            this.rows = 2;
            this.columns = 5;
        }
        this.cards = cards;
        this.shirt = shirt || "plane";
        this.difficulty = difficulty;
        this.deck = this.createDeck(this.cards);
        this.pause = false;
    }

    flip(card) {
        if (card.classList.contains("hover") || this.pause) {
            return false;
        } else {
            card.classList.add("hover");
            return true;
        }
    }

    compareCards() {
        let arr = [];
        let f = id => {
            arr.push(id);
            if (arr.length !== 2) {
                return f;
            } else {
                let result = arr[0] === arr[1];
                arr = [];
                return result;
            }
        };

        return f;
    }

    createDeck(cards) {
        let needCards = parseInt(this.rows * this.columns / 2);

        let deckArray = this.cards.splice(0, needCards);
        deckArray = deckArray.concat(deckArray);

        return Game.shuffle(deckArray);
    }

    static shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    buildTemplate(content) {
        let template = content;
        let deck = this.deck.slice();
        for (let i = 0; i < this.rows; i++) {
            let div = document.createElement("div");
            div.classList.add("card-row");
            for (let j = 0; j < this.columns; j++) {
                let currentCard = deck.pop();
                div.innerHTML += `
                <div class="flip-container" data-id="${currentCard.id}">
                    <div class="flipper">
                        <div class="front">
                            <i class="fas fa-${this.shirt} fa-4x"></i>
                        </div>
                        <div class="back">
                            <img class="card-shirt" src="${
                                currentCard.url
                            }" alt="${currentCard.title}">
                        </div>
                    </div>
                </div>
                `;
            }
            template.appendChild(div);
        }
    }
}

class Stopwatch {
    constructor() {
        this.seconds = 0;
        this.minutes = 0;
        this.timerElement = document.querySelector(".timer__time");
        this.timer = null;
    }

    get currentTime() {
        return this.timerElement.innerHTML;
    }

    updateTime(s, m, e) {
        let minutes = m < 10 ? "0" + m : m;
        let seconds = s < 10 ? "0" + s : s;
        e.textContent = minutes + " : " + seconds;
    }

    start() {
        this.timer = setInterval(() => {
            this.seconds += 1;
            if (this.seconds >= 60) {
                this.seconds = 0;
                this.minutes += 1;
            }

            this.updateTime(this.seconds, this.minutes, this.timerElement);
        }, 1000);
    }

    stop() {
        clearInterval(this.timer);
    }
}

class PageController {
    constructor() {
        this.rules = document.querySelector(".rules");
        this.game = document.querySelector(".game");
        this.table = document.querySelector(".result");
        this.trriggerClassName = "disable";
    }

    showRules() {
        this.rules.classList.remove(this.trriggerClassName);
    }

    hideRules() {
        this.rules.classList.add(this.trriggerClassName);
    }

    showGame() {
        this.game.classList.remove(this.trriggerClassName);
    }

    hideGame() {
        this.game.classList.add(this.trriggerClassName);
    }

    showTable() {
        this.table.classList.remove(this.trriggerClassName);
    }

    hideTable() {
        this.table.classList.add(this.trriggerClassName);
    }
}

class ResultTable {
    constructor() {
        this.section = document.querySelector(".result");
        this.currentResult =
            JSON.parse(localStorage.getItem("gameResult")) || [];
    }

    filter(n) {
        this.currentResult.sort((obj1, obj2) => {
            let time1 = obj1.time.split(" : ").reduce((a, b) => a * 60 + b);
            let time2 = obj2.time.split(" : ").reduce((a, b) => a * 60 + b);
            return time1 - time2;
        });

        this.currentResult.splice(n);
    }

    add(userName, userLastName, userEmail, resultTime) {
        this.currentResult.push({
            name: userName,
            lastName: userLastName,
            email: userEmail,
            time: resultTime
        });
    }

    updateResult() {
        localStorage.setItem("gameResult", JSON.stringify(this.currentResult));
    }

    reset() {
        localStorage.removeItem("gameResult");
    }

    createTable() {
        let table = document.createElement("table");
        table.classList.add("result__table");
        table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Result</th>
        </tr>
        `;

        this.currentResult.forEach(el => {
            table.innerHTML += `
            <tr>
                <td>${el.name}</td>
                <td>${el.lastName}</td>
                <td>${el.email}</td>
                <td>${el.time}</td>
            </tr>
            `;
        });

        return table;
    }
}

const cards = [
    {
        id: 1,
        title: "Moscow",
        url: "./assets/images/cards/1.png"
    },
    {
        id: 2,
        title: "Paris",
        url: "./assets/images/cards/2.png"
    },
    {
        id: 3,
        title: "China",
        url: "./assets/images/cards/3.jpg"
    },
    {
        id: 4,
        title: "Egypt",
        url: "./assets/images/cards/4.jpg"
    },
    {
        id: 5,
        title: "London",
        url: "./assets/images/cards/5.png"
    },
    {
        id: 6,
        title: "Brazil",
        url: "./assets/images/cards/6.jpg"
    },
    {
        id: 7,
        title: "Berlin",
        url: "./assets/images/cards/7.png"
    },
    {
        id: 8,
        title: "Pisa",
        url: "./assets/images/cards/8.png"
    },
    {
        id: 9,
        title: "USA",
        url: "./assets/images/cards/9.png"
    },
    {
        id: 10,
        title: "Japan",
        url: "./assets/images/cards/10.png"
    },
    {
        id: 11,
        title: "Sankt Petersburg",
        url: "./assets/images/cards/11.jpg"
    },
    {
        id: 12,
        title: "Rome",
        url: "./assets/images/cards/12.jpg"
    }
];

const shirtElements = document.querySelectorAll(".form__shirt-element");
const difficultyElements = document.querySelectorAll(".form__difficulty-element");
const newGameBtn = document.querySelector(".new-game__btn");
const resultLink = document.querySelector(".result-link");
const resultBtn = document.querySelector(".result__btn");

let shirtOption = null;
let difficultyOption = null;

let page = new PageController();
let tableResult = new ResultTable();

resultLink.addEventListener("click", () => {
    resultLink.classList.add("disable");
    page.hideRules();
    page.hideGame();
    page.showTable();
    tableResult.filter(10);
    tableResult.updateResult();
    tableResult.section.appendChild(tableResult.createTable());
});

resultBtn.addEventListener("click", () => {
    tableResult.reset();
});

shirtElements.forEach(el => {
    el.addEventListener("click", e => {
        let option = e.currentTarget;
        let selected = document.querySelector(".form__shirt-element.selected");
        if (selected !== null) selected.classList.remove("selected");
        option.classList.add("selected");
        shirtOption = option.getAttribute("data-shirt");
    });
});

difficultyElements.forEach(el => {
    el.addEventListener("click", e => {
        let option = e.currentTarget;
        let selected = document.querySelector(".form__difficulty-element.selected");
        if (selected !== null) selected.classList.remove("selected");
        option.classList.add("selected");
        difficultyOption = option.getAttribute("data-difficulty");
    });
});

newGameBtn.addEventListener("click", () => {
    let userName = document.querySelector("#first-name").value || "Player";
    let userLastName = document.querySelector("#last-name").value || "Player";
    let userEmail = document.querySelector("#email").value || "email";

    page.hideRules();
    page.showGame();

    let game = new Game(cards, shirtOption, difficultyOption);
    game.buildTemplate(page.game);

    let stopwatch = new Stopwatch();
    stopwatch.start();

    const cardsElements = document.querySelectorAll(".flip-container");
    let compare = game.compareCards();
    cardsElements.forEach(el => {
        el.addEventListener("click", e => {
            let fliped = game.flip(e.currentTarget);
            if (!fliped) return;
            let id = e.currentTarget.getAttribute("data-id");
            let result = compare(id);
            if (typeof result !== "function") {
                if (result === true) {
                    let pair = document.querySelectorAll(".flip-container.hover");
                    pair.forEach(el => {
                        el.classList.add("hide");
                    });
                    let hided = document.querySelectorAll(".hide");
                    if (hided.length === game.deck.length) {
                        stopwatch.stop();
                        let resultTime = stopwatch.currentTime;

                        const lastResultEl = document.querySelector(".result__last-result");
                        lastResultEl.textContent = `Your current result is ${resultTime}`;

                        tableResult.add(
                            userName,
                            userLastName,
                            userEmail,
                            resultTime
                        );
                        tableResult.updateResult();
                        tableResult.filter(10);

                        let table = tableResult.createTable();
                        resultLink.classList.add("disable");

                        tableResult.section.appendChild(table);

                        page.hideGame();
                        page.showTable();
                    }
                } else {
                    let pair = document.querySelectorAll(".flip-container.hover");
                    game.pause = true;
                    pair.forEach(el => {
                        setTimeout(() => {
                            el.classList.remove("hover");
                            game.pause = false;
                        }, 500);
                    });
                }
            }
        });
    });
});
