
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

class QuestionBank {
    constructor(score=0) {
        this.score = score;
    }

    incrementScore(score){
        this.score += score;
    }

    startgame(amount) {
        
    }
    endgame(amount) {
        
    }
}

fetchData(BASE_URL)
    .then(data => {
        const mainContent = document.getElementsByTagName('main')[0];
        data.map(
            (item, index) => {
                const divElement = document.createElement('div');
                
                divElement.innerHTML = `
                <div id="${item.id}" class="slide">
                    <p><span>${index+1}.</span> ${item.question}</p>
                    <ul class="list-items">
                        <li id="${item.id}a"><span>A.</span> ${item.a}</li>
                        <li id="${item.id}b"><span>B.</span> ${item.b}</li>
                        <li id="${item.id}c"><span>C.</span> ${item.c}</li>
                        <li id="${item.id}d"><span>D.</span> ${item.d}</li>
                    </ul>
                </div>`;
                mainContent.appendChild(divElement);

                // Identify the option with the right answer and set an attribute to show
                const itemKeys = Object.keys(item)
                itemKeys.forEach(element => {
                    if (element === item.answer){
                        const liEl = document.getElementById(`${item.id}${element}`);
                        liEl.setAttribute('data-show', 'true');
                    }
                });

                const ulElements = divElement.querySelectorAll('ul');
                let lis_array = []
                ulElements.forEach(ul => 
                    {
                        const lis = Array.from(ul.querySelectorAll('li'))
                        lis_array = lis_array.concat(lis);
                    });
                // Compare user event with the right answer.
                lis_array.forEach(function(elem) {
                   elem.addEventListener('click', function(e) {
                        if (elem.dataset.show === 'true'){
                            alert(`Richtig! \n${elem.innerText}`);
                        }
                        else{
                            alert('Wrong!');
                        }
                   }) 
                });

                // 
                // allSlides = divElement.getElementsByClassName('slide').item(0);
                // allSlides.setAttribute('data-active', 'true');
                // allSlides.setAttribute('data-active', 'true');
                // console.log(allSlides);
        });
            }).catch(error => {
        console.log('Error Occured: ', error)
    })