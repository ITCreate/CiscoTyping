var post_to_php = {

}

function registration(url){
	$("#sousin").css("display","none");
    var param = {
    	//"ticket": ticket,
    	"deck" : value
    };  //テキストとハッシュ値

    //ajaxでの送信
	$.ajax({
		type: "post",
		url: url,
		data: JSON.stringify(param),
		crossDomain: false,
		dataType : "jsonp",
		scriptCharset: 'utf-8',
	}).done(function(data){
		alert(data);
		$("#sousin").css("display","inline");
	}).fail(function(XMLHttpRequest, textStatus, errorThrown){
		alert(errorThrown);
		$("#sousin").css("display","inline");
	});		
}