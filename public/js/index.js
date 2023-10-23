$(document).ready(function() {
    const inputField = $('#inputField');
    const charCount = $('#charCount');
    const form = $('#postForm');
    const submitButton = $('#submitBtn');

    inputField.on('input', function() {
        const inputValue = inputField.val();
        const inputLength = inputValue.length;
        
        charCount.text(inputLength);

        // Disable the submit button if character count exceeds 500
        if (inputLength > 500) {
            charCount.css('color', 'red');
            submitButton.prop('disabled', true);
        } else {
            charCount.css('color', 'black');
            submitButton.prop('disabled', false);
        }
    });

    form.on('submit', function(event) {
        const inputLength = inputField.val().length;
        if (inputLength > 500) {
            event.preventDefault(); // Prevent form submission
        }
    });
});
