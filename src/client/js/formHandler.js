import fetch from "node-fetch";

function handleSubmit(event) {
    event.preventDefault()

    let enteredUrl = document.getElementById('url').value

    if(Client.URLChecker(enteredUrl)) {
    postData('http://localhost:8080/check', {url: enteredUrl})

    .then(function(res) {
        document.getElementById('results').innerHTML = JSON.stringify(res);
        console.log(JSON.stringify(res),res);
    })
    } else {
        alert('please enter a valid URL');
    }
}

const postData = async (url = "", data = {}) => {
    console.log("ALERT!");
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const res = await response.json();
        return res;
    } catch (error) {
        console.log('error: ', error);
    }
};

export { handleSubmit }
