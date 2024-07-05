
BASE_URL = 'assets/data/data.json'
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok){
            throw new Error('Network: Ein Fehler is aufgetreten.')
        }
        else{
            const data = await response.json()
            return data;
        }
    } catch (error){
        console.log("Error fetching data!")
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    // The main cointainer
    const mainContent = document.getElementsByTagName('main')[0];
    // Fetching data from API
    fetchData(BASE_URL)
        .then(data => {
            data.map(
                (item, index) => {
                    const divElement = document.createElement('div');
                    
                    divElement.innerHTML = `
                    <div id="${item.id}" class="slide element gap-5">
                        <p>${item.question}</p>
                        <ul class="list-items">
                            <li data-answer="false" id="${item.id}a"><span>A</span> ${item.a}</li>
                            <li data-answer="false" id="${item.id}b"><span>B</span> ${item.b}</li>
                            <li data-answer="false" id="${item.id}c"><span>C</span> ${item.c}</li>
                            <li data-answer="false" id="${item.id}d"><span>D</span> ${item.d}</li>
                        </ul>
                    </div>`;
                    mainContent.appendChild(divElement);

                    // Identify the option with the right answer and set the data attribute
                    const itemKeys = Object.keys(item)
                    itemKeys.forEach(element => {
                        if (element === item.answer){
                            const liEl = document.getElementById(`${item.id}${element}`);
                            liEl.setAttribute('data-answer', 'true');
                        }
                    });
            });

            class QuestionBank {
                allQuestions = Array.from(document.getElementsByClassName('slide'));
                userScore = document.getElementById('score');
                
                constructor(start=false, score=0, currentIndex=0, currentQuestion=[]) {
                    this.start = start;
                    this.score = score;
                    this.currentIndex = currentIndex;
                    this.currentQuestion = currentQuestion;
                }

                incrementScore(){
                    this.score += 5;
                }

                question(next) {
                    const totalQuestions = this.allQuestions.length;
                    if (next) {
                        this.allQuestions[this.currentIndex].setAttribute('data-active', 'false');
                        this.currentIndex = (this.currentIndex + 1) % totalQuestions;
                        game.currentQuestion = game.allQuestions[this.currentIndex];
                        game.currentQuestion.setAttribute('data-active', 'true');
                        this.userChoice()
                    }else{
                        game.currentQuestion = game.allQuestions[this.currentIndex];
                        game.currentQuestion.setAttribute('data-active', 'true');
                    }
                    return game.currentQuestion;
                }

                userChoice(){
                    const gameElementsArray = Array.from(game.currentQuestion.querySelectorAll('li'))
                    gameElementsArray.forEach(function(element) {
                        element.addEventListener('click', function(e) {
                            if (element.dataset.answer === 'true'){
                                element.style.border = "1px solid green";
                                element.style.backgroundColor = "green";
                                element.style.color = "#fff";
                                game.incrementScore();
                                game.userScore.innerText = game.score;
                                setTimeout(() => {
                                    game.question(true)
                                }, 2000);
                            }
                            if (element.dataset.answer === 'false'){
                                element.style.border = "1px solid red";
                                element.style.backgroundColor = "red";
                                element.style.color = "#fff";
                            }
                        }) 
                    });
                }
                startgame() {
                    this.start = true
                    this.question();
                    this.userChoice()
                    game.userScore.innerText = game.score;
                }

            }
            const game = new QuestionBank();
            game.startgame()
                }).catch(error => {
            console.log('Error Occured: ', error)
    })
});

// shuffleArray(array) {
// for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
// }