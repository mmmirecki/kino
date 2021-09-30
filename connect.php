<?php
$conn = new mysqli("localhost", "root", "", "sale_kinowe") ;

$sql = "SELECT * FROM sala";
$result = mysqli_query($conn, $sql);
$numOfRows = mysqli_num_rows($result);
echo "[";
for($i = 0; $i<$numOfRows;$i++){
    if($i == $numOfRows-1){
        echo json_encode(mysqli_fetch_assoc($result));
    }
    else{
        echo json_encode(mysqli_fetch_assoc($result)).",";
    }
}
echo "]";


?>