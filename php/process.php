<?php
// Processes the Join/Contact form. Saves to MySQL if configured, otherwise to a CSV file.
if ($_SERVER["REQUEST_METHOD"] !== "POST") { header("Location: ../join.html"); exit; }

function clean($v) { return htmlspecialchars(trim($v), ENT_QUOTES, "UTF-8"); }
$name = clean($_POST["name"] ?? ""); $reg = clean($_POST["reg"] ?? "");
$email = trim($_POST["email"] ?? ""); $type = clean($_POST["type"] ?? "Join");
$message = clean($_POST["message"] ?? "");

$errors = [];
if (strlen($name) < 3) $errors[] = "Invalid name.";
if (!preg_match('/^H\d{6}[A-Z]$/i', $reg)) $errors[] = "Invalid student ID.";
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Invalid email.";
if (strlen($message) < 10) $errors[] = "Message too short.";

$saved = false;
if (!$errors) {
  $email = clean($email);
  require __DIR__ . "/config.php";
  try {
    $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4", $DB_USER, $DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $st = $pdo->prepare("INSERT INTO submissions (name,reg,email,type,message) VALUES (?,?,?,?,?)");
    $st->execute([$name, $reg, $email, $type, $message]);
    $saved = true;
  } catch (Exception $e) {
    $f = fopen(__DIR__ . "/submissions.csv", "a");
    fputcsv($f, [date("c"), $name, $reg, $email, $type, $message]); fclose($f);
    $saved = true;
  }
}
?>
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Submission | HIT Coding Club</title><link rel="stylesheet" href="../css/style.css"></head><body>
<main><div class="ok">
<?php if ($saved): ?>
  <h1>Thank you, <?= $name ?>!</h1><p>Your <?= strtolower($type) ?> request was received. We will reply to <?= $email ?> soon.</p>
<?php else: ?>
  <h1>Oops!</h1><p class="errors"><?= implode("<br>", $errors) ?></p>
<?php endif; ?>
<a class="btn" href="../<?= $saved ? "index.html" : "join.html" ?>"><?= $saved ? "Back to Home" : "Go Back" ?></a>
</div></main></body></html>
