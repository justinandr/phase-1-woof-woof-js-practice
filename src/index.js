addEventListener('DOMContentLoaded', () => {

    document.getElementById('good-dog-filter').addEventListener('click', filterGoodDogs)
    
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => {
        container = document.getElementById('dog-bar')
        data.forEach(element => {
            const span = document.createElement('span')
            span.textContent = element.name
            span.addEventListener('click', renderPup)
            container.appendChild(span)
        })
    })

})

function renderPup(e){
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('dog-info')
        container.innerHTML = ''
        data.forEach(element => {
            if (element.name === e.target.innerText){
                const img = document.createElement('img')
                const h2 = document.createElement('h2')
                const button = document.createElement('button')

                img.src = element.image
                h2.textContent = element.name
                if (element.isGoodDog === true){
                    button.textContent = 'Good Dog!'
                }
                else {
                    button.textContent = 'Bad Dog!'
                }
                button.addEventListener('click', toggleGoodDog)
                button.id = element.id

                container.appendChild(img)
                container.appendChild(h2)
                container.appendChild(button)
            }
        })
    })
}

function toggleGoodDog(e){
    e.preventDefault()
    console.log(e)
    if (e.target.innerText === 'Good Dog!'){
        e.target.innerText = 'Bad Dog!'
        fetch(`http://localhost:3000/pups/${e.target.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({isGoodDog: false})
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
    else {
        e.target.innerText = 'Good Dog!'
        fetch(`http://localhost:3000/pups/${e.target.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({isGoodDog: true})
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
}

function filterGoodDogs(e){
    e.preventDefault()
    document.getElementById('dog-bar').innerHTML = ''
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => {
        
        if (e.target.textContent === 'Filter good dogs: OFF'){
            e.target.textContent = 'Filter good dogs: ON'
            data.forEach(element => {
                if (element.isGoodDog === true){
                    const span = document.createElement('span')
                    span.textContent = element.name
                    span.addEventListener('click', renderPup)
                    document.getElementById('dog-bar').appendChild(span)
                }
            })
        }
        else {
            e.target.textContent = 'Filter good dogs: OFF'
            data.forEach(element => {
                const span = document.createElement('span')
                span.textContent = element.name
                span.addEventListener('click', renderPup)
                document.getElementById('dog-bar').appendChild(span)
            })
        }
    })
}