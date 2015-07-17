//ストレージへのアクセス

var storage_class = {
	local_storage : null,

	// ウェブストレージの対応を調べる
	correspondence : function(){
		if(window.localStorage){
			// ローカルストレージオブジェクトを取得する
			storage_class.local_storage = window.localStorage;
			// 出力テスト
			console.log(storage_class.local_storage);
		}
	},

	ObjectToJson : function(obj){
		console.log('*ObjectToJsonを開始します。*');
		console.log('第一引数:'+obj+' [データ型]'+typeof obj);
		var str;
		if(typeof obj === 'object'){
			try{
				// オブジェクトからJSON文字列に変換
				str = JSON.stringify(obj);
				return str;
			}catch(e){
				console.log('エラーが発生しました。');
				return false;
			}
		}else {
			console.log('変換しません。');
			return obj;
		}

	},

	JsonToObject : function(a_json){
		console.log('*JsonToObjectを開始します。*');
		//暇があったらisJson関数実装してください。
		var translate = JSON.parse(a_json);
		return translate;
	},

	//JSON形式でのストレージへの保存
	put : function(a_key,a_data){
		console.log('*putを開始します。*');
		console.log('第一引数:'+a_key+' [データ型]'+typeof a_key);
		console.log('第二引数:'+a_data+' [データ型]'+typeof a_data);
		if(typeof a_key === 'string'){
			try{
				//書き込むデータをjson形式に変換する。
				var jsondata = storage_class.ObjectToJson(a_data);
				console.log('jsonに変換できました。');
				// JSON 文字列を保存(key, data)
				localStorage.setItem(a_key, jsondata);
				console.log('書き込みに成功しました。');
			}catch(e){
				console.log('書き込みに失敗しました。');
			}
		}
	},

	//データの取得
	get : function(a_key){
		console.log('*getを開始します。*');
		console.log('第一引数:'+a_key+' [データ型]'+typeof a_key);
		if(typeof a_key === 'string'){
			try{
				//json形式でデータを取り出す。
				var jsondata = localStorage.getItem(a_key);
				console.log(jsondata+'を読み込みました。'+typeof jsondata);

				// JSON文字列からオブジェクトに変換
				var objdata = storage_class.JsonToObject(jsondata);
				
				console.log('読み込みに成功しました。');
				return objdata;
			}catch(e){
				alert("読み込みに失敗しました。");
				return false;
			}
		}
		
	}
}


