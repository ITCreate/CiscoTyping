function initiate_state(){
	var success = 0;
	console.log("１ゲームの初期化中です...");
	switch(type_game_global.initiate_counter){
		case 0:
		//状態を「バトル」に
		type_game_global.state_flg = 1;

		//BGMを変更
		audio_class.init("../sound/normal.mp3", true);
		type_game_global.initiate_counter++;
		GUI.common_initiate();
		break;

		case 1: 	//ゲーム開始！
		//エネいー
		unit_management.create_enemy();

		//文字の入力判定の設定	
		CtoC.initiate_section();
		
		//GUIメインループの起動
		GUI.main();
console.log("a");
		//敵の攻撃開始
		console.log("***************** 敵の攻撃開始 *****************");
		EnemyAttack = setTimeout(function(){
			unit_management.enemy.attack(unit_management.enemy, unit_management.your_baddy);
		}, 5000 - unit_management.enemy.dex * 40);

		success = 1;
		type_game_global.initiate_counter = 0;
		break;

		default : //フラグの設定ミスの場合ここへ
			console.log("********* 読み込みが完全に完了できなかったので強制的に開始します **********");
			/*
			if(){
				type_game_global.initiate_counter = 1;
			}*/
		break;
	}

	if(success !== 1){
		var repeat =  setTimeout(function(){initiate_state()}, 16);
	}
	
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
		console.log("mean : " + this.mean);
		console.log("command : " + this.command);
	}
}

var CtoC = {
	combo : 0,

	initiate_section : function(){
		//ランダムに問題を生成。
		var rnd = Math.floor(Math.random() * (Object.keys(t_mondai[unit_management.your_baddy.qtype]).length - 1));
		console.log(Object.keys(t_mondai['cisco']).length);
		typing_mondai.set_mondai(t_mondai[unit_management.your_baddy.qtype][rnd]['meaning'], t_mondai[unit_management.your_baddy.qtype][rnd]['command']);
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

	next_char : function(evt,kc){
		var chr = CtoC.trans_specialchar(kc);

		//入力文字の正誤判定
		var tf = CtoC.check_correspond(chr, typing_mondai.now_typing.length);

		//この問題をクリアしたか判定(全文字入力済み)
		if(typing_mondai.command.length <=  typing_mondai.now_typing.length){
			console.log("Go Next Q.");
			sounds.system.playSound(2);
			if(type_game_global.state_flg === 1){
				battle_system.baddy_slash(unit_management.enemy);

				CtoC.initiate_section();
			}
			
		}
		//alert(typing_mondai.command.length+"/"+typing_mondai.now_typing.length);
	},

	check_correspond : function(input_char, num){
		var true_or_faulse = 0;
		var target_char = typing_mondai.command.charAt(num).toUpperCase();	//正解文字

		if(input_char === target_char){
			true_or_faulse = 1;
			typing_mondai.now_typing += input_char;
			sounds.system.playSound(0);
			console.log("good : " + input_char);
			CtoC.combo++;
			battle_system.unit_attack(unit_management.your_baddy, unit_management.enemy);
		}else{
			console.log("boo :");
			typing_mondai.show_mondai();
			sounds.system.playSound(1);
			CtoC.combo = 0;
		}

		return true_or_faulse;
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


}

