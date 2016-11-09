$(document).ready(function() {

    var feels = ['Happy Dance', 'So Tired', 'Yas, Kween!', 'I Can\'t Even', 'Forgot How to Person',
        'Huh?', 'Mad', 'Scared', 'Forever Alone', 'Mic Drop', 'Welp', 'Shy', 'Proud', 'Need Lasagna', 'Curious', 'Jealous', 'Schadenfreude'
    ];

    // --------------------------------------------Main Process--------------------------------------

    renderButtons();

    $(this).on('click', '.feel', getTheFeels);

    $('#addFeels').on('click', addNewFeels);

    $(this).on('click', '.gif', stateToggle);

    // -----------------------------------------------Functions--------------------------------------

    function renderButtons() {

        // Prevents repeat buttons)

        $('#button-area').empty();

        // Loops through the array of feels

        for (var i = 0; i < feels.length; i++) {

            // Then dynamically generates buttons for each feel in the array

            var button = $('<button class="btn btn-info">');
            button.addClass('feel'); // Adds a class 
            button.attr('data-search', feels[i]); // Adds a data-attribute
            button.text(feels[i]); // Provides the initial button text
            $('#button-area').append(button); // Adds the button to the HTML
        }
    }

    function getTheFeels() {

        var searchFeels = $(this).data('search');

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchFeels + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg-13";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {

                for (var i = 0; i < response.data.length; i++) {
                    $('#GIF-area').prepend('<div id="img' + i + '">' + "<img src='" + response.data[i].images.fixed_height_still.url + "'" + "data-still='" + response.data[i].images.fixed_height_still.url + "'" + "data-animate='" + response.data[i].images.fixed_height.url + "'>");
                    $('#img' + i).append('<h5>Rating: ' + response.data[i].rating + '</h5>')
                        .addClass('img-thumbnail');
                    $('img').addClass('gif');
                    $('img').attr("data-state", "still");

                }
            })
    };

    function addNewFeels() {
        // This line of code will grab the input from the textbox
        var feel = $('#feels-input').val().trim();

        // The feel from the textbox is then added to the feels array
        feels.push(feel);

        // Our array then runs, which handles the processing of the array
        renderButtons();

        // This allows users to hit "enter" instead of clicking on the search button and stay on the page
        return false;
    }

    function stateToggle() {

        var state = $(this).attr('data-state');

        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    }
});
