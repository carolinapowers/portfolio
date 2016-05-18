$(document).ready(function () {
//    $("#submit").click(function () {
        $("#newEmail").submit(function (e) {
            e.preventDefault();
        var name = $("#name").val();
        var email = $("#email").val();
        var message = $("#message").val();
        console.log(name);
        
        
        // Checking for blank fields.
        if (name == '' || email == '' ) {
            alert("Please Fill Required Fields");
        } else {
            // Returns successful data submission message when the entered information is stored in database.
            $.ajax({
                url:"contact_form.php", 
                method: "POST", 
                data: {
                    name1: name,
                    email1: email,
                    message1: message
               }
            }).done(function( msg ) {
                alert( "Data Saved: " + msg );
            });
        }
    });
    
});