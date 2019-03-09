  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD0oOJDmY23m7x42FwCfs_iHB0Q22teMLk",
    authDomain: "train-3fc5b.firebaseapp.com",
    databaseURL: "https://train-3fc5b.firebaseio.com",
    projectId: "train-3fc5b",
    storageBucket: "train-3fc5b.appspot.com",
    messagingSenderId: "177132443036"
  };

  firebase.initializeApp(config);

  var database = firebase.database(); 
  var table = $("#train-table-body"); 


  //Assign Values 
  var trainName = $("#train-name-input").val(); 
  var destination = $("#destination-input").val(); 
  var firstTrain = $("#first-train-input").val(); 
  var frequency = $("#frequency-input").val(); 


  //Firebase reference when page loads 
  database.ref().on("child_added", function(snapshot){
    console.log(snapshot.val().trainName);
        trainName = snapshot.val().trainName; 
        destination = snapshot.val().destination; 
        firstTrain = snapshot.val().firstTrain; 
        frequency = snapshot.val().frequency; 
        nextTrain = snapshot.val().nextTrain;
        minutesAway = snapshot.val().minutesAway;
        

        //Append data to rows 
        var newRow = $("<tr>");
        newRow.append("<td>" + trainName + "</td>");
        newRow.append("<td>" + destination + "</td>");
        newRow.append("<td>" + frequency + "</td>");
        newRow.append("<td>" + nextTrain + "</td>");
        newRow.append("<td>" + minutesAway + "</td>");


        // Append row to table
        table.append(newRow);
  });

     

  // new train added
  $("#add-train-btn").on("click", function(event) {

    event.preventDefault()
    //Grab values 
    var trainName = $("#train-name-input").val().trim(); 
    var destination = $("#destination-input").val().trim(); 
    var firstTrain = $("#first-train-input").val().trim(); 
    var frequency = $("#frequency-input").val().trim(); 

  // Time calculations and conversions

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var timeDifference = moment().diff(moment(firstTrainConverted), "minutes");

    // Time apart (remainder)
    var timeApart = timeDifference % frequency;
    console.log(timeApart);

    // Minute Until Train
    var minutesAway = frequency - timeApart;

    // Next Train
    var nextTrain = moment().add(minutesAway, "minutes");

    console.log(trainName)
    console.log(destination)
    console.log(firstTrain)
    console.log(frequency)
    console.log(firstTrainConverted);
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    console.log("DIFFERENCE IN TIME: " + timeDifference);
    console.log("MINUTES TILL TRAIN: " + minutesAway);
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



    // Code for the push
    database.ref().push({

        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        minutesAway: minutesAway,
        nextTrain: nextTrain

      });
});


