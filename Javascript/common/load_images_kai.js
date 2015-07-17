var load_images = function(){
	this.amount_images = 0;	//読みたい画像の数
	this.count_loadedimages = 0;	//読み込み終わった画像の数

	this.preload_que = null;		//読み込み前の待ち画像行列
	this.loadedimages_que = null;	//読み終わった表示待ち行列

	this.image_src = null;		//パス（配列）
	this.image_x = null;	//画像のx座標（配列）
	this.image_y = null;	//画像のy座標（配列）

	//ここから初期化
	this.preload_que = new Array();
	this.loadedimages_que = new Array();
	this.image_src = new Array();
	this.image_x = new Array();
	this.image_y = new Array();

	//キューにパスを入れる
	this.set_pass = function(src){
		this.image_src.push(src);
		this.amount_images++;
	}

	this.load_que_successive = function(base){
		//console.log("ロードカウント　：" + this.count_loadedimages);
		this.preload_que[this.count_loadedimages] = new Image();

		//alert(this.preload_que[this.count_loadedimages]);
		this.preload_que[this.count_loadedimages].addEventListener('load', function(){
			
			base.loadedimages_que.push(base.preload_que[base.count_loadedimages]);	//pushは要素数ごと増やす
			base.count_loadedimages++;
			if(base.amount_images  == base.count_loadedimages){
				type_game_global.initiate_counter++;
			}else{
				base.load_que_successive(base);
			}
		}, false);
		//alert(this.image_src[this.count_loadedimages]);
		console.log("ロード開始... " + this.preload_que + "　の"　+ this.count_loadedimages + "番目の画像");
		this.preload_que[this.count_loadedimages].src = this.image_src[this.count_loadedimages];
	}

	
	this.display = function(n, x, y, scale, inverse){
		//alert(this.loadedimages_que);
		try {
			if(arguments.length === 5){
				if(inverse === true){
					//GUI.image_context.drawImage(this.loadedimages_que[n], x, y, this.loadedimages_que[n].width * scale, this.loadedimages_que[n].height * scale);
					GUI.image_context.scale(-1,1);
					GUI.image_context.drawImage(this.loadedimages_que[n], -x, y, -this.loadedimages_que[n].width * scale, this.loadedimages_que[n].height * scale);
					GUI.image_context.scale(-1,1);
				}else{
					console.log("ERROR");
				}
				
			}else if(arguments.length === 4){
				GUI.image_context.drawImage(this.loadedimages_que[n], x, y, this.loadedimages_que[n].width * scale, this.loadedimages_que[n].height * scale);
			}else if(arguments.length === 3){
				GUI.image_context.drawImage(this.loadedimages_que[n], x, y);
			}

			
		}catch(e){
			console.log("*************** ERROR **************");
			console.log("n : " + n +
				"\nthis :" + this +
				"\nthis.loadedimages_que[n]" + this.loadedimages_que);
		}
		
	}

	this.show_array1 = function(){
		for(var i=0;ithis.preload_que.length;i++){
			console.log(this.preload_que[i]);
		}
		
	}

	this.show_array2 = function(){
		for(var i=0;ithis.loadedimages_que.length;i++){
			console.log(this.loadedimages_que[i]);
		}
		
	}
}

/***************************************************************/

var unit_load_images = function(){
	load_images.call(this);
	this.prototype =  new load_images();


}

/**************************************************************/

var load_animation = function(){
	load_images.call(this);
	this.prototype =  new load_images();

	this.count = 0;
	this.frame = 0;

	this.display = function(effect_obj, index){

		var trim_x = (this.frame % 5)*50;	//トリム開始x
		var trim_y = Math.floor(this.frame / 5)*50;	//トリム開始y
		var trim_w = 50;	//トリム幅
		var trim_h = 50;	//トリム高さ
		//console.log(trim_x +", "+trim_y);
		if(this.frame < effect_db[effect_obj.id]['frame']){
			GUI.image_context.drawImage(this.loadedimages_que[0], trim_x, trim_y, trim_w, trim_h, 300, 70, 150, 200);
			this.count++;
			
			if(this.count === effect_db[effect_obj.id]['frame_time'][this.frame]){
				this.frame++;
				this.count = 0;
			}
		}else {
			this.frame = 0;
			this.count = 0;

			GUI.effect.splice(index)
		}
	}
}