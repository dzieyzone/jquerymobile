$(document).ready(function() {	
  $("#contact #contact-form .submit").click(function() {
    var name = $(".name").val();
	var mail = $(".mail").val();
	var message = $(".message").val();
	
	$.ajax({
	  type: 'POST', // defaults to 'GET'
	  url: "http://m.frankenman.hk/jqmtest/contact.php?name="+name+"&mail="+mail+"&message="+message,
	  data: {name : ""},
	  dataType: 'html', //'json', 'xml', 'html', or 'text'
	  success: function(response) { 
	    $(".messages").html(response);  
	    if(response == "Message has been submitted."){
	      $(".name").val("");
	      $(".mail").val("");
	      $(".message").val("");
	    }
	  },
	  error: function(xhr, type) {alert("Error ajax call!"); }
	});
	
  });	
});