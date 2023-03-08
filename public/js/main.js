function onsubmit(e) {
    e.preventDefault();

    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';

    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if (prompt === '') {
        alert('Please Enter some text describing your Image');
        return;
    }
    generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {

    try {
        showSpinner();

        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                prompt,
                size
            })
        });

        if (!response.ok) {
            removeSpinner();
            throw new Error('That Image cannot be generated');
        }

        const data = await response.json();
        //console.log(data);

        const imageURL = data.data;
        document.querySelector('#image').src = imageURL;
        removeSpinner();
    }
    catch (error) {
        document.querySelector('.msg').textContent = error;
    }
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show');

}




document.querySelector('#image-form').addEventListener('submit', onsubmit);