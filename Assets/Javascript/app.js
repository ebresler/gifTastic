$(document).ready(function () {

// Starting gif array
var superHeroes = ["Spider-Man", "The Incredible Hulk", "Thor", "Iron Man", "Captain America", 
"Black Panther", "Ant Man", "Hawkeye"];

// Add buttons for original superheroes array
function addButtons() {
    $("#gif-buttons").empty();
    for (i = 0; i < superHeroes.length; i++) {
        $("#gif-buttons").append("<button class='btn btn-danger' data-superHero='" + superHeroes[i] + "'>" + superHeroes[i] + "</button>");
    }
}
addButtons();

// Adding button for super hero entered
$("submit").on("click", function () {
    event.preventDefault();
    var superHero = $("#superHero-input").val().trim();
    superHeroes.push(superHero);
    renderButtons();
    return;
});

// Pulling gifs from API and adding to HTML buttons  
$("button").on("click", function () {
    var superHero = $(this).attr("data-superHero");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        superHero + "&api_key=TvW0nXcnntyLfwMRKGNgSNcm9szSP5sy"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        var results = response.data;
        $("#superHeroes").empty();
        for (var i = 0; i < results.length; i++) {
            var superHeroDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var superHeroImg = $("<img>");
            superHeroImg.attr("src", results[i].images.original_still.url);
            superHeroImg.attr("data-still", results[i].images.original_still.url);
            superHeroImg.attr("data-animate", results[i].images.original.url);
            superHeroImg.attr("data-state", "still");
            superHeroImg.attr("class", "gif");
            superHeroDiv.append(p);
            superHeroDiv.append(superHeroImg);
            $("#superHeroes").append(superHeroDiv);
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