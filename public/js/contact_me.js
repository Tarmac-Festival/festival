$(function() {
  var formSubject = $("#contactForm input#subject");
  var formName = $("#contactForm input#name");
  var formMail = $("#contactForm input#email");
  var formMessage = $("#contactForm textarea#message");
  var sendButton = $("#contactForm button#send");
  var sendSpinner = $("#contactForm #sendSpinner");
  var alertS = $("#alertSuccess");
  var alertF = $("#alertFail");

  $("#contactForm").on("submit", function(event){
    event.preventDefault();
    sendSpinner.removeClass("d-none");
    sendButton.attr("disabled", true);
    alertS.first().slideUp("fast");
    alertF.first().slideUp("fast");

    var compiledMessage = formMessage.val();
    if (!compiledMessage) {
      alert("Bitte füllen Sie alle Felder aus.");
      sendSpinner.addClass("d-none");
      sendButton.attr("disabled", false);
      return;
    }

    var subjectMail = "contact@tarmac-festival.de";
    var subject = formSubject.val();
    var name = formName.val();
    var mail = formMail.val();
    var message = "Nachricht von: "
        + name
        + " ["
        + mail
        + "]<br>Betreff: "
        + subject
        + "<br><br>Nachricht:<br>"
        + formMessage.val();

    var result = grecaptcha.execute('6LcuY9QUAAAAACswQfBwCN5I8Q0x6fmFXEKGhV5d', {action:'validate_captcha'})
      .then(function (token) {
        console.log('recaptcha token: ' + token);

        var request = $.ajax({
          type: "POST",
          url: "/checkRecaptcha",
          data: {
            "token": token,
            "subject": "Anfrage Website: " + subject,
            "userMail": mail,
            "userName": name,
            "email": subjectMail,
            "message": message
          }
        });

        request.done(function (response, textStatus){
          console.log('response: ' + response, textStatus);
          sendSpinner.addClass("d-none");
          sendButton.attr("disabled", false);
          if(response.result === 'success') {
            alertS.first().slideDown("fast").delay(5000).slideUp("fast");
            $("#contactForm").get(0).reset();
            formMessage.summernote('reset');
          } else {
            alertF.first().slideDown("fast");
          }
        });

        request.fail(function (jqXHR, textStatus, errorThrown){
          // Log the error to the console
          console.error("Error while sending mail: " + textStatus, errorThrown);
          alertF.first().slideDown("fast");
          sendSpinner.addClass("d-none");
          sendButton.attr("disabled", false);
        });
      });
    return false;
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});