<?php
	session_start();

	header('Content-Type: application/javascript; charset=utf-8');

	$json = file_get_contents('php://input');	//読み込み用ストリーム
	$data = json_decode($json, true);

	$id = $data['id'];
	$baddy = $data['baddy'];

	$_SESSION['id'] = $id;
	$_SESSION['baddy'] = $baddy;
	$_SESSION['guide'][$baddy] = 1;

	$callback  = isset($_GET['callback'])  ? $_GET["callback"] : "";
	$callback = htmlspecialchars(strip_tags($callback));
	$text = "バディファイトの世界へようこそ！";

	printf("{$callback}(%s)", json_encode( $text ));
?>