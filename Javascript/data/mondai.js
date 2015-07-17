var t_mondai =  new Object();

t_mondai['debug'] = {
	0 : {
		'command' : 'aaaaaaaaaaaaaaaaaaaa',
		'meaning' : 'aaaaaaaaaaaaaaaaaaaa'
	}
}

t_mondai['cisco'] = {
	0 : {
		'command' : 'enable',
		'meaning' : '特権モードへ移動する'
	},

	1 : {
		'command' : 'enable password',
		'meaning' : 'イネーブルパスワードを設定する'
	},

	2 : {
		'command' : 'enable secret',
		'meaning' : 'イネーブルパスワードを暗号化する'
	},

	3 : {
		'command' : 'show running-config',
		'meaning' : 'コンフィグを表示する'
	},

	4 : {
		'command' : 'no shutdown',
		'meaning' : 'インターフェイスを立ち上げる'
	},

	5 : {
		'command' : 'show ip route',
		'meaning' : 'ルーティングテーブルを表示する'
	 },

	6 : {
		'command' : 'show clock',
		'meaning' : '時刻を表示する'
	 },

	7 : {
		'command' : 'show version',
		'meaning' : 'ルータのいろいろな情報を表示する'
	 },

	8 : {
		'command' : 'show logging',
		'meaning' : 'ルータが認識したイベントを表示する'
	 },
	 
	9 : {
		'command' : 'show arp',
		'meaning' : 'ARP cache（アープキャッシュ）を表示する'
	 },
	 
	10 : {	
		'command' : 'show flash',
		'meaning' : 'flashメモリ情報を表示する'
	},

	11 : {
		'command' : 'show environment',
		'meaning' : 'ルータのおかれた環境を表示する'
	},

	12 : {
		'command' : 'show processes cpu',
		 'meaning' : '各プロセスのcpu使用率を表示する'
	},

	13 : {
		'command' : 'show processes memory',	
		 'meaning' : '各プロセスのメモリを表示する'
	},

	14 : {
		'command' : 'show tech-support',
		 'meaning' : 'ルータのシステム情報を表示する'
	},

	15 : {
		'command' : 'show diag',
		 'meaning' : 'モジュール情報を表示する'
	},

	16 : {
		'command' : 'show cdp neighbors',
		 'meaning' : 'CDPを利用して隣接ルータの情報を確認する'
	},

	17 : {
		'command' : 'show interfaces',
		 'meaning' : 'インターフェイスの状態を表示する'
	},

	18 : {
		'command' : 'show ip interface brief',
		'meaning' : 'インターフェイスの状態をシンプルに表示する'
	},

	19 : {
		'command' : 'copy running-config startup-config',
		'meaning' : '現在の設定を保存する'
	},

	20 : {
		'command' : 'configure terminal',
		'meaning' : 'グローバルコンフィグレーションモードへ移動する'
	},

	21 : {
		'command' : 'terminal length 0',
		'meaning' : '表示する行の長さを決定する'
	},

	22 : {
		'command' : 'line vty 0 4',
		'meaning' : 'line vtyにパスワードを設定する'
	},

	23 : {
		'command' : 'logging x.x.x.x',
		'meaning' : 'ログサーバを指定'
	},

	24 : {
		'command' : 'logging buffered 8192 debugging',
		'meaning' : 'ログをバッファに入れるようにする'
	},

	25 : {
		'command' : 'ping x.x.x.x',
		'meaning' : 'x.x.x.x宛ての疎通確認をする'
	},

	26 : {
		'command' : 'ping',
		'meaning' : '疎通確認をする'
	},

	27 : {
		'command' : 'traceroute x.x.x.x',
		'meaning' : '通信経路の確認'
	},

	28 : {
		'command' : 'reload',
		'meaning' : 'ルータを再起動する'
	},

	29 : {
		'command' : 'clock timezone JST 9',
		 'meaning' : 'タイムゾーンを日本時間にする'
	},

	30 : {
		'command' : 'ip nat inside source static',
		'meaning' : '静的NATの設定'
	},

	31 : {
		'command' : 'ip nat inside source list 1 pool',
		'meaning' : '動的NATの設定'
	}
}

t_mondai['shonan'] = {
	0 : {
		'command' : 'aijonoushukukaju100',
		'meaning' : '愛情濃縮果汁100'
	},

	1 : {
		'command' : 'reggae sunamaha bigwave',
		'meaning' : 'レゲエ砂浜ビッグウェーブ'
	}
}

var mondai_class = {
	mondai : {},	//なんかここに問題を格納してる。
	//全ての問題をローカルストレージに格納する。
	putmondai : function(){
		var number = 0;
		try{
			//無限ループ。ただし問題が見つからない === undefined になるとループ外へthrowする。条件は保険。
			while(number < 100){
				console.log('loop'+number+'周目');
				
				if(t_mondai[number] === undefined){
					throw null;
				}
				//key:mn_[n], data:{json}　形式でローカルストレージへ保存。
				storage_class.put('mn_'+number, t_mondai[number]);
				number++;
			}
		}catch(e){
			console.log("ループを終了します"+number);
		}
	},

	//ローカルストレージに保存されている全ての問題を取り出す。
	getmondai : function(){
		var number = 0;
		mondai_class.mondai = new Array();
		try{
			//無限ループ。ただしストレージに該当問題が存在しない === null になるとループ外へthrowする。
			while(number < 100){
				console.log('loop'+number+'周目');
				//オブジェクト形式で問題を取得。
				mondai_class.mondai[number] = storage_class.get('mn_'+number);
				//ループ外へthrow
				if(mondai_class.mondai[number] === null){
					
					throw null;
				}
				number++;
			}
		}catch(e){
				console.log("ループを終了します"+number);
		}
		console.log("*通信");
	}
}
