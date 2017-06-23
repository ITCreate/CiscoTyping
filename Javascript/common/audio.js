audio_class = {
	audio : null,

	init : function(a_src, a_loop){
		if(this.audio != null){
			console.log("多重演奏を強制敵に終了させました。");
			this.audio.pause();
		}
		console.log("audio initを開始します。");
		 // Audioオブジェクト作成
  		this.audio = new Audio("");
  		// load()直後に再生しないようにautoplayをfalseに設定
  		if(typeof a_loop !== 'boolean'){
  			console.log("第二引数が不正です。　typeof: "+typeof a_loop);
  		}
  		this.audio.autoplay = false;
  		// Audioファイルのアドレス指定
  		this.audio.src = a_src;
  		//ループ
  		this.audio.loop = a_loop;
  		//オーディオのロード
  		this.audio.load();
	},

	play : function(){

		this.audio.play();
	},

	//一時停止
	pause : function(){  
	  	this.audio.pause();
	},

	seek_src : function(){
		var str = this.audio.src;
		var trim = str.lastIndexOf('/') + 1;
		var output = str.substr(trim);
		//console.log(output);
	}
}



/*
ブラウザで音源を鳴らすためのAPIをクラス化

メソッド一覧
init() :
*/


function WebAudioAPI(name) {
this.name = name;
  root = this;
  root.context;
  root.dogBarkingBuffer = null;
  root.source;
  root.gainNode;
  root.request;

  root.init = function(){
      try{
        var s = window.AudioContext || window.webkitAudioContext
        root.context = new s
        //alert("initiarize complete.");
      }
      catch(e){
        alert('Web Audio API is not supported in root browser');
      }
  }

  root.loadSound = function(src, base){
    root.request = new XMLHttpRequest(); //この　XMLHttpRequestが音楽データを取得するメソッドとなる
                                        //(jQueryの$.ajax()はレスポンスのデータタイプ ArrayBuffer に対応していない)
    root.request.open('GET', src, true);   //ここに読み込むファイルを記述
    root.request.responseType = 'arraybuffer'; //一般的な固定長のバイナリデータのバッファを示すために使われるデータタイプ

    // 非同期的にデコード
    //request()が読まれた時
    //取得した音源をAudioContextを用いてデコードし、AudioBufferNodeを生成する
    root.request.onload = function() {
    	base.context.decodeAudioData(base.request.response, function(buffer) {//decodeAudioDataが完了したらコールバック関数として実行される
        	base.dogBarkingBuffer = buffer;
        	type_game_global.state++;
        	
        	//base.playSound();
      	}); //コールバック関数の処理：デコード済みのPCMデータbufferを受け取り、AudioBufferとして格納。
    }
    root.request.send(); //サーバに HTTP リクエストを送信する。送信先の URL、送信方式（GET や POST など）は、open で指定したものになる。データを送信しない時でも必要で、その時は send(null) とする。
    //alert("load completed.");
  }

  root.playSound = function(){
      if(!root.context.createGain){
        root.context.createGain = root.context.createGainNode;
      }
      root.gainNode = root.context.createGain();
      root.source = root.context.createBufferSource(); // バッファソースの作成

      root.source.buffer = root.dogBarkingBuffer;          // tell the source which sound to play
      root.source.connect(root.gainNode);

      //gainnode関係の処理
      root.gainNode.connect(root.context.destination); 

      if (!root.source.start){
        root.source.start = root.source.noteOn(0);
      }
      root.source.start(0);
                               // play the source now
      //source.loopとかもある
  }

  root.changeVolume = function(va) {
    var fraction = parseInt(va) / parseInt(64);
    root.gainNode.gain.value = fraction * fraction;
  }

  root.stop = function() {
    //alert("ok");
    if(!root.source.stop){
      root.source.stop = source.noteOff;  
    }
    root.source.stop(0);
  }

/*
URLにアクセスして音源(たとえばoggファイル)を取得する
取得した音源をAudioContextを用いてデコードし、AudioBufferNodeを生成する
AudioContextからAudioBufferSourceNodeを生成し、AudioBufferNodeや再生オプションを設定する
AudioDestinationNodeにAudioBufferSourceNodeを接続し、音楽を出力(nodeOn())する
*/
//AudioContextによりデコード
}




function WebAudioAPI_kai(){
  root = this;

  root.context;
  root.preload_que = new Array();
  root.dogBarkingBuffer = new Array(9);
  root.source;
  root.gainNode;
  root.request;
  root.count = 0;

  root.init = function(){
      try{
        root.context  = window.AudioContext || window.webkitAudioContext
        
        root.request = new XMLHttpRequest(); //この　XMLHttpRequestが音楽データを取得するメソッドとなる
        //alert("initiarize complete.");
      }
      catch(e){
        alert('Web Audio API is not supported in root browser');
      }
  }

  root.set_sound = function(src){
    root.preload_que.push(src);
  } 


  root.loadSound = function(base){
                                                  //(jQueryの$.ajax()はレスポンスのデータタイプ ArrayBuffer に対応していない)
    root.request.open('GET', root.preload_que[root.count], true);   //ここに読み込むファイルを記述
    root.request.responseType = 'arraybuffer'; //一般的な固定長のバイナリデータのバッファを示すために使われるデータタイプ
    // 非同期的にデコード
    //request()が読まれた時
    //取得した音源をAudioContextを用いてデコードし、AudioBufferNodeを生成する
    root.request.onload = function() {
      var audioCtx = new base.context;
      audioCtx.decodeAudioData(base.request.response).then(function(buffer) {//decodeAudioDataが完了したらコールバック関数として実行される
          base.dogBarkingBuffer[base.count] = buffer;
          base.count++;
          if(base.count === base.preload_que.length){
            type_game_global.initiate_counter++;
          }else {
            
            base.loadSound(base);
          }
          
          //base.playSound();
        }); //コールバック関数の処理：デコード済みのPCMデータbufferを受け取り、AudioBufferとして格納。
    }
    root.request.send(); //サーバに HTTP リクエストを送信する。送信先の URL、送信方式（GET や POST など）は、open で指定したものになる。データを送信しない時でも必要で、その時は send(null) とする。
    //alert("load completed.");
  }

  root.playSound = function(n){
      if(!root.context.createGain){
        root.context.createGain = root.context.createGainNode;
      }
      root.gainNode = root.context.createGain();
      root.source = root.context.createBufferSource(); // バッファソースの作成

      root.source.buffer = root.dogBarkingBuffer[n];          // tell the source which sound to play
      root.source.connect(root.gainNode);

      //gainnode関係の処理
      root.gainNode.connect(root.context.destination); 

      if (!root.source.start){
        root.source.start = root.source.noteOn(0);
      }
      root.source.start(0);
                               // play the source now
      //source.loopとかもある
  }

  root.changeVolume = function(va) {
    var fraction = parseInt(va) / parseInt(64);
    root.gainNode.gain.value = fraction * fraction;
  }

  root.stop = function() {
    //alert("ok");
    if(!root.source.stop){
      root.source.stop = source.noteOff; 
    }
    root.source.stop(0);
  }

/*
URLにアクセスして音源(たとえばoggファイル)を取得する
取得した音源をAudioContextを用いてデコードし、AudioBufferNodeを生成する
AudioContextからAudioBufferSourceNodeを生成し、AudioBufferNodeや再生オプションを設定する
AudioDestinationNodeにAudioBufferSourceNodeを接続し、音楽を出力(nodeOn())する
*/
//AudioContextによりデコード
}