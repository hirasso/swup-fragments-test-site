<?php 
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);

require_once('./inc/functions.php');

$data = get_data('./data/data.json', [
  'current_character' => filter_var($_GET['character'] ?? null),
  'current_filter' => filter_var($_GET['filter'] ?? null)
]);

require_once('./inc/head.php');
require_once('./inc/main.php');
require_once('./inc/foot.php');