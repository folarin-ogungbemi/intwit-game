fetch('assets/data/data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })