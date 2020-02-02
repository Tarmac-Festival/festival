$(function() {

  $("#contactForm input,#contactForm textarea,#contactForm select").jqBootstrapValidation({
    preventSubmit: true,
    submitSuccess: function($form, event) {
      event.preventDefault();
      var token = $("input#g-recaptcha-response").val();
      if (token == null || token==='') {
        alert("Unerwarteter Fehler beim Senden deiner Nachricht");
        return;
      }

      var sendButton = $("button#send");
      sendButton.attr("disabled", true);
      var select = $("select#subject")[0];
      var subjectText = select.options[select.selectedIndex].text;
      var subjectMail = select.options[select.selectedIndex].value;
      var name = $("input#name").val();
      var email = $("input#email").val();
      var message = "Nachricht von: " + name + " [" + email + "]" + "<br>" + "Betreff: " + subject + "<br><br>" + $("textarea#message").val();
      $.ajax({
        type: "POST",
        url: "/checkRecaptcha",
        data: {
          "token" : token,
          "subject": subjectText,
          "name": name,
          "email": subjectMail,
          "message": message
        },
        success: function(data) {
          console.log('response: ' + data.response);
          sendButton.attr("disabled", false);
          if(data.result === 'success') {
            $("#alertSuccess").addClass("show").removeClass("d-none");
            $form.reset();
          } else {
            $("#alertFail").addClass("show").removeClass("d-none");
          }
        },
        error: function() {
          console.log('error while sending mail!');
          $("#alertFail").addClass("show").removeClass("d-none");
          sendButton.attr("disabled", false);
        }
      });

    },
    filter: function() {
      return $(this).is(":visible");
    }
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});