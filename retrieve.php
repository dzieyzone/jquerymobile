<?php
  header('Content-Type: application/json');
  $json_url = 'http://www.frankenman.hk/?page_id='.$_GET['page_id'].'&json=1&custom_fields=mobile_content,mobile_footer';
  $json = file_get_contents($json_url);
  //$data = json_decode($json, TRUE);
  echo $json;
?>