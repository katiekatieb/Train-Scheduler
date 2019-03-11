var config = {
  apiKey: "AIzaSyCGiII7OlPPc7dbQE1-GbR75fcVn6V41mM",
  authDomain: "train-63f29.firebaseapp.com",
  databaseURL: "https://train-63f29.firebaseio.com",
  projectId: "train-63f29",
  storageBucket: "train-63f29.appspot.com",
  messagingSenderId: "507470677278"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();


  var name = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency-input").val().trim();

  var newTrain = {
    name: name,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  database.ref().push(newTrain);

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;
  var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
  var minAway = frequency - remainder;
  var nextTrain = moment().add(minAway, "m").format("hh:mm A");

  console.log(name);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);
  console.log(nextTrain);
  console.log(minAway);

  var newRow = $("<tr>").append(
    $("<td>").text(name),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(minAway)
  );

  $("#train-table > tbody").append(newRow);
});
