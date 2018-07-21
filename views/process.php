<?php
if(isset($_GET['submit'])){
    $query = $_GET['message'];
    
    $postData = array('query' => array($query), 'lang' => 'en', 'sessionId' => 123456789);
    $jsonData = json_encode($postData);
    $ch = curl_init('https://api.dialogflow.com/v1/query?v=20150910&lang=en&query=Hello&sessionId=123456789&timezone=Asis/Almaty');
    curl_setopt($ch, CURLOPT_GET, 1);
    curl_setopt($ch, CURLOPT_GETFIELDS, $jsonData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Authorization: Bearer 06739e5ce32444e4a8f636fed317eb2b'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($ch);

    echo $result;
    curl_close($ch);

}
?>