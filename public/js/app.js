const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#massage-1')
const messageTwo = document.querySelector('#massage-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageTwo.textContent = '';
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = '';
                messageTwo.textContent = data.forecast;
            }
        })
    })
})