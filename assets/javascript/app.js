$(document).ready(function() {

    var feels = ['Happy Dance', 'So Tired', 'Yas, Kween!', 'I Can\'t Even', 'Forgot How to Person', 'Huh?', 'Angry', 'Scared', 'Forever Alone', 'Mic Drop', 'Blerg'];

    function getTheFeels() {

        var searchFeels = $(this).data('search');

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchFeels + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {

                for (var i = 0; i < response.data.length; i++) {

                    $('#GIF-area').prepend("<img src='" + response.data[i].images.fixed_height_still.url + "'" + "data-still='" + response.data[i].images.fixed_height_still.url + "'" + "data-animate='" + response.data[i].images.fixed_height.url + "'>");
                    $('#GIF-area').prepend('<p>Rating: ' + response.data[i].rating + '</p>');
                    $('img').attr("data-state", "still");
                    $('img').addClass('gif');
                }
            })
    };

    function renderButtons() {

        // Prevents repeat buttons)

        $('#button-area').empty();

        // Loops through the array of feels

        for (var i = 0; i < feels.length; i++) {

            // Then dynamicaly generates buttons for each feel in the array

            var button = $('<button>');
            button.addClass('feel'); // Adds a class 
            button.attr('data-search', feels[i]); // Adds a data-attribute
            button.text(feels[i]); // Provides the initial button text
            $('#button-area').append(button); // Adds the button to the HTML
        }
    }

    $('#addFeels').on('click', function() {

        // This line of code will grab the input from the textbox
        var feel = $('#feels-input').val().trim();

        // The feel from the textbox is then added to the feels array
        feels.push(feel);

        // Our array then runs, which handles the processing of the array
        renderButtons();

        // This allows users to hit "enter" instead of clicking on the search button and stay on the page
        return false;
    })

    $(this).on('click', '.feel', getTheFeels);

    renderButtons();

    $(this).on('click', '.gif', function() {

        var state = $(this).attr('data-state');

        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }

    });

});
