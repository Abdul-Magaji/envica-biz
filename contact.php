<?php

$to = 'you@example.com'; // Replace with your email

function url() {
  return sprintf(
    "%s://%s",
    isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
    $_SERVER['SERVER_NAME']
  );
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $first_name = trim(stripslashes($_POST['first_name'] ?? ''));
  $last_name = trim(stripslashes($_POST['last_name'] ?? ''));
  $phone = trim(stripslashes($_POST['phone'] ?? ''));
  $email = trim(stripslashes($_POST['email'] ?? ''));
  $message_content = trim(stripslashes($_POST['message'] ?? ''));

  $full_name = $first_name . ' ' . $last_name;

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Invalid email address.";
    exit;
  }

  $subject = "New Contact Form Message";

  $message  = "Name: " . htmlspecialchars($full_name) . "<br />";
  $message .= "Email: " . htmlspecialchars($email) . "<br />";
  $message .= "Phone: " . htmlspecialchars($phone) . "<br />";
  $message .= "Message: <br />" . nl2br(htmlspecialchars($message_content));
  $message .= "<br /><br />Sent from: " . url();

  $headers  = "From: " . $full_name . " <" . $email . ">\r\n";
  $headers .= "Reply-To: " . $email . "\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

  ini_set("sendmail_from", $to);

  if (mail($to, $subject, $message, $headers)) {
    echo "OK";
  } else {
    echo "Something went wrong. Please try again.";
  }
}
?>
