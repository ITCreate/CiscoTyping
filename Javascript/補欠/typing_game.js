// ゲーム画面のスクリプト
/*
include : Javascript/game/load_images.js
include : Javascript/mondai.js

*/




/* ゲームモード読み込み時のコールバック。ゲーム全体での初期化を行う。 */
var typingcallback = function(){
	//問題の設定
	if(localStorage.length < 1){
		console.log("*初回通信を開始します。");
		mondai_class.putmondai();
	}else{
		console.log("*通信処理を無視します。");
	}
	mondai_class.getmondai();

	//ゲームモードを開始にする
	CtoC.game_state = 1;

	//音楽を設定
	audio_class.init("../sound/normal.mp3", true);

	//ユニットの設定
	unit_management.create_baddy();
	unit_management.create_enemy();
	//攻撃開始
	unit_management.enemy.attack(unit_management.enemy, unit_management.your_baddy);

	//GUIの初期化を行う
	GUI.common_initiate();
	GUI.main();
	
	//文字の入力判定の設定
	
	CtoC.initiate_section();
	window.document.addEventListener("keydown", function(e){
		if(CtoC.game_state === 1){
			CtoC.check_keycode(e);
		}else if(CtoC.game_state === 0){
			//onleydownイベントの解除
			window.document.removeEventListener("keydown", arguments.callee, false);			
		}

		}, false);

	/*
	window.document.onkeydown = function(e){
		CtoC.check_keycode(e);
	}
	*/


}



/* 今出題されている問題を格納 */
var typing_mondai = {
	mean : null,	//コマンドの意味
	command : null,	//シスココマンド
	now_typing : "",	//現在打ち込み終わった文

	set_mondai : function(mean, command){
		this.mean = mean;
		this.command = command.toUpperCase();
		this.now_typing = "";
	},

	show_mondai : function(){
		console.log(this.mean);
		console.log(this.command);
	}
}

var CtoC = {
	game_state : 0,	//0 -> 停止　; 1 ->  バトル中 ;
	quiznumber : 0,
	kikikan : 0,
	combo : 0,

	initiate_section : function(){
		//ランダムに問題を生成。
		var rnd = Math.floor(Math.random() * mondai_class.mondai.length) - 1;	//末尾はNullなので外しておく
		typing_mondai.set_mondai(mondai_class.mondai[rnd]['meaning'], mondai_class.mondai[rnd]['command']);
		//unit_management.your_baddy.combo_bonus();
	},

	check_keycode : function(evt){
		console.log(evt.keyCode+"Key が押されました");
		var kc = evt.keyCode;
		if (kc == 27) {//エスケープキーが押された
  			CtoC.push_Escape();
		}else{
			CtoC.next_char(evt,kc);
		}
	},

	push_Enter : function(){
		console.log("Enter Key が押されました");
	},

	push_Escape : function(){
		console.log("Escape Key が押されました");
		CtoC.finish_game();
	},

	trans_specialchar : function(kc){
		var key;
		if(kc === 189){//ハイフン
			kc = 45;
			console.log("-");
		}else if(kc === 190){//ドット
			kc = 46;
			console.log(".");
		}
		key = String.fromCharCode(kc);//それ以外全部
		return key;
		/*	
		String.fromCharCode(n);
		charCodeAt(n));
		キーコード調べセット
		*/
	},

	next_char : function(evt,kc){
		var tf;
		var chr = CtoC.trans_specialchar(kc);
		
		//入力文字の正誤判定
		tf = CtoC.check_correspond(chr, typing_mondai.now_typing.length, typing_mondai.command.length);

		//この問題をクリアしたか判定(全文字入力済み)
		if(typing_mondai.command.length <=  typing_mondai.now_typing.length){
			console.log("Go Next Q.");
			CtoC.initiate_section();
		}
		//alert(typing_mondai.command.length+"/"+typing_mondai.now_typing.length);
	},

	check_correspond : function(input_char, num, length){
		var tf = 0;
		var target_char = typing_mondai.command.charAt(num).toUpperCase();
		//alert(input_char+"/"+target_char);
		if(input_char === target_char){
			tf = 1;
			typing_mondai.now_typing += input_char;
			console.log("good : " + input_char);
			CtoC.combo++;
			//@
			battle_system.unit_attack(unit_management.your_baddy, unit_management.enemy);
		}else{
			console.log("boo : " + typing_mondai.now_typing);
			CtoC.combo = 0;
		}
		return tf;
	},

	//ゲーム終了処理
	finish_game : function(){
		//蛍の光
		audio_class.init("../sound/gameover.mp3", false);

		//ゲームステートの変更
		CtoC.game_state = 0;	//ゲームステートを終了に

		if(unit_management.your_baddy.hp <= 0 && unit_management.enemy.hp <= 0){
			//引き分け
			unit_management.your_baddy.hp = 0;
			unit_management.enemy.hp = 0;
			alert("引き分け");
		}else if(unit_management.enemy.hp <= 0){
			//勝ち
			unit_management.enemy.hp = 0;
			alert("勝ち");
		}else {
			//負け
			unit_management.your_baddy.hp = 0;
			alert("負け");
		}
	}
}


