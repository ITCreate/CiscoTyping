var GUI = {
	image_canvas : null,
	image_context : null,

	string_canvas : null,
	string_context : null,

	//Imageオブジェクト
	baddy : null,
	enemy : null,
	battle_system : null,
	effect_data : null,

	//待機中エフェクト
	effect : null,
	damage : null,

	//繰り返し
	main_loop : null,

	//ゲームのメインループ　GUI部分　システム監視
	main : function(){
		/* GUI部分 */
		//領域の初期化
		GUI.image_context.clearRect(0, 0, image_layer.width, image_layer.height);
		GUI.string_context.clearRect(0, 0, image_layer.width, image_layer.height);

		//描画処理
		GUI.image_context.globalAlpha = 0.5;
		GUI.battle_system.display(0, 0, 0);
		GUI.image_context.globalAlpha = 1;
		GUI.battle_system.display(1, 160, 250);

		//左アイコン描画
		GUI.battle_system.display(2, 20, 280, 2);
		GUI.battle_system.display(3, 20, 330, 2);
		GUI.battle_system.display(4, 20, 380, 2);

		//右アイコン描画
		GUI.battle_system.display(2, 660, 280, 2);
		GUI.battle_system.display(3, 660, 330, 2);
		GUI.battle_system.display(4, 660, 380, 2);

		/* システム監視 */
		//勝敗判定
		state_watcher.watching_game_state();

		//バディ
		GUI.display_my_baddy();
		GUI.display_enemy();
		GUI.image_context.globalAlpha = 1;
		//各文字の表示
		GUI.display_baddy_status();
		GUI.display_enemy_status();
		GUI.display_mondai_sentences();


		//エフェクトの表示
		var j = 0;
		//console.log(GUI.effect[j]);
		while(GUI.effect[j] !== undefined){
			GUI.display_effect(j);
			j++;
		}

		//ダメージの表示
		var i = 0;
		while(GUI.damage[i] !== undefined){
			GUI.display_damage(GUI.damage[i], i); 
			i++;
		}

		//再呼び出し
		if(type_game_global.state_flg === 1){
			GUI.main_loop = setTimeout("GUI.main()", 18);
		}
			
		
	},

	display_damage : function(damage_obj, index){
		damage_obj.effect(damage_obj, index);
	},

	display_effect : function(index){
		console.log("　****** 攻撃エフェクトの開始！ ***** ");
		GUI.effect[index].image_loader.display(GUI.effect[index], index);
	},

	common_initiate : function(){
		console.log("GUIの初期設定を開始します。");
		GUI.damage = new Array();
		GUI.effect = new Array();
	},

	display_my_baddy : function(){
		if(state_watcher.game_set === 1 && unit_management.your_baddy.alive === 0){
			state_watcher.vanishment.carryout();
		}
		unit_management.unit_images.display(unit_management.your_baddy.src, 250 - (unit_management.unit_images.loadedimages_que[unit_management.your_baddy.src].width)*1.5, 250 - (unit_management.unit_images.loadedimages_que[unit_management.your_baddy.src].height)*3, 2, true);
		GUI.image_context.globalAlpha = 1;
	},

	display_enemy : function(){
		if(state_watcher.game_set === 1 && unit_management.enemy.alive === 0){
			state_watcher.vanishment.carryout();
		}
		unit_management.unit_images.display(unit_management.enemy.src, 600 - (unit_management.unit_images.loadedimages_que[unit_management.enemy.src].width)*1.5, 250 - (unit_management.unit_images.loadedimages_que[unit_management.enemy.src].height)*3, 2);
		GUI.image_context.globalAlpha = 1;
	},

	display_mondai_sentences : function(){
		if(unit_management.your_baddy.mode !== "blind"){
			GUI.string_context.font = "32px 'Small Fonts'";
			GUI.string_context.fillStyle = "gray";
			GUI.string_context.fillText(typing_mondai.command, 200, 380);
		}
		
		GUI.string_context.font = "32px 'Small Fonts'";
		GUI.string_context.fillStyle = "black";
		GUI.string_context.fillText(typing_mondai.now_typing, 200, 380);

		GUI.string_context.font = "25px 'ＭＳ Ｐゴシック'";
		GUI.string_context.fillStyle = "black";
		GUI.string_context.fillText(typing_mondai.mean, 200, 300);		
	},

	display_enemy_status : function(){
		//エネミーのデータの表示
		GUI.string_context.font = "32px 'Small Fonts'";
		GUI.string_context.fillStyle = "black";
		GUI.string_context.fillText(unit_management.enemy.name, 500, 90);
		
		GUI.string_context.font = "32px 'Small Fonts'";
		GUI.string_context.fillStyle = "black";
		GUI.string_context.fillText(unit_management.enemy.hp, 720, 310);

		GUI.string_context.font = "32px 'Small Fonts'";
		GUI.string_context.fillStyle = "black";
		GUI.string_context.fillText(unit_management.enemy.atk, 720, 360);

		GUI.string_context.font = "32px 'Small Fonts'";
		GUI.string_context.fillStyle = "black";
		GUI.string_context.fillText(unit_management.enemy.dex, 720, 410);
	},

	display_baddy_status : function(){
		GUI.string_context.font = "32px 'Small Fonts'";
		GUI.string_context.fillStyle = "black";
		GUI.string_context.fillText(unit_management.your_baddy.name, 160, 90);

		GUI.string_context.font = "32px 'Small Fonts'";
		GUI.string_context.fillStyle = "black";
		GUI.string_context.fillText(unit_management.your_baddy.hp, 80, 310);

		GUI.string_context.font = "32px 'Small Fonts'";
		GUI.string_context.fillStyle = "black";
		GUI.string_context.fillText(unit_management.your_baddy.atk, 80, 360);

		GUI.string_context.font = "32px 'Small Fonts'";
		GUI.string_context.fillStyle = "black";
		GUI.string_context.fillText(unit_management.your_baddy.dex, 80, 410);
		
		GUI.string_context.font = "25px 'Small Fonts'";
		GUI.string_context.fillStyle = "red";
		GUI.string_context.fillText(CtoC.combo + " COMBO", 30, 250);

	}
}

var sounds = {
	system : null,

	sound_initiate : function(){
		this.system = new WebAudioAPI_kai();
		this.system.init();
		this.system.set_sound("../sound/sound/keydown.mp3");
		this.system.set_sound("../sound/sound/mistake.mp3");
		this.system.set_sound("../sound/sound/marvelous.mp3");
		this.system.loadSound(this.system);
	}
}


