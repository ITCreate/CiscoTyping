<script type="text/javascript">
var farm = {
	'my_baddy' : null
};

var farm_func = {
	registration : function(){
		if(farm['my_baddy'] === null){
			alert("バディを選択してくれ！");
			return;
		}
   		var param = {
    		"baddy" : farm['my_baddy']
  		};

    	//ajaxでの送信
		$.ajax({
			type: "post",
			url: "php/farm_registration.php",
			data: JSON.stringify(param),
			crossDomain: false,
			dataType : "jsonp",
			scriptCharset: 'utf-8',
		}).done(function(data){
			alert("ｵｯｽオラ悟空、よろしくな！");
			PHP_Reception['baddy'] = data;
			//$("#sousin").css("display","inline");
		}).fail(function(XMLHttpRequest, textStatus, errorThrown){
			alert(errorThrown);
			//$("#sousin").css("display","inline");
		});	
	}
}

<?php
session_start();
for($i=0;$i<8;$i++){
	if($_SESSION['guide'][$i] == 1){ 
		echo '$(".list_cell").eq('.$i.').append("<img src=\'../image/monster/'.$i.'.png\' />");';
		echo  '$(".list_cell").eq('.$i.').click(function(){
				$("#pv_name").text(baddy_db['.$i.'][\'name\']);
				$("#pv_hp").text(baddy_db['.$i.'][\'hp\']);
				$("#pv_str").text(baddy_db['.$i.'][\'atk\']);
				$("#pv_dex").text(baddy_db['.$i.'][\'dex\']);
				$("#pv_image img").attr("src", "../image/monster/'.$i.'.png");
				farm[\'my_baddy\'] = '.$i.';
		});';
	}
}
?>


</script>
<style>
#baddy_list {
	float : left;
	width : 70%;
	background-color : red;
}

#baddy_info {
	float : left;
	width : 30%;
	background-color : white;
}

.table_list {
}

.table_list tr {
	heiht : 100%;
	background-color: white;
}

.list_cell {
	width : 100px;
}

.baddy_state img {
	float : left;
}
.baddy_state span {
	clear : left;
}

#regist_button {
	width : 30%;
	height : 50px;
}
</style>

<div id="farm_wrap">

	<div id="baddy_list">
		<div id="list_head" style="height:65px;">Card List</div>

		<TABLE class="table_list" width="100%" border="5px">
			<tr align="center" height="100px">
				<td class="list_cell"></td>
				<td class="list_cell"></td>
				<td class="list_cell"></td>
				<td class="list_cell"></td>
				<td class="list_cell"></td>
			</tr>
			<tr align="center" height="100px">
				<td class="list_cell"></td>
				<td class="list_cell"></td>
				<td class="list_cell"></td>
				<td class="list_cell"></td>
				<td class="list_cell"></td>
			</tr>
			<tr align="center" height="100px">
				<td class="list_cell"></td>
				<td class="list_cell"></td>
				<td class="list_cell"></td>
				<td class="list_cell"></td>
				<td class="list_cell"></td>
			</tr>
			<tr align="center" height="100px">
				<td class="list_cell">16</td>
				<td class="list_cell">17</td>
				<td class="list_cell">18</td>
				<td class="list_cell">19</td>
				<td class="list_cell">20</td>
			</tr>
		</TABLE>
	</div>
	<div class="menubar_back3" onclick="load_html('index.html')">←</div>

	<!-- ここからバディ情報 -->
	<table id="baddy_info" border="3px">
		<tr>
			<td width="30%">Name</td>
			<td id="pv_name" width="70%" align="center">名前</td>
		</tr>
		<tr>
			<td id="pv_image" colspan="2" align="center" height="60px"><img src="../image/icon/heart.png" /></td>
		</tr>
		<tr>
			<td align="center"><img src="../image/icon/heart.png" /></td>
			<td id="pv_hp" align="center">HP</td>
		</tr>	
		<tr>
			<td align="center"><img src="../image/icon/sword.png" /></td>
			<td id="pv_str" align="center">STR</td>
		</tr>
		<tr>
			<td align="center"><img src="../image/icon/feather.png" /></td>
			<td id="pv_dex" align="center">DEX</td>
		</tr>
		<tr>
			<td align="center">type</td>
			<td id="pv_pse" align="center"></td>
		</tr>
		<tr>
			<td align="center">special</td>
			<td id="pv_dex" align="center"></td>
		</tr>
	</table>

	<button id="regist_button" onclick="farm_func.registration();">バディ登録</button>
	<!-- ここまでデッキ情報 -->

</div>