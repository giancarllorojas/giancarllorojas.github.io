<?php
if(isset($_POST['name'], $_POST['message'], $_POST['email'])){
    $nome = $_POST['name'];
    $mess = $_POST['message'];
    $mail = $_POST['email'];

    $chatID = "-314311013";
    $messaggio = "Mensagem recebida: \n Nome: $nome \n Email: $mail \n Mensagem: $mess ";

    $token = "";



    $data = array(
        'text' => $messaggio,
        'chat_id' => $chatID
    );

    $a = file_get_contents("https://api.telegram.org/bot$token/sendMessage?" . http_build_query($data) );
}else{
    header('HTTP/1.0 404 Not Found', true, 404);
}
