// スタディモードの記述
function command_display(){
	document.getElementById("study_modeselect_wrap").innerHTML ='<div id="titlelogo">Cisco Command Typing </div>'+
	'<div class="menubar_back" onclick="study_to_modoru()">←</div>'+
	'<div id="out_Div">'+
 				'<div id="in_Div">'+
				'<table id = "sclTbl">'+
				'<thead>'+
				'<tr>'+
					'<th class = "coL0">コマンド名</th>'+
					'<th class = "coL1">コマンドの意味</th>'+
					'<th class = "coL2">使用例</th>'+
				'</tr>'+
				'</thead>'+
				'<tbody>'+
				'<tr>'+
					'<td class = "command_name">enable</td></div>'+
					'<td class = "command_mean">特権モードへ移行する</td>'+
					'<td class = "example_action">あああああああ</td>'+
				'<tr>'+
					'<td class = "command_name">enable password</td>'+
					'<td class = "command_mean">特権モードへのパスワードを設定する</td>'+
					'<td class = "example_action">aaaaaa</td>'+
				'</tr>'

	;
}
