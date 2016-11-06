$(document).ready(function() {

    var feels = ['Happy Dance', 'Yas!', 'Tired', 'Eye Roll', 'Confused', 'Angry', 'Scared'];

    function getTheFeels() {

        var searchFeels = $(this).data('search');

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchFeels + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {

                for (var i = 0; i < response.data.length; i++) {
                    $('#GIF-area').prepend('<p>Rating: ' + response.data[i].rating + '</p>');
                    $('#GIF-area').prepend("<img src='" + response.data[i].images.fixed_height_still.url + "'" + "data-still='" + response.data[i].images.fixed_height_still.url + "'" + "data-animate='" + response.data[i].images.fixed_height.url + "'>");
                    $('img').attr("data-state", "still");
                    $('img').addClass('gif');
                }
            })
    };



    function renderButtons() {

        // Deletes the feels prior to adding new movies (this is necessary otherwise you will have repeat buttons)

        $('#button-area').empty();

        // Loops through the array of movies
        for (var i = 0; i < feels.length; i++) {

            // Then dynamicaly generates buttons for each feel in the array

            // Note the jQUery syntax here... 
            var button = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
            button.addClass('feel'); // Added a class 
            button.attr('data-search', feels[i]); // Added a data-attribute
            button.text(feels[i]); // Provided the initial button text
            $('#button-area').append(button); // Added the button to the HTML
        }
    }

    $('#addFeels').on('click', function() {

        // This line of code will grab the input from the textbox
        var feel = $('#feels-input').val().trim();

        // The movie from the textbox is then added to our array
        feels.push(feel);

        // Our array then runs which handles the processing of our movie array
        renderButtons();

        // We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
        return false;
    })

    $(this).on('click', '.feel', getTheFeels);


    // ========================================================

    // This calls the renderButtons() function
    renderButtons();

    $(this).on('click', '.gif', function() {
        //STEP ONE: study the html above. Look at all the data attributes. Run the file in the browser. Look at the images. After you fill in steps 1 and 2 you'll be able to pause gifs from giphy.

        //STEP TWO: make a variable named state and then reference the button's data-state into it. Do not use .data('state'). It won't work the way we expect.

        //---------------FILL IN CODE HERE FOR STEP TWO----------------------------
        var state = $(this).attr('data-state');


        //----------------------------------------------------

        /*STEP THREE:
         * if variable state is equal to 'still' then
         * update the src attribute of this image that you clicked on to what data-animate is equal to for this image
         * and update the data-state attribute to 'animate'
         * if state does not equal 'still' then
         * update the src attribute of this image that you clicked on to what data-still is equal to for this image
         * and update the data-state attribute to 'still'
         */

        //---------------FILL IN CODE HERE FOR STEP THREE----------------------------
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
        //----------------------------------------------------

        //STEP FOUR: open the file in the browser and click on the images. Then click again to pause.
    });

});
