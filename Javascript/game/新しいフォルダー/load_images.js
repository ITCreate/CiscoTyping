var load_images = function(number){
	this.amount_images = number;	//読みたい画像の数
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

	this.set_image = function(obj, src, x, y){
		this.preload_que.push(obj);
		this.image_src.push(src);
		this.image_x.push(x);
		this.image_y.push(y);
	}

	this.carryout = function(base){
		//alert(this.preload_que[this.count_loadedimages]);
		this.preload_que[this.count_loadedimages].addEventListener('load', function(){
			
			base.loadedimages_que.push(base.preload_que[base.count_loadedimages]);	//pushは要素数ごと増やす
			base.count_loadedimages++;
			if(base.amount_images  == base.count_loadedimages){
				base.display();
			}else{
				base.carryout(base);
			}
		}, false);
		//alert(this.image_src[this.count_loadedimages]);
		
		this.preload_que[this.count_loadedimages].src = this.image_src[this.count_loadedimages];
	}

	//
	this.display = function(){
		for(var i=0;i<this.loadedimages_que.length;i++){
			GUI.image_context.drawImage(this.loadedimages_que[i], this.image_x[i], this.image_y[i]);
		}
	}

	this.regeneration = function(){
		//いらない？
	}


	this.show_array1 = function(){
		for(var i=0;i<this.preload_que.length;i++){
			console.log(this.preload_que[i]);
		}
		
	}

	this.show_array2 = function(){
		for(var i=0;i<this.loadedimages_que.length;i++){
			console.log(this.loadedimages_que[i]);
		}
		
	}
}


