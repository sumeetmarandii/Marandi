<?php
// Set your email address here
$to = "hi@marandi.in";
$subject = "New Contact Form Submission - Marandi In";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $full_Name_Marandi = htmlspecialchars(trim($_POST["full_Name_Marandi"] ?? ''));
    $email_Marandi = htmlspecialchars(trim($_POST["email_Marandi"] ?? ''));
    $phone_Marandi = htmlspecialchars(trim($_POST["phone_Marandi"] ?? ''));
    $subject_Marandi = htmlspecialchars(trim($_POST["subject_Marandi"] ?? ''));
    $message_Marandi = htmlspecialchars(trim($_POST["message_Marandi"] ?? ''));

    if ($full_Name_Marandi && $email_Marandi && $phone_Marandi && $message_Marandi) {
        $body = "Name: $full_Name_Marandi\n";
        $body .= "Email: $email_Marandi\n";
        $body .= "Phone: $phone_Marandi\n";
        $body .= "Message:\n$message_Marandi\n";

        $headers = "From: $full_Name_Marandi <$email_Marandi>\r\n";
        $headers .= "Reply-To: $email_Marandi\r\n";

        if (mail($to, $subject, $body, $headers)) {
            // On success, redirect back to homepage contact section with status
            header("Location: index.html?contact=success#contact", true, 303);
            exit;
        } else {
            $result = "Sorry, there was a problem sending your message. Please try again later.";
        }
    } else {
        $result = "Please fill in all required fields.";
    }
} else {
    $result = "Invalid request.";
}
?>