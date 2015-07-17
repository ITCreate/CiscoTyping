<?php
	session_start();

	header('Content-Type: application/javascript; charset=utf-8');

	$json = file_get_contents('php://input');	//読み込み用ストリーム
	$data = json_decode($json, true);

	$baddy = $data['baddy'];
	$_SESSION['baddy'] = $baddy;

	$callback  = isset($_GET['callback'])  ? $_GET["callback"] : "";
	$callback = htmlspecialchars(strip_tags($callback));

	printf("{$callback}(%s)", json_encode( $_SESSION['baddy'] ));
?>