<?php
  if(empty($_GET['name'])){
    echo 'Name field is required.';	
  }
  elseif(empty($_GET['mail'])){
  	echo 'Mail field is required.';
  }
  elseif(empty($_GET['message'])){
  	echo 'Message field is required.';
  }
  elseif(!filter_var($_GET['mail'], FILTER_VALIDATE_EMAIL)){
  	echo 'Email field should be a valid email address.';
  }
  else {
  	$to = "joel.magundayao@insitesocial.com";
  	$subject = "Frankenman Inquiry | Mobile Contact Page";
  	$message = "<b>Name:</b> ".$_GET['name']."<br />";
  	$message .= "<b>Mail:</b> ".$_GET['mail']."<br />";
  	$message .= "<b>Message:</b><br/> ".$_GET['message']."";
  	$header = "From:".$_GET['mail']." \r\n";
  	$header = "Cc:matthewsexton@insitesocial.com \r\n";
  	$header .= "MIME-Version: 1.0\r\n";
  	$header .= "Content-type: text/html\r\n";
  	$retval = mail($to,$subject,$message,$header);
  	if( $retval == true )
  	{
  		echo "Message has been submitted.";
  	}
  	else
  	{
  		echo "Message could not be sent...";
  	}
  }
?>