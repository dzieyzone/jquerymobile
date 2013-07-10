<?php
  header('Content-Type: application/json');
  $urls = array(
    'nonce' => 'http://www.frankenman.hk/api/core/get_nonce',//?controller=auth&method=generate_auth_cookie
    'cookie' => 'http://www.frankenman.hk/api/auth/generate_auth_cookie',//nonce=4142904da8&username=jayson&password=testtesttest
    'page' => 'http://www.frankenman.hk/api/core/get_page',//?id=3304
    'check' => 'http://www.frankenman.hk/api/auth/get_currentuserinfo', //cookie=1234
  );
  $form_value = '
  <div class="alert-error"></div>
  <form method="PUT" action="api/auth" data-ajax="false">
    <label for="login_username">Username:</label><br>
    <input type="text" name="login_username" id="inputUsername" /><br>
    <label for="login_password">Password:</label><br>
    <input type="password" name="login_password" id="inputPassword" /><br>
    <button id="loginButton" type="submit" data-theme="a">Login</button>
  </form>';

  $method = $_GET['method'];
  $params = array();
  switch ($method){
    case 'cookie':
      $params = array(
        'username' => $_POST['username'],
        'password' => $_POST['password']
      );
      
      $url = $urls['nonce'] . '?controller=auth&method=generate_auth_cookie';
      $data = _getJsonData($url);
      $params['nonce'] = $data->nonce;

      $url = $urls['cookie'] . '?' . http_build_query($params);
      
      $user_data = file_get_contents($url);
      $authenticate = json_decode($user_data);
      //print_r($authenticate);
      if ($authenticate->status == 'ok'){
        $page_distrib = _getPage($urls['page']);
        $page_distrib = json_decode($page_distrib);
        $page = array(
          'cookie' => $authenticate->cookie,
          'page' => $page_distrib
        );
        
        echo json_encode($page);
      }
      else {
        echo $user_data;
      }
      //print_r($user_data);

      break;
    case 'page':
      $cookie = isset($_GET['cookie']) ? trim($_GET['cookie']) : '';
      $page_content = array(
        'status' => 'ok',
        'page' => array(
          'id' => '99999',
          'title' => 'Login',
          'content' => '',
          'custom_fields' => array(
            'mobile_header' => '',
            'mobile_content' => $form_value
          )
        )
      );
      $page = json_encode($page_content);
      
      $url = $urls['check'] . '?cookie=' . $cookie;
      
      $data = _getJsonData($url);
      //print_r($data);
      
      if ($data->status != 'error') {
        $page = _getPage($urls['page']);
      }

       echo $page;
      break;
  }

  /*
  $param = implode('&', $params);
  $json = '';
  $json_url = $url[$method] . '?' . $param;
  //echo $json_url;
  $json = file_get_contents($json_url);
  //$data = json_decode($json, TRUE);
  echo $json;
  */
   
function _getJsonData($url){
  $data = file_get_contents($url);
  return json_decode($data);
}

function _getPage($url){
  $param = '?id=4453&custom_fields=mobile_content,mobile_header,mobile_footer';
  return file_get_contents($url . $param);
}
?>