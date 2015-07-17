// ゲーム画面のスクリプト
var type_game_global = {
	state_flg : 0,	//ゲームモードを表す。 1 : バトル
	initiate_counter : 0,		//
	dungeon : null
}

/*
ゲームモード読み込み時のコールバック。ゲーム全体での初期化を行う。
読み込まれた時、一度のみ実行するので一度しか実行する必要のない処理のみ行う
*/
var typingcallback = function(){
	console.log("ゲームモード開始のコールバックが読まれます");
	//Canvasの設定
	GUI.image_canvas = document.getElementById("image_layer");
	GUI.image_context = GUI.image_canvas.getContext("2d");

	GUI.string_canvas = document.getElementById("string_layer");
	GUI.string_context = GUI.string_canvas.getContext("2d");

	//サウンドの設定
	sounds.sound_initiate();	//ic+1

	//バディ
	unit_management.create_baddy();

	//エネミーの設定
	unit_management.load_images();

	//ダンジョンの初期化
	type_game_global.dungeon = new Dungeon();
	type_game_global.dungeon.initiate_dungeon();

	//システム画像の準備
	GUI.battle_system = new load_images();
	GUI.battle_system.set_pass("../image/background.png");
	GUI.battle_system.set_pass("../image/frame01.png");
	GUI.battle_system.set_pass("../image/icon/heart.png");
	GUI.battle_system.set_pass("../image/icon/sword.png");
	GUI.battle_system.set_pass("../image/icon/feather.png");
	GUI.battle_system.load_que_successive(GUI.battle_system); 	// ic+1

	//エフェクトの準備 ic+1
	GUI.effect_data = new Array();
	var slash_effect = new Effect(0);
	slash_effect.preload_my_images();
	GUI.effect_data.push(slash_effect);

	window.document.addEventListener("keyup", function(e){
		if(type_game_global.state_flg === 1){
			CtoC.check_keycode(e);
		}else if(type_game_global.state_flg === 0){
			//onleydownイベントの解除
			//window.document.removeEventListener("keydown", arguments.callee, false);			
		}

		}, false);
	console.log("ゲームの最初期化を開始します。");
	game_initiate();

}

var game_initiate = function(){
	//console.log("ゲームの最初期化中です...");
	var gi_success = 0;
	switch(type_game_global.initiate_counter){
		case 4 :
			gi_success = 1;
			type_game_global.initiate_counter = 0;
			console.log("ゲームの最初期化が完了しました！");
			type_game_global.dungeon.main(type_game_global.dungeon);	//ダンジョン散策開始
			break;

		default :
			console.log("now loading.  fig sets " + type_game_global.initiate_counter);
			break;
	}

	if(gi_success === 0){
		var repeat1 =  setTimeout(function(){game_initiate()}, 100);//@
	}
}

var unit_management = {
	your_baddy : null,
	enemy : null,
	unit_images : null,

	create_baddy : function(){
		console.log("バディを作成します...");
		this.your_baddy = new Baddy(PHP_Reception['baddy']);
	},

	create_enemy : function(){
		console.log("エネミーを作成します...");
		this.enemy = new Enemy(type_game_global.dungeon.encounting);
	},

	load_images : function(){
		unit_management.unit_images = new load_images();
		for(var i=0;i<baddy_db.length;i++){
			unit_management.unit_images.set_pass("../image/monster/"+i+".png");
		}
		unit_management.unit_images.load_que_successive(unit_management.unit_images);
	}

}
