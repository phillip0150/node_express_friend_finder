$( document ).ready(function() {
    var navBar = false;
    $("#navMenu").hide();
    
    $(".navbar-burger").click(function(){
        
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
        
    });
    
    $("#submit").click(function(){
        event.preventDefault();
        
        function validateSubmit(){
            var isValid = true;
            $(".form-control").each(function(){
                console.log($(this).val());
                if($(this).val()===""){
                    console.log("In false");
                    isValid=false;
                }
            });
            return isValid;
        }
        
        if(validateSubmit()){
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
                var totalDiff =0;
                var newTotalDiff=500;
                var matchName="";
                var matchImg="";
                console.log(data);
                
                for(var i =0; i<data.length-1; i++){
                    for(var x in data[i].scores){
                        console.log("Friend: "+ data[i].name);
                        var friendScore = parseInt(data[i].scores[x]);
                        var yourScore = parseInt(userData.scores[x]);
                        totalDiff += Math.abs(friendScore-yourScore);
                        console.log(totalDiff);
                    }
                    if(parseInt(totalDiff)<parseInt(newTotalDiff)){
                        newTotalDiff=parseInt(totalDiff);
                        totalDiff=0;
                        matchName = data[i].name;
                        matchImg = data[i].photo;
                    }
                    totalDiff=0;
                    console.log("newTotalDiff" + newTotalDiff);
                    console.log("matchName" + matchName);
                    console.log("matchImg" + matchImg);
                    
                }
                // Grab the result from the AJAX post so that the best match's name and photo are displayed.
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
    
    $(".modal-close").click(function(){
        $(".modal").toggleClass("is-active");
    })
    
});