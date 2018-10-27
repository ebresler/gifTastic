console.log("sanity check");
$(document).ready(function () {

    // Super hero gif array
    var superHeroes = ["Spider-Man", "The Incredible Hulk", "Thor", "Iron Man", "Captain America", "Ant Man", "Hawkeye"];

    // Add buttons for superheroes array
    function addButtons() {
        $("#gif-buttons").empty();
        for (i = 0; i < superHeroes.length; i++) {
            $("#gif-buttons").append("<button class='btn btn-danger' data-superHero='" + superHeroes[i] + "'>" + superHeroes[i] + "</button>");
        }
    }
    addButtons();

    // Adding button for super hero entered
    $("#add-superHero").on("click", function () {
        event.preventDefault();
        var newSuperHero = $("#superHero-input").val().trim();
        superHeroes.push(newSuperHero);
        addButtons();

    });

    // Pulling gifs from API - adding to HTML when buttons clicked
    $(document).on("click", "button", function () {
        var superHero = $(this).attr("data-superHero");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + superHero + "&api_key=TvW0nXcnntyLfwMRKGNgSNcm9szSP5sy"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;
            $("#superHeroes").empty();
            for (var i = 0; i < 10; i++) {
                var div = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var superHeroImg = $("<img>");
                superHeroImg.attr("src", results[i].images.original_still.url);
                superHeroImg.attr("data-still", results[i].images.original_still.url);
                superHeroImg.attr("data-animate", results[i].images.original.url);
                superHeroImg.attr("data-state", "still");
                superHeroImg.attr("class", "gif");
                div.append(p);
                div.append(superHeroImg);
                $("#superHeroes").append(div);
            }
        });
    });

    // Making Gifs animate when clicked
    function changeState() {
        var state = $(this).attr("data-state");
        var animate = $(this).attr("data-animate");
        var still = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
        }

        else if (state == "animate") {
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
        }
    }

    $(document).on("click", ".gif", changeState);
});