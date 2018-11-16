// Initialize Firebase
var config = {
    apiKey: "AIzaSyA6Z2VNP93ZZS1fUX6WQvQ8eQZn4l3q2Gg",
    authDomain: "trainschedule-dda4f.firebaseapp.com",
    databaseURL: "https://trainschedule-dda4f.firebaseio.com",
    projectId: "trainschedule-dda4f",
    storageBucket: "",
    messagingSenderId: "847540890855"
};
firebase.initializeApp(config);

var database = firebase.database();


var nextArrival = "";
var minutesAway = "";

$('#submit').on('click', function(event) {
    //Prevent the page from refreshing
    event.preventDefault();

    //Get inputs
    trainName = $('#trainNameInput').val().trim();
    destination = $('#destinationInput').val().trim();
    firstTrain = $('#trainTimeInput').val().trim();
    frequency = $('#frequencyInput').val().trim();

    var train = {
        'name': trainName,
        'destination': destination,
        'first train': firstTrain,
        'frequency': frequency,
    }
    console.log(train);

    // Change what is saved in firebase
    database.ref().push(train);

    // Clear input fields
    $('#form')[0].reset();
});

database.ref().on('child_added', function(snapshot){
    var name = snapshot.val().name
    var destination = snapshot.val().destination
    var frequency = snapshot.val().frequency
    var time = moment(snapshot.val().firstTrain, 'HH:mm').format('hh:mm a')
    var table = $('#timetable')

    

    
    var $newTrain = $('<tr>')

    $newTrain.html('<td>' + name + '</td><td>' + destination + '</td><td>' + frequency + '</td><td>' + "" + '</td><td>' + "" + '</td>')

    table.append($newTrain)
})