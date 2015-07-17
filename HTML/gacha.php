<?php
session_start();
?>
<head>
<script type="text/javascript">
var gacha = {
	main : function(){
		gacha.init();
		
		if(false){
			//no get
			$("#monster_zone_content").hide();

		}else {
			//get
			//視覚効果
			gacha.effect();

			//モンスターの登場
			gacha.entrance();

			//フラグオン
			//send_server(rnd);
		}
	},

	//初期化
	init : function(){
	},

	effect : function(){
		
	},

	entrance : function(){
		var src = "../image/monster/"+<?php echo $_SESSION['get']; ?>+".png";
		$("#monster_zone_content>img").attr("src", src);
	}
}

</script>
<style>
#result_zone {
	text-align: center;
	font-size: 70px;
	font-family:'monospace','Small Fonts',monospace;
	text-shadow: 5px 5px 5px #999;
}

#message {
	text-align: center;
	font-size : 24px;
	font-family :'monospace','Small Fonts',monospace;
	text-shadow : 2px 2px 2px #999;	
}

#monster_zone_content {
	
	text-align: center;
}

#monster_zone_content img{
	margin-top : 30px;
	zoom : 2.0;
}

#button_zone {
	text-align: center;
}

#button_zone button {
	width : 300px;
	height : 80px;
}
</style>

</head>

<div id="gacha_wrap" onload="gacha.event()">
	<div id="result_zone">G a m e  O v e r</div>
	
	<div style="height : 230px;">
		<div id="monster_zone_content">
			<img src="../image/monster/5.png" /><br />
			<span id="message">You Got New Baddy</span>
		</div>
	</div>
	<div id="button_zone">
		<button id="rtm" onclick="load_html('index.html')"> Return To Menu </button>
	</div>

	<script type="text/javascript">
		gacha.main();
	</script>

</div>