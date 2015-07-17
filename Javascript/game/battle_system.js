//ゲーム終了処理を専門にした関数群
var state_watcher = {
	game_set : 0,
	vanishment : null,

	//役割　：　メインループを止めずに余分な処理を排除して遷移の準備をする
	//1:敵の攻撃を止める
	//2.敵の消失エフェクトをする
	//3:入力を止める？(いまのところやらない方向)
	watching_game_state : function(){
		//game_set == 1 -> 敵が死んでいる
		if(this.game_set === 1){
			//this.vanishment.carryout();
		}else{
			this.enemy_take_damage_animation();	//
			this.change_game_set_flg();	//敵の生死確認
		}

	},

	change_game_set_flg : function(){
		//ある意味アニメーションの分岐　-> 死：vanish 生：
		if(unit_management.enemy.hp <= 0){
			this.game_set = 1;	//戦闘が終了したことを示す。
			unit_management.enemy.alive = 0;
			//敵の攻撃を止める
			if(EnemyAttack){
				clearTimeout(EnemyAttack);
			}
			

			//蛍の光 @ここじゃなく遷移前
			audio_class.init("../sound/gameover.mp3", false);

			//消失エフェクト　エフェクト終了時にstate_flgを0にする
			this.vanishment = new Vanishment_effect();
		}else if(unit_management.your_baddy.hp <= 0){
			this.game_set = 1;	//戦闘が終了したことを示す。
			unit_management.your_baddy.alive = 0;
			//敵の攻撃を止める
			if(EnemyAttack){
				clearTimeout(EnemyAttack);
			}

			//消失エフェクト　エフェクト終了時にstate_flgを0にする
			this.vanishment = new Vanishment_effect();
		}
	},

	enemy_take_damage_animation : function(){
	},

	initiate_battle_state : function(){
		//state_watcher
		this.game_set = 0;
		this.vanishment = null;

		//GUI
		GUI.enemy = null;
		GUI.effect = null;
		GUI.damage = null;
		GUI.main_loop = null;

		//sound
		//なし

		//typing_mondai
		typing_mondai.mean = null;
		typing_mondai.command = null;
		typing_mondai.now_typing = "";

		//unit_management
		unit_management.enemy = null;

		//battle_system
		battle_system.accumulate_damage = 0;


	},

	transfer_dungeon : function(){
		//勝ち
		
		type_game_global.dungeon.defeated_monster.push(type_game_global.dungeon.encounting); 
		this.initiate_battle_state();
		console.log("探索モードへ");
		type_game_global.dungeon.main();

		//GUI.image_context.clearRect(0, 0, image_layer.width, image_layer.height);
		//GUI.string_context.clearRect(0, 0, image_layer.width, image_layer.height);

		//GUI.string_context.clearRect(0, 0, image_layer.width, image_layer.height);
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
	accumulate_damage : 0,

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
		damage = parseInt(damage);
		return damage;
	},

	unit_attack : function(attacker, target){
		console.log(attacker.name +"が"+ target.name +"に攻撃！");
		//var hit = battle_system.hit_judge(attacker.dex, target.dex);
		var hit = true;
		if(hit === true){
			var damage = battle_system.damage_calculate(attacker.atk);
			
			console.log(target.unit_type);
			if(target.unit_type === "enemy"){
				this.accumulate_damage += damage;

			}else {
				target.take_damage(damage);

			}
		}
	},

	baddy_slash : function(target){
		target.take_damage(this.accumulate_damage);

		//エフェクト処理
		var damage_str = new Damage_effect(this.accumulate_damage, 560, 200);
		GUI.damage.push(damage_str);

		GUI.effect.push(GUI.effect_data[0]);
		this.accumulate_damage = 0;

	}
}