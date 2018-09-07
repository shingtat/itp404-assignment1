$(document).ready(function() {
  var search = getParameterByName("subreddit");
  $("#loading").css("display", "block");
  $.ajax({
   type: "GET",
    url: `https://www.reddit.com/r/${search}.json`,
    data: $(this).serialize(),
    success: function(response) {
      response.data.children.forEach(function(i){
        appendResult(i);
      })
    },
    error: function(data) {
      $("#post_container").text = "Error Occurred";
    },
    complete: function(data) {
      $("#loading").css("display", "none");
    }
  })
})

function appendResult(i){
  var title = i.data.title;
  var author = i.data.author;
  var score = i.data.score;

  var titleP = document.createElement("p");
  var titleNode = document.createTextNode("Title: " + title);
  titleP.appendChild(titleNode);

  var authorP = document.createElement("p");
  var authorNode = document.createTextNode("Author: " + author);
  authorP.appendChild(authorNode);

  var scoreP = document.createElement("p");
  var scoreNode = document.createTextNode("Score: " + score);
  scoreP.appendChild(scoreNode);


  var div = document.createElement("div");
  div.appendChild(titleP);
  div.appendChild(authorP);
  div.appendChild(scoreP);

  $("#post_container").append(div);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
