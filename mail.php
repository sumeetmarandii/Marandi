<?php
//get data from form  

$name = $_POST['name'];
$email= $_POST['email'];
$tel= $_POST['tel'];
$message= $_POST['message'];
$to = "work@marandi.in";
$subject = "Mail from Marandi Co.";
$txt ="Name = ". $name . "\r\n  Email = " . $email . "\r\n  Tel = " . $tel . "\r\n  Message =" . $message;
$headers = "From: work@marandi.in" . "\r\n" .
"CC: work@marandi.in";
if($email!=NULL){
    mail($to,$subject,$txt,$headers);
}

//redirect
echo "<script>
alert('Thank You! We will soon contact you.😊');
window.location.href='https://www.marandi.in/';
</script>";

?>