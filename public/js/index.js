const commentField = $('#commentField');
const trackField = $('#trackField');
const charCount = $('#charCount');
const form = $('#postForm');
const submitButton = $('#submitBtn');
const audioButtons = $('.audio-control-btn');
let currentAudio = null;


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
                <option value="${result.id}">Album: <img src="${result.album.images[0].url}"> ${result.album.name}</option>
                `)
            });
        }, 1 * 1000);
    }
});

commentField.on('input', function () {
    const commentValue = commentField.val();
    const commentLength = commentValue.length;

    charCount.text(commentLength);

    // Disable the submit button if character count exceeds 500
    if (commentLength > 100) {
        charCount.css('color', 'red');
        submitButton.prop('disabled', true);
    } else {
        charCount.css('color', 'black');
        submitButton.prop('disabled', false);
    }
});

form.on('submit', function (event) {
    const commentLength = commentField.val().length;
    if (commentLength > 100) {
        event.preventDefault(); // Prevent form submission
    }
});

audioButtons.on('click', function() {
    const audioUrl = $(this).data('audio');

    if (currentAudio && !currentAudio.paused) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
      $(this).html('<i class="fa-solid fa-play" style="color: #71d26a;"></i>');
    } else {
      if (currentAudio) {
        currentAudio.play();
      } else {
        currentAudio = new Audio(audioUrl);
        currentAudio.volume = .05;
        currentAudio.play();
        currentAudio.onended = function() {
          $(this).html('<i class="fa-solid fa-play" style="color: #71d26a;"></i>');
        };
      }
      $(this).html('<i class="fa-solid fa-stop" style="color: #71d26a;"></i>');
    }
  });


 