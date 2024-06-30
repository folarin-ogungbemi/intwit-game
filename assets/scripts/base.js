fetch('assets/data/data.json')
    .then(response => {
        if (!response.ok){
            throw new Error('Network issues')
        }
        else {
            response.json()
            .then(data => {
                const mainContent = document.getElementsByTagName('main')[0];
                data.map(
                    (item, index) => {
                        const divElement = document.createElement('div');
                        
                        divElement.innerHTML = `
                        <p><span>${index+1}.</span> ${item.question}</p>
                        <ul class="list-items" id="${item.id}">
                            <li id="${item.id}a"><span>A.</span> ${item.a}</li>
                            <li id="${item.id}b"><span>B.</span> ${item.b}</li>
                            <li id="${item.id}c"><span>C.</span> ${item.c}</li>
                            <li id="${item.id}d"><span>D.</span> ${item.d}</li>
                        </ul>`;
                        mainContent.appendChild(divElement);

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
                        lis_array.forEach(function(elem) {
                           elem.addEventListener('click', function(e) {
                                if (elem.dataset.show === 'true'){
                                    console.log(elem);
                                }
                            
                           }) 
                        });
                });
            })
            .catch(error => {console.log("Error fetching data!: ", error)});
            }
        })

const handleSelectEvent = () => {
    
}