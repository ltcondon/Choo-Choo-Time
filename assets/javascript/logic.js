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
  var trainsPresent = false;


  //Assign Values 
  var trainName = $("#train-name-input").val(); 
  var destination = $("#destination-input").val(); 
  var firstTrain = $("#first-train-input").val(); 
  var frequency = $("#frequency-input").val(); 


  //Firebase reference when page loads 
  database.ref().on("child_added", function(snapshot){
    trainsPresent = true;
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
     

  // When 'Add Train' is clicked:
  $("#add-train-btn").on("click", function(event) {

    event.preventDefault()
    //Grab values 
    var trainName = $("#train-name-input").val().trim(); 
    var destination = $("#destination-input").val().trim(); 
    var firstTrain = $("#first-train-input").val().trim(); 
    var frequency = $("#frequency-input").val().trim(); 

  // Time calculations and conversions

    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var timeDifference = moment().diff(moment(firstTrainConverted), "minutes");
    var timeApart = timeDifference % frequency;
    var minutesAway = frequency - timeApart;
    minutesAway = minutesAway.toLocaleString();

    var nextTrain = moment(nextTrain).format("hh:mm");
    nextTrain = nextTrain.toLocaleString();

    console.log(trainName)
    console.log(destination)
    console.log(firstTrain)
    console.log(frequency)
    console.log(firstTrainConverted);
    console.log("current time: " + moment(currentTime).format("hh:mm"));
    console.log("next train in  " + minutesAway + " minutes");
    console.log("next train arrives at: " + moment(nextTrain).format("hh:mm"));



  // Pushing everything to Firebase
    database.ref().push({

        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        minutesAway: minutesAway,
        nextTrain: nextTrain

      });
});

    if (trainsPresent === true) {
        setInterval(function() {
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
        }, 30000);
    };
