<?php 
    // какая-то инициализация
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    // подключение файлов phpmailer
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    // создаем экземпляр объекта PHPMailer
    $mail = new PHPMailer(true);
    // Кодировка UTF-8 что бы не получать абра-кадабру
    $mail->CharSet = 'UTF-8';
    // подключаем языки (не обязательное поле)
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);
    // от кого письмо
    $mail->setFrom('nardo1988@gmail.com', '12 STOREEZ');
    // кому отправлять
    $mail->addAddress('k.shumskaya@12storeez.com');
    // тема письма
    $mail->Subject = 'Регистрация участника';
   
    //Тело письма
    $body = '<h1>Регистрация участника</h1>';
    // если поле есть то формируем разметку html 
    // c данныи и все это пушим в тело ответа
    if (trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }
    if (trim(!empty($_POST['email']))){
        $body.='<p><strong>Email:</strong> '.$_POST['email'].'</p>';
    }
   
    if (trim(!empty($_POST['action']))){
        $body.='<p><strong>Профессиональная область:</strong> '.$_POST['action'].'</p>';
    }
    
    $mail->Body = $body;
    // отправляем
    if (!$mail->send()){
        $message = 'Ошибка';
    } else {
        $message = 'Данные отправлены';
    }
    $response = ['message' => $message];
    header('Content-type: application/json');
    echo json_encode($response);
?>
