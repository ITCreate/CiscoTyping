<head>
	<style>
	#image_layer {
		position: absolute;
		z-index: 0;
	}

	#string_layer {
		position: absolute;	
		z-index: 10;
	}
	</style>
	<!-- ゲームモード関連 -->
	<script type="text/javascript" src="../Javascript/game/survival.js"></script>
	<script type="text/javascript" src="../Javascript/game/baddyfight.js"></script>
	<script type="text/javascript" src="../Javascript/game/game_gui.js"></script>
	<script type="text/javascript" src="../Javascript/game/typing_mode.js"></script>
	<script type="text/javascript" src="../Javascript/game/dungeon.js"></script>
	<script type="text/javascript" src="../Javascript/game/effect.js"></script>
	<script type="text/javascript" src="../Javascript/game/battle_system.js"></script>

	<script type="text/javascript">
	(function(){
		typingcallback();
	})();
	</script>
</head>
<div id="typemode_wrap" onload="aaaa()">
	<!-- ここからゲーム画面要素 ゲーム画面 -->
	<!-- コマンドタイピングモード -->
	<canvas id="image_layer" width="800" height="450"></canvas>
	<canvas id="string_layer" width="800" height="450"></canvas>
</div>