var Dungeon = function(){
	this.name;
	this.floor = 0;
	this.battle = 4;
	//エンカウント関係
	this.encounting = 0;	//現在エンカウント中の敵
	this.encount_monster = [
		3,4,5,6
	];
	this.boss = 7;
	
	//キャプチャー関係
	this.defeated_monster = new Array();
	
	this.initiate_dungeon = function(){
	}

	this.main = function(){
		console.log("散策中...");
		this.floor++;
		if(this.floor > this.battle || unit_management.your_baddy.alive === 0){
			this.capture();
			
		}else{
			
			type_game_global.state_flg = 0;

			//イベントの発生
			this.enemy_encount();
		}
		
	}

	this.enemy_encount = function(){
		if(this.floor === this.battle){
			//Boss
			this.encounting = this.boss;
			
		}else{
			//通常
			console.log("aa"+this.encount_monster.length);
			var rnd = Math.floor(Math.random() * (this.encount_monster.length));
			this.encounting = this.encount_monster[rnd];
		}
		
		initiate_state();
	}

	this.capture = function(){
		var rnd = Math.floor(Math.random() * this.defeated_monster.length);
		if(this.defeated_monster[rnd] === null){
			load_html("gacha.html");
		}else{
			var param = {
    			"get" : this.defeated_monster[rnd]
  			};
  			console.log("******"+param['get']);
    		//ajaxでの送信
			$.ajax({
				type: "post",
				url: "../HTML/php/getmonster.php",
				data: JSON.stringify(param),
				crossDomain: false,
				dataType : "jsonp",
				scriptCharset: 'utf-8',
			}).done(function(data){
				PHP_Reception['guide'][data['get']] = 1;
				load_html("../HTML/gacha.php");
			}).fail(function(XMLHttpRequest, textStatus, errorThrown){
				alert(errorThrown);
			});	

		}
	}


}
