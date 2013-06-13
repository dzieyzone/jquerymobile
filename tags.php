<?php
  header('Content-Type: application/json');
  $json_url = 'http://www.frankenman.hk/tag/' . $_GET['tag'] . '?json=1';
  $json = file_get_contents($json_url);
  //$data = json_decode($json, TRUE);
  echo $json;
?>