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
                        <ul class="list-items">
                            <li><span>A.</span> ${item.a}</li>
                            <li><span>B.</span> ${item.b}</li>
                            <li><span>C.</span> ${item.c}</li>
                            <li><span>D.</span> ${item.d}</li>
                        </ul>`;
                        mainContent.appendChild(divElement);
                });
            })
            .catch(error => {console.log("Error fetching data!: ", error)});
            }
        })