var GUI = {
	image_canvas : null,
	image_context : null,

	string_canvas : null,
	string_context : null,

	//Imageオブジェクト
	baddy : null,
	enemy : null,
	type_bar : null,
	background : null,

	//描画クラス
	Draw_image : null,

	//ゲームのメインループ　GUI部分　システム監視
	main : function(){
		/* GUI部分 */
		//領域の初期化
		GUI.image_context.clearRect(0, 0, image_layer.width, image_layer.height);
		GUI.string_context.clearRect(0, 0, image_layer.width, image_layer.height);

		//描画処理
		GUI.display_baddy_status();
		GUI.display_enemy_status();
		GUI.display_basis_images();
		GUI.display_mondai_sentences();

		/* システム監視 */
		//勝敗判定
		if(unit_management.your_baddy.hp <= 0 || unit_management.enemy.hp <= 0){
			CtoC.finish_game();
		}else {
			//再呼び出し
			setTimeout("GUI.main()", 18);
		}
	},

	preload_image : function(src){

	},

	common_initiate : function(){
		GUI.image_canvas = document.getElementById("image_layer");
		GUI.image_context = GUI.image_canvas.getContext("2d");

		GUI.string_canvas = document.getElementById("string_layer");
		GUI.string_context = GUI.string_canvas.getContext("2d");

		//unit_management.baddy.image = new Image();
		GUI.enemy = new Image();
		GUI.type_bar = new Image();

		GUI.Draw_image = new load_images(2);
		GUI.Draw_image.set_image(GUI.type_bar, "../image/frame01.png", 100, 200);
		GUI.Draw_image.set_image(GUI.enemy, unit_management.enemy.image, 25, 25);
		//GUI.Draw_image.set_image(unit_management.your_baddy.image, unit_management.your_baddy.image_src, 250, 25);

		GUI.Draw_image.carryout(GUI.Draw_image);
	},

	add_damage_effect : function(){
		//ダメージ発生時の処理
		/*
		var damage_que = new Array();
		damage_que.push();

		GUI.display_damage();
		*/
	},

	display_damage : function(damage_obj){
		//ダメージ継続（setTimeout）
		/*
		GUI.string_context.font = "14px 'ＭＳ Ｐゴシック'";
		GUI.string_context.fillStyle = "black";
		for(var i=0;i<damage_que.length;i++){
			GUI.string_context.fillText(damage_obj.value, 200, damage_obj.y);	//ここで座標（カウント）を持っているオブジェクトを渡す
		}

		setTimeout(myself);
		*/
	},


	display_basis_images : function(){
		GUI.Draw_image.display();
	},

	display_mondai_sentences : function(){
		GUI.string_context.font = "28px 'ＭＳ Ｐゴシック'";
		GUI.string_context.fillStyle = "blue";
		GUI.string_context.fillText(typing_mondai.command, 200, 350);


		GUI.string_context.font = "28px 'ＭＳ Ｐゴシック'";
		GUI.string_context.fillStyle = "black";
		GUI.string_context.fillText(typing_mondai.now_typing, 200, 350);

		GUI.string_context.font = "25px 'ＭＳ Ｐゴシック'";
		GUI.string_context.fillStyle = "red";
		GUI.string_context.fillText(typing_mondai.mean, 200, 250);		
	},

	display_enemy_status : function(){
		//エネミーのデータの表示
		GUI.string_context.font = "25px 'ＭＳ Ｐゴシック'";
		GUI.string_context.fillStyle = "black";
		GUI.string_context.fillText("Name : " + unit_management.enemy.name, 100, 50);

		GUI.string_context.font = "25px 'ＭＳ Ｐゴシック'";
		GUI.string_context.fillStyle = "black";
		GUI.string_context.fillText("HP : " + unit_management.enemy.hp, 100, 75);

		GUI.string_context.font = "25px 'ＭＳ Ｐゴシック'";
		GUI.string_context.fillStyle = "black";
		GUI.string_context.fillText("ATK : " + unit_management.enemy.atk, 100, 100);

		GUI.string_context.font = "25px 'ＭＳ Ｐゴシック'";
		GUI.string_context.fillStyle = "black";
		GUI.string_context.fillText("SPD : " + unit_management.enemy.spd, 100, 125);
	},

	display_baddy_status : function(){
		GUI.string_context.font = "25px 'ＭＳ Ｐゴシック'";
		GUI.string_context.fillStyle = "black";
		GUI.string_context.fillText("Name : " + unit_management.your_baddy.name, 400, 50);

		GUI.string_context.font = "25px 'ＭＳ Ｐゴシック'";
		GUI.string_context.fillStyle = "black";
		GUI.string_context.fillText("HP : " + unit_management.your_baddy.hp, 400, 75);

		GUI.string_context.font = "25px 'ＭＳ Ｐゴシック'";
		GUI.string_context.fillStyle = "black";
		GUI.string_context.fillText("ATK : " + unit_management.your_baddy.atk, 400, 100);

		GUI.string_context.font = "25px 'ＭＳ Ｐゴシック'";
		GUI.string_context.fillStyle = "black";
		GUI.string_context.fillText("SPD : " + unit_management.your_baddy.spd, 400, 125);
		
		GUI.string_context.font = "25px 'ＭＳ Ｐゴシック'";
		GUI.string_context.fillStyle = "red";
		GUI.string_context.fillText(CtoC.combo + " COMBO", 670, 50);

	},

	you_win : function(){

	},

	you_lose : function(){

	}

}


var unit_management = {
	your_baddy : null,
	enemy : null,
	create_baddy : function(){
		this.your_baddy = new Baddy();
		this.your_baddy.summon_piyomaru();
	},

	create_enemy : function(){
		this.enemy = new Enemy();
		this.enemy.summon_Qcon();
	},

	save_baddy_session : function(){

	}
}

/*戦闘システム
キーを打ったら攻撃 ->
ダメージ計算 -> 自分ATK/10
命中率　->　自分SPD/(相手SPD*2)

その他
ノーミスボーナス
コンボ補正
*/


var battle_system = {
	hit_judge : function(your_spd, enemy_spd){
		var hit_flg = 0;
		var hit_probability = your_spd / (enemy_spd * 2) * 100;
		var rnd = Math.floor(Math.random() * 100);
		//alert("確率："+hit_probability+"<br>数値："+rnd);
		if(hit_probability > rnd){
			hit_flg = 1;
		}

		return hit_flg;
	},

	damage_calculate : function(basis_atk){
		var damage = (basis_atk / 10);	//ダメージ計算式
		return damage;
	},

	unit_attack : function(attacker, target){
		var hit = battle_system.hit_judge(attacker.spd, target.spd);
		if(hit === 1){
			var damage = battle_system.damage_calculate(attacker.atk);

			target.take_damage(damage);
			//console.log(target.hp);
		}
	}
}

