// scripts.js

// #validateEmail
// Validates if the given email is indeed an email

var validateEmail = function validateEmail(email) {
    var re =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
};

$(document).ready(function(){
  // Initialize all modal buttons.
  $('.modal-trigger').leanModal({
    opacity: 0.5
  });

  var $form = $('form');

  // On submit of email form, make a AJAX post request to API
  $form.submit(function(event){
    // Get the email.
    var $email = $('#email');
    var email = $email.val();


    // Perform AJAX call to API as long as its an email
    if (validateEmail(email)){

      // Disable any more submissions
      $('button', $form).addClass('disabled').attr('disabled', 'disabled');

      // Add a loader
      var $loader = $('<div>').addClass('progress')
        .append($('<div>').addClass('indeterminate'));
      $form.prepend($loader);

      $.ajax({
        type: 'POST',
        url: 'http://api-openclassspace.rhcloud.com/subscribers',
        data: {
          email: email
        },
        dataType: 'json',
        success: function(response){

          // Remove the form from DOM
          $('form').remove();

          // Append a success message!
          var $success = $('<p>').addClass('flow-text')
            .text("Thank you!");
          $('.email').append($success);
        },
        error: function(err){
          // Better not be here because server messes up.
        }
      });
    } else { // Not email
      // Make it show that there is an error by adding the invalid class.
      $email.removeClass("valid");
      $email.addClass("invalid");
    }

    // Prevent the defaults. (Mainly page reload)
    event.preventDefault();
  });
});
