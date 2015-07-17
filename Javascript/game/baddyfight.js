var battle_unit = function(){
	this.unit_type;
	this.name;
	this.image_loader;	//ここに全画像含む画像処理のクラスがはいる
	this.image;	//現在表示中のスプライトの番号
	this.src_que;
	this.hp;
	this.atk;
	this.spd;
	this.alive;

	this.take_damage = function(damage){
		this.hp -= damage;
	}
}



var Enemy = function(number){
	battle_unit.call(this);
	this.prototype =  new battle_unit();

	//Enemy固有ステータス
	this.attack_frequency;
	this.skill;
	this.attack
	//this.attack_loop;

	//基礎ステータスの設定
	this.unit_type = "enemy";

	this.id = baddy_db[number]['id'];
	this.name = baddy_db[number]['name'];
	this.hp = baddy_db[number]['hp'];
	this.atk = baddy_db[number]['atk'];
	this.dex = baddy_db[number]['dex'];
	this.alive = 1;

	this.src = number;

	this.attack = function(myself, target){
		console.log("敵の攻撃！");
		battle_system.unit_attack(myself, target);
		var next_attack =  5000 - this.dex * 40;
		if(type_game_global.state_flg === 1){
			EnemyAttack = setTimeout(function(){myself.attack(myself, target)}, next_attack);
		}else if(type_game_global.state_flg === 0){
		}
	}

}

var Baddy = function(number){
	battle_unit.call(this);
	this.prototype =  new battle_unit();

	//基礎ステータスの設定
	this.unit_type = "baddy";

	this.name = baddy_db[number]['name'];
	this.hp = baddy_db[number]['hp'];
	this.atk = baddy_db[number]['atk'];
	this.dex = baddy_db[number]['dex'];

	this.qtype = baddy_db[number]['type'];
	this.mode = baddy_db[number]['mode'];

	this.alive = 1;

	//this.display_neutral();
	this.src= number;
}




var skill_translater = function(owner, num, sequence){
	switch(num){
		case 0:
		owner.combo_bonus_skill[sequence] = new skill_burnning();
		break;

		case 1:
		owner.combo_bonus_skill[sequence] = new skill_icestorm();
		break;

		default:
		owner.combo_bonus_skill[sequence] = new skill_none();
		break;
	}
}




