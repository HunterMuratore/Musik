const commentField = $('#commentField');
const trackField = $('#trackField');
const charCount = $('#charCount');
const form = $('#postForm');
const submitButton = $('#submitBtn');

async function getSongs(value) {
    const results = await fetch('/song/' + value).then(res => res.json());

    return results;
}

trackField.on('input', function () {
    const trackValue = trackField.val();
    clearTimeout(window.buffer);

    if (trackValue.length > 1) {
        window.buffer = setTimeout(async () => {
            const results = await getSongs(trackValue);
            const resultOutput = $('.results');
            resultOutput.empty();

            results.forEach(result => {
                resultOutput.append(`
                <option value="${result.id}">Album: <img src="${result.album.images[0].url}" class="w-10 h-10"> ${result.album.name}</option>
                `)
            });
        }, 2 * 1000);
    }
});

commentField.on('input', function () {
    const commentValue = commentField.val();
    const commentLength = commentValue.length;

    charCount.text(commentLength);

    // Disable the submit button if character count exceeds 500
    if (commentLength > 500) {
        charCount.css('color', 'red');
        submitButton.prop('disabled', true);
    } else {
        charCount.css('color', 'black');
        submitButton.prop('disabled', false);
    }
});

form.on('submit', function (event) {
    const commentLength = commentField.val().length;
    if (commentLength > 500) {
        event.preventDefault(); // Prevent form submission
    }
});
