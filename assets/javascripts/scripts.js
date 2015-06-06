$(document).ready(function(){
  // Initialize all modal buttons.
  $('.modal-trigger').leanModal({
    opacity: 0.5
  });

  // On submit of email form, make a AJAX post request to API
  $('form').submit(function(event){
    // Get the email.
    var email = $('#email').val();
    console.log(email);

    // Validate email?

    // Perform AJAX call to API
    $.ajax({
      type: 'POST',
      url: 'http://api-openclassspace.rhcloud.com/subscribers',
      data: {
        email: email
      },
      dataType: 'json',
      success: function(response){
        console.log("here?");
        console.log(response);
      },
      error: function(err){
        console.log("were here");
        console.log(err);
      }
    });
    // Prevent the defaults. (Mainly page reload)
    event.preventDefault();
  });
});
