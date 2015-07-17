var load_objects = function(number){
	this.amount_objects = number;	//読みたい画像の数
	this.count_loadedobjects = 0;	//読み込み終わった画像の数

	this.preload_que = null;		//読み込み前の待ち画像行列
	this.loadedobjects_que = null;	//読み終わった表示待ち行列

	this.objects_x = null;	//画像のx座標（配列）
	this.objects_y = null;	//画像のy座標（配列）
	this.objects_species = null;	//オブジェクトの種類　：　0:画像　1:文字  
	this.string_font = null;
	this.string_style = null;

	//ここから初期化
	this.preload_que = new Array();
	this.loadedobjects_que = new Array();
	this.objects_x = new Array();
	this.objects_y = new Array();
	this.objects_species = new Array();
	this.string_font = new Array();
	this.string_style = new Array();

	this.set_image = function(src, x, y){
		this.preload_que.push(src);
		this.objects_x.push(x);
		this.objects_y.push(y);
		this.objects_species.push(0);
	}

	this.set_text = function(str, x, y, font, style){
		this.preload_que.push(str);
		this.objects_x.push(x);
		this.objects_y.push(y);
		this.objects_species.push(1);
		this.string_font.push(font);
		this.string_style.push(style);
	}

	this.carryout = function(base){
		if(this.objects_species[this.count_loadedobjects] == 0){
			var Obj = new Image();

			Obj.addEventListener('load', function(){
				base.loadedobjects_que.push(Obj);	//pushは要素数ごと増やす
				base.count_loadedobjects++;

				if(base.amount_objects  == base.count_loadedobjects){
					base.display();
				}else{
					base.carryout(base, base.count_loadedobjects);
				}
			}, false);

			Obj.src = base.preload_que[base.count_loadedobjects];

			
		}else if(this.objects_species[this.count_loadedobjects] == 1){
			this.loadedobjects_que.push(this.preload_que[base.count_loadedobjects]);
			this.count_loadedobjects++;

			if(this.amount_objects == this.count_loadedobjects){
				this.display();
			}else{
				this.carryout(base, this.count_loadedobjects);
			}
		}else {
			colsole.log("予期せぬ動作をしています。");
		}

	}


	//
	this.display = function(){

		while(this.loadedobjects_que.length > 0){
			if(this.objects_species[0] == 0){
				GUI.context.drawImage(this.loadedobjects_que[0], this.objects_x[0], this.objects_y[0]);
				this.loadedobjects_que.splice(0, 1);	//0番目から1つの要素を削除。そして前に詰める。
				this.objects_x.splice(0, 1);
				this.objects_y.splice(0, 1);
				this.objects_species.splice(0, 1);
			}else if(this.objects_species[0] == 1){
				GUI.context.font = this.string_font[0];
				GUI.context.fillStyle = this.string_style[0];
				GUI.context.fillText(this.loadedobjects_que[0], this.objects_x[0], this.objects_y[0]);
				this.loadedobjects_que.splice(0, 1);
				this.objects_x.splice(0, 1);
				this.objects_y.splice(0, 1);
				this.string_style.splice(0, 1);
				this.string_font.splice(0, 1);
				this.objects_species.splice(0, 1);
			}

		}

	}

	this.show_array1 = function(){
		for(var i=0;i<this.preload_que.length;i++){
			console.log(this.preload_que[i]);
		}
		
	}

	this.show_array2 = function(){
		for(var i=0;i<this.loadedimages_que.length;i++){
			console.log(this.loadedobjects_que[i]);
		}
		
	}

}