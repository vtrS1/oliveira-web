<?php
header('Content-Type: application/json');
@include("./php/JSON.php");


if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    print("Acesso negado");
    exit(0);
}

if (!function_exists('json_encode')) {
    function json_encode($data)
    {
        $json = new Services_JSON();
        return ($json->encode($data));
    }
}

if (!function_exists('json_decode')) {
    function json_decode($data)
    {
        $json = new Services_JSON();
        return ($json->decode($data));
    }
}

function makeDir($path)
{
    $ret = @mkdir($path);
    return $ret === true || is_dir($path);
}

$date = date('d/m/Y');
list($d, $m, $y) = explode('/', $date);

makeDir($y);
makeDir($y . '/' . $m);
makeDir($y . '/' . $m . '/' . $d);

$uploadDir = $y . '/' . $m . '/' . $d . '/';

$data = json_decode(file_get_contents('php://input'), true);

$extension = $data['extension'];
$imgName = $data['name'];
$img = $data['img'];
$img = str_replace('data:image/' . $extension . ';base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$file = $uploadDir . $imgName . $extension;
$success = file_put_contents($file, $data);

if ($success) {
   echo json_encode(array('status' => true, 'url' => 'https://'.$_SERVER[SERVER_NAME].'/oliveira/'.$file));
} else {
    echo json_encode(array('status' => false));
}

