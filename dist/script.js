document.querySelector('#submit').addEventListener('click', function(event){
    event.preventDefault()

    const receiver = document.querySelector('#receiver')
    const message = document.querySelector('#message')

    axios.post('/api', {
        receiver: receiver.value,
        message: message.value
    }).then( function(response) {
        receiver.value = ''        
        message.value = ''        
    })
}, false)