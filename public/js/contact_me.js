$(function() {

  $("#contactForm input,#contactForm textarea,#contactForm select").jqBootstrapValidation({
    preventSubmit: true,
    submitSuccess: function($form, event) {
      event.preventDefault();
      var subject = $("select#subject").val();
      var name = $("input#name").val();
      var email = $("input#email").val();
      var message = $("textarea#message").val();

      var preMessage = "Nachricht von: " + name + " <" + email + ">" + "%0D%0A" + "Betreff: " + subject + "%0D%0A%0D%0A";
      var uri = "mailto:kontakt@tarmac-festival.de";
      uri += "?subject=";
      uri += encodeURIComponent(subject);
      uri += "&body=" + preMessage;
      uri += encodeURIComponent(message);
      window.open(uri, '_self');
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