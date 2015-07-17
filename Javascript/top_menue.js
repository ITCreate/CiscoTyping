//メニュー画面で表示パネルをスイッチする汎用関数
menu_switch = function(now, next){
	try{
		//現在の表示要素のIDを取得(クリック先の親要素)
		var current_screen = $(now).parent().parent().get(0);
		var show_target = $('#'+next).get(0);
		console.log('現在の表示：　'+current_screen);
		console.log('次の表示：　'+show_target.id);

		$(show_target).show();
		$(current_screen).hide();
		console.log('遷移しました。');
	}catch(e){
		console.log('遷移に失敗しました。');
	}
}

//コールバックの無い読み込み関数
load_html = function(a_html){
	try{
		$("#gameframe").load(a_html, function(){
			//時間があったらコールバックちゃんとしてください。
			console.log("読み込みました。");
		});
	}catch(e){
		console.log("読み込みに失敗しました。");
	}
}

//コールバックのある読み込み関数。ゲームモードに移行。
gototyping = function(a_html){
	try{
		$("#gameframe").load(a_html, function(){
			//時間があったらコールバックちゃんとしてください。
			console.log("読み込みました。");

		});
	}catch(e){
		console.log("読み込みに失敗しました。");
	}
}

function studymode_select(){
	var dom2 = document.getElementById("study_typing_game");
	dom2.style.display = "block";
}

function weakpoint_select(){
	var dom2 = document.getElementById("weak_point");
	dom2.style.display = "block";
}

function information_to_modoru(){
	var dom1 = document.getElementById("information_wrap");
	var dom2 = document.getElementById("index_wrap");
	dom1.style.display = "none";
	dom2.style.display = "block";
}




function study_mode(){
	var dom1 = document.getElementById("index_wrap");
	var dom2 = document.getElementById("study_modeselect_wrap");
	dom1.style.display = "none";
	dom2.style.display = "block";
	command_display();
	
}
