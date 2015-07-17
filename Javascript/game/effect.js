var Effect = function(num){
	this.id = num;
	this.image_loader;

	this.preload_my_images = function(){
		this.image_loader = new load_animation();

		console.log(effect_db[this.id]['sprite'] +"の画像をセット");
		this.image_loader.set_pass(effect_db[this.id]['sprite']);
		
		//画像の読み込みを開始
		this.image_loader.load_que_successive(this.image_loader);
	}
}

//敵が死ぬ間際消えるやつ
var Vanishment_effect = function(){
	this.vanish_count = 0;

	this.carryout = function(){
		GUI.image_context.globalAlpha = 1 - this.vanish_count / 30;
		this.vanish_count++;
		if(this.vanish_count > 30){
			type_game_global.state_flg = 0;
			this.vanish_count = 0;
			clearTimeout(GUI.main_loop);
			setTimeout(function(){
				state_watcher.transfer_dungeon();
			}, 1000);
			
		}
	}
}

//ダメージ発生時に相手が動くやつ
var take_damage_enemy = function(){
	this.count = 0;

	this.carryout = function(){
		
		if(this.count > 30 && this.count < 60){
			GUI.image_context.globalAlpha = 0;

		}
		this.count++;
	}
}



//ダメージが可視化できるやつ
var Damage_effect = function(damage, x, y){
	this.damage = damage; 
	this.count = 0;
	this.init_x = x;
	this.init_y = y;

	this.effect = function(myself, index){
		GUI.string_context.font = "32px 'Small Fonts'";
		GUI.string_context.fillStyle = "black";
		this.x = this.init_x;
		this.y = this.init_y - 50 * Math.sin(Math.PI*this.count*9/180);
		GUI.string_context.fillText(this.damage, this.x, this.y);
		if(this.count > 20){
			GUI.damage.splice(index);

		}else{
			this.count++;	
		}
		
	}

}


