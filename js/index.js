$(document).ready(function () {
            console.log("sanity check");

            $("#newEmail").submit(function () {
               
                var name = $("#name").val(); 
                console.log(name);
                var email= $("#email").val();  
                var message = $("#message").val(); 
               

                $.ajax({
                        type: "POST",
                        url: "https://mandrillapp.com/api/1.0/messages/send.json",
                        data: {
                            'key': 'L4gEheNVZLP47i6zfkr1lg',
                            'message': {
                                'from_email': email,
                                'from_name': name,
                                'headers': {
                                    'Reply-To': email,
                                },
                                'subject': 'Portfolio',
                                'text': message,
                                'to': [
                                    {
                                        'email': 'carolinappowers@gmail.com',
                                        'name': 'Carolina Powers',
                                        'type': 'to'
                    }]
                            }
                        }
                    })
                    .done(function (response) {
                        alert('Your message has been sent. Thank you!'); // show success message
                        console.log(response); 
                    $("#name").val(''); // reset field after successful submission
                    $("#email").val(''); // reset field after successful submission
                    $("#message").val(''); // reset field after successful submission
       
                    })
                    .fail(function (response) {
                        alert('There was a problem sending this message.');
                    });
                return false; // prevent page refresh
            });
        });
