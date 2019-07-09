$( document ).ready(function() {
    //when the navbar is clicked on, toggle class
    $(".navbar-burger").click(function(event){
        //setting event preventDefault
        event.preventDefault();
        //toggling classes to active
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
        
    });
    
    //when the user clicks submit
    $("#submit").click(function(event){
        //setting event preventDefault
        event.preventDefault(); 
        //function to check to see if a user entered all info
        function validateSubmit(){
            //set a var to true
            var isValid = true;
            //each form input is apart of the form-control class
            //for each item that is in the form-control class, see if the val is empty
            //if the value is empty, set isValid to false
            //then return isVald
            $(".form-control").each(function(){
                if($(this).val()===""){
                    console.log("In false");
                    isValid=false;
                }
            });
            return isValid;
        }
        
       //if validSubmit is true  
        if(validateSubmit()){
            //set a var object with all val info
            //using id's to get the value of the inputs from the user
            var userData = {
                name: $("#name").val(),
                photo: $("#photo").val(),
                scores: [
                    $("#q1").val(),
                    $("#q2").val(),
                    $("#q3").val(),
                    $("#q4").val(),
                    $("#q5").val(),
                    $("#q6").val(),
                    $("#q7").val(),
                    $("#q8").val(),
                    $("#q9").val(),
                    $("#q10").val()
                ]
            };

            // AJAX post the data to the friends API.
            $.post("/api/friends", userData, function(data) {
                //setting the totalDiff to 0, using this to comapre differnces in scores
                var totalDiff =0;
                //setting the newTotalDiff to 500(a high number)
                var newTotalDiff=500;
                //vars to save name and image of match
                var matchName="";
                var matchImg="";
                //setting a for loop to go through friends list                
                for(var i =0; i<data.length-1; i++){
                    //setting another for loop to get scores
                    for(var x in data[i].scores){
                        //setting potental friend score
                        var friendScore = parseInt(data[i].scores[x]);
                        //setting users score
                        var yourScore = parseInt(userData.scores[x]);
                        //setting totalDiff += to the differences of scores
                        totalDiff += Math.abs(friendScore-yourScore);
                    }
                    //if totalDiff is less than newTotalDiff
                    //set newTotalDiff to totalDiff
                    //set totalDiff back to 0
                    //set matchName and Image to the data we are in
                    if(parseInt(totalDiff)<parseInt(newTotalDiff)){
                        newTotalDiff=parseInt(totalDiff);
                        totalDiff=0;
                        matchName = data[i].name;
                        matchImg = data[i].photo;
                    }
                    //setting totalDiff to 0, if we do not get into the if statment
                    totalDiff=0;
                    
                }
                // Grab the result from the AJAX post so that the friend match name and photo are displayed.
                $("#match-name").text(matchName);
                $("#match-img").attr("src", matchImg);
                
                // Show the modal with the best match
                $(".modal").toggleClass("is-active");
                
                
            });
        } 
        else {
            alert("Please fill out all fields before submitting!");
        }
        
    });
    
    //shen modal-close is clicked, toggleClass
    $(".modal-close").click(function(event){
        event.preventDefault();
        $(".modal").toggleClass("is-active");
    })
    
});