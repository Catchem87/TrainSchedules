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
        'firstTrain': moment(firstTrain, 'HH:mm').format('hh:mm a'),
        'firstTrainUnix': moment(firstTrain, 'HH:mm').format('x'),
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
    var frequency = parseInt(snapshot.val().frequency)
    var time = snapshot.val().firstTrain
    var unixTime = snapshot.val().firstTrainUnix
    console.log(time)
    console.log(unixTime)
    
    var firstTrainUnix = moment(unixTime, 'x')
  
    var minutesUntilTrain = firstTrainUnix.diff(moment(), 'minutes')
    if(minutesUntilTrain <= 0) {
        while(minutesUntilTrain <= 0) {
            minutesUntilTrain += frequency
            firstTrainUnix.add(frequency, 'minutes')
            time = firstTrainUnix.format('hh:mm a')
        }
    }
    console.log(minutesUntilTrain)


    var table = $('#timetable')

    
    var $newTrain = $('<tr>')

    $newTrain.html('<td>' + name + '</td><td>' + destination + '</td><td>' + frequency + '</td><td>' + time + '</td><td>' + minutesUntilTrain + '</td>')

    table.append($newTrain)

    if(minutesUntilTrain <= 0) {
        time = (time + frequency)
        unixTime = moment(time, 'HH:mm').format('x')
        minutesUntilTrain = moment(unixTime, 'x').diff(moment(), 'minutes')
        table.append($newTrain)
    }
})