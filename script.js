

const game ={
    currentSentence: [],
    currentSentenceLetters: null,
    attempts: 5,
    elemSentence: document.querySelector(".game-sentence"),
    elemAttempts: document.querySelector(".game-attempts"),
    elemLetters: document.querySelector(".game-letters"),
    sentences: [
        "telewizor",
        "laptop",
        "iphone",
        "Myszka",
        "Super bohaterowie",
        "Super kot",
        "Przyjaciel",
        "JavaScript",
        "Terminator",
        "Superman",
        "Herkules",
        "rambo",
        "Spiderman",
        "Kapitan Ameryka"
    ],

    generateLettersButtons(){
        const alpha = ["a","ą","b","c","ć","d","e","ę","f","g","h","i","j","k","l","ł","m","n","ń","o","ó","p","q","r","s","ś","t","u","v","w","x","y","z","ź","ż"];

        alpha.forEach(letter => {
            const button = document.createElement("button");
            button.classList.add("game-letter");
            button.type = "button";
            button.dataset.letter = letter;
            button.innerText = letter;
            this.elemLetters.appendChild(button);
            

        });
    },

    showAttepmts : function(){
        this.elemAttempts.innerHTML = this.attempts;

    },

    enableLetters : function(){
        const letters = this.elemLetters.querySelectorAll(".game-letter");
        letters.forEach(el => el.disabled = false);

    },

    disableLetters : function(){
        const letters = this.elemLetters.querySelectorAll(".game-letter");
        letters.forEach(el => el.disabled = true);
    },

    gameOver : function(){
        alert("Nie udało się odgadnąć hasła. jest nim: \n\n" + this.currentSentence);
        this.disableLetters();
    },
    gameComplete : function(){
        alert("Udało się odgadnąć hasło");
        this.disableLetters();

    },
    checkLettersInSentence(letter){
        if(this.currentSentence.includes(letter)){
           const lettersBox = this.elemSentence.querySelectorAll(".game-sentence-box");

            for(let i = 0; i<this.currentSentence.length; i++){
                if(this.currentSentence[i] === letter){
                    lettersBox[i].innerText = letter;
                    
                }
            }

            this.currentSentenceLetters = this.currentSentenceLetters.replace(new RegExp(letter, "g"), "");

            if(!this.isLetterExists()){
                this.gameComplete();
            }

        } else {
            this.attempts--;
            this.showAttepmts();

            if(this.attempts <= 0){
                this.gameOver();
            }
        }
    },


    isLetterExists(){
        return this.currentSentenceLetters.length;
    },

    randomSentence(){
        const max = this.sentences.length-1;
        const min = 0;
        const rnd = Math.floor(Math.random()*(max-min+1)+min);

        this.currentSentence = this.sentences[rnd].toUpperCase();
        this.currentSentenceLetters = this.currentSentence.replace(/ /g,"");

        this.elemSentence.innerHTML = "";

        const letters = this.currentSentence.split("");
        letters.forEach(letter => {
            const div = document.createElement("div");
            div.classList.add("game-sentence-box");
            if(letter === " "){
                div.classList.add("game-sentence-box-space");
            }
            this.elemSentence.appendChild(div);
        })

    },
    

    

    bindEvents(){
        this.elemLetters.addEventListener("click", e => {
            if(e.target.nodeName.toUpperCase() === "BUTTON" && e.target.classList.contains("game-letter")){
                const letter = e.target.dataset.letter;
                this.checkLettersInSentence(letter.toUpperCase());
                e.target.disabled = true;
            }

        });
    },


    
    

    startGame(){
        this.attempts = 5;
        this.randomSentence();
        this.showAttepmts();
        this.enableLetters();

    },



    initBorad(){
        this.generateLettersButtons();
        this.bindEvents();
        this.disableLetters();
        
    },

    

    
}

game.initBorad();

document.querySelector(".game-start").addEventListener("click", () => game.startGame());



