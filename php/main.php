<?php
function checkSquare($xVal, $yVal, $rVal)
{
    if ($xVal <= 0 && $yVal <= 0) {
        if ($xVal >= -$rVal && $yVal >= 0 - $rVal) {
            return true;
        }
    }

    return false;
}

function checkY($yVal)
{
    if ($yVal >= -5 && $yVal <= 5 && $yVal != '' && is_numeric($yVal)) {
        return true;
    }
    return false;
}

function checkNumber($Val)
{
    if ($Val != '' && is_numeric($Val)) return true;
    return false;
}

function checkTriangle($xVal, $yVal, $rVal)
{
    if ($xVal >= 0 && $yVal >= 0) {
        if ($xVal + $yVal <= $rVal) {
            return true;
        }
    }
    return false;
}

function checkCircle($xVal, $yVal, $rVal)
{
    if ($xVal >= 0 && $yVal <= 0) {
        if (($xVal) ** 2 + ($yVal) ** 2 <= ($rVal) ** 2) {
            return true;
        }

    }

    return false;
}

function validateData($xVal, $yVal, $rVal)
{
    return checkTriangle($xVal, $yVal, $rVal) || checkSquare($xVal, $yVal, $rVal) || checkCircle($xVal, $yVal, $rVal);
}

function validateNumbers($xVal, $yVal, $rVal)
{
    if (checkY($yVal) && checkNumber($xVal) && checkNumber($rVal)) {
        return true;
    }
    return false;
}

$countValues = $_POST['countValues'];
$time = $_POST['time'];
$xVal = $_POST['choice-X'];
$yVal = $_POST['choice-Y'];
$rVal = $_POST['choice-R'];


sendingData($xVal, $yVal, $rVal, $countValues, $time);
function sendingData($xVal, $yVal, $rVal, $countValues, $time)
{
    if (validateNumbers($xVal, $yVal, $rVal)) {
        $time_start = microtime(true);
        $validate = validateData($xVal, $yVal, $rVal);
        $validate = $validate ? 'true' : 'false';
        session_start();

        $time_end = microtime(true) - $time_start;
        $arrayOfValues = array($validate, $xVal, $yVal, $rVal,$time, $time_end);
        $_SESSION['value' . $countValues] = $arrayOfValues;
        echo $validate, " ", $time_end;
    } else {
        echo "Неверные данные";
    }
}


//?>
