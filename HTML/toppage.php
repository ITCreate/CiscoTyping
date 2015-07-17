<?php
	session_start();
	
	if(!isset($_SESSION['baddy']) ){
		//初ログインなら
		$_SESSION['id'] = 'null';
		$_SESSION['baddy'] = 'null';
		for($i=0;$i<8;$i++){
			$_SESSION['guide'][$i] = 0;
		}
	}
?>

<!DOCTYPE html>
<!-- saved from url=(0048)file://localhost/Users/Shun/Downloads/index.html -->
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>バディバトラー</title>

	<link rel="styleSheet" type="text/css" href="../css/typing.css">

	<!-- プラグイン -->
	<script type="text/javascript" src="../Javascript/jquery.min.js"></script>

	<!-- メニュー画面関連 -->
	<script type="text/javascript" src="../Javascript/top_menue.js"></script>

	<!-- 汎用関数 -->
	<script type="text/javascript" src="../Javascript/common/storage.js"></script>
	<script type="text/javascript" src="../Javascript/common/audio.js"></script>
	<script type="text/javascript" src="../Javascript/common/load_images_kai.js"></script>

	<!-- その他 -->
	<script type="text/javascript" src="../Javascript/studymode.js"></script>
	
	<!-- 各種データ -->
	<script type="text/javascript" src="../Javascript/data/mondai.js"></script>
	<script type="text/javascript" src="../Javascript/data/baddy_data.js"></script>
	<script type="text/javascript" src="../Javascript/data/enemy_data.js"></script>
	<script type="text/javascript" src="../Javascript/data/skill_data.js"></script>

	<script type="text/javascript">
	PHP_Reception = {
		'id' : <?php echo '"'+$_SESSION['id']+'"'; ?>,
		'baddy' : <?php echo $_SESSION['baddy'] ?>,
		'guide' : {
			0 : <?php echo $_SESSION['guide'][0] ?>,
			1 : <?php echo $_SESSION['guide'][1] ?>,
			2 : <?php echo $_SESSION['guide'][2] ?>,
			3 : <?php echo $_SESSION['guide'][3] ?>,
			4 : <?php echo $_SESSION['guide'][4] ?>,
			5 : <?php echo $_SESSION['guide'][5] ?>,
			6 : <?php echo $_SESSION['guide'][6] ?>,
			7 : <?php echo $_SESSION['guide'][7] ?>
		}
		
	}

	audio_class.init("../sound/menu.mp3", true);

	function page_transfer(){
		if(PHP_Reception['baddy'] === null){
			load_html('firstlogin.html');
		}else {
			load_html('index.html');
		}
	}
	</script>
</head>

<body onload="page_transfer()" style="overflow: hidden; background-color:#000000">
	<!-- ここからゲーム画面要素 ゲーム画面 -->
	<div id="gameframe">
		<div id="menulist"></div>
		
		<canvas id="MyMonster" style="position: absolute;left: 550px;top: 150px; width: 500px; height: 300px;">
		</canvas>
	</div>
</body>
</html>