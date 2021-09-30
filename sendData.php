<?php
$conn = new mysqli("localhost", "root", "", "sale_kinowe") ;

    $miejsca=$_POST["miejsca"];
    $film=$_POST["film"];
    $imie=$_POST["imie"];
    $mail=$_POST["mail"];
    $rez = $_POST["rez"];

    echo($miejsca);
    echo($rez);


    $sql = "INSERT INTO rezerwacje (miejsca,film,imie,mail) VALUES ('$rez','$film','$imie','$mail')";

    if($conn->query($sql)===TRUE){
        echo("sucsess");
    }
    else{
        echo("error".$conn->error);
    }

    $sql2 = "UPDATE sala SET miejsca='$miejsca' WHERE nazwa=$film";
    
    if($conn->query($sql2)===TRUE){
        echo("sucsess");
    }
    else{
        echo("error".$conn->error);
    }
?>