console.log('script loaded')

const 	numberInput = document.getElementById('number'),
		textInput = document.getElementById('msg'),
		button = document.getElementById('button'),
		response = document.querySelector('.response')

button.addEventListener('click', send, false)


const socket = io() // io is sourced from the script linked in the static html

socket.on('smsStatus', (data) => {
	response.innerHTML = '<h5>Text message sent to: ' + data.number + '</h5>'

} )

function send() {
	const number = numberInput.value.replace(/\D/g, '')
	const text = textInput.value

	fetch('/', {
		method: 'post',
		headers: {
			'Content-type' : 'application/json'
		},
		body : JSON.stringify({ number: number, text: text })
	})
	.then( (res) => console.log(res) )
	.catch( (err) => console.log(err) )
}