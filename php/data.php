<?php
checkSession();
function checkSession()
{
    session_start();
    if (isset($_SESSION['value1'])) {
        foreach ($_SESSION as $value) {
            echo $value[0],' ',$value[1],' ',$value[2],' ',$value[3],' ',$value[4],' ',$value[5],' ';
        }
    }
}

?>
