/* *************************
 *** POST JOURNAL ***
************************** */
function postJournal() {
    //  console.log('postJournal Function Called')
    let title = document.getElementById('title').value //setting up variables that reference our input fields in the DOM
    let date = document.getElementById('date').value
    let entry = document.getElementById('entry').value
    const accessToken = localStorage.getItem('SessionToken') //set up to store the SessionToken in local storage
    let newEntry = { journal: { title: title, date: date, entry: entry } } //variable to store the information for the body of the request

    fetch('http://localhost:3000/journal/create', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': accessToken //token required to access this protected route
        }),
        body: JSON.stringify(newEntry)
    })
        .then(response => {
            console.log(response.json())
            displayMine()
        })
        .catch((err) => {
            console.log(err)
        })
}
    
    
    /* *************************
     *** UPDATE JOURNAL ***
    ************************** */
function editJournal(postId) { 
    console.log(postId)
    const fetch_url =  `http://localhost:3000/journal/update/${postId}` //storing the URL that we will use in the fetch as well as the Session Token
    const accessToken = localStorage.getItem('SessionToken')

    let card = document.getElementById(postId)
    let input = document.createElement('input')

    if (card.childNodes.length < 2) {
        card.appendChild(input)
        input.setAttribute('type', 'text')
        input.setAttribute('id', 'updatedEntry')
        input.setAttribute('placeholder', 'Edit your journal entry')
    } else {
        let updated = document.getElementById('updatedEntry').value //store the value of the updateEntry input in the variable updated
        let updateEntry = { journal: {entry: updated } }; //store the updatedEntry information
        const response = fetch(fetch_url, { //starting out the fetch method for the update endpoint, reaching out to the journal/update/ endpoint that was stored in the fetch_url varialbe using the postId passed as a parameter in this function to access a specific journal entry
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
            body: JSON.stringify(updateEntry)
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
            displayMine();
        })

        card.removeChild(card.lastChild) //removing the input from the card so that it is no longer displayed once it is updated
    }
}
    
    
    
    /* *************************
     *** DELETE JOURNAL ***
    ************************** */
function deleteJournal(postId) {
    console.log('deleteJournal working')
    console.log(postId)

    const fetch_url = `http://localhost:3000/journal/delete/${postId}` //postId is appended to the fetch url so it will refer to a specific journal entry in the database
    const accessToken = localStorage.getItem('SessionToken') //using a token because this is a protected route

    fetch(fetch_url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
    .then(response => {
        console.log(response);
        displayMine() //calls the displaymine function again so you can see the remaining posts after you have deleted the post of your choice
    })
}