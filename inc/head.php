<html lang="en">
<head>
  <base href="/fragments/test/">
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= $data->document_title ?></title>
  <link rel="stylesheet" href="assets/app.css">
</head>
<body>
<h1>Super Mario Characters</h1>
<?php $is_about = basename($_SERVER['SCRIPT_NAME']) === 'about.php'; ?>
<nav class="nav" id="nav">
  <ul class="nav_list">
    <li class="nav_item"><a class="nav_link <?= !$is_about ? 'is-active' : '' ?>" href="./">Home</a></li>
    <li class="nav_item"><a class="nav_link <?= $is_about ? 'is-active' : '' ?>" href="./about.php">About</a></li>
  </ul>
</nav>