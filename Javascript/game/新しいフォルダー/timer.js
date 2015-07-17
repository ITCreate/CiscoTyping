/*
使い方　：　startcountにカウント数をセットして実行
*/
var timer = {
    time : 1000,

    //時間をセットする。
    settime : function(t){
        this.time = t;
    },

    //これを実行するとカウントダウン開始
    startcount : function(a_time){
        this.settime(a_time);
        this.countdownloop();
    },
 
    //
    decreasetime : function(t){
    	this.time -= t;
    },
 
    //画面への出力
    showtime : function(){
        //ここに出力の命令を書く
    },
 
    //カウントダウン開始
    countdownloop : function(){
        if(this.time > 0){
            this.time -= 1;
            this.showtime();
            //音楽の切り替え
            CtoC.sound_switch();
            setTimeout("timer.countdownloop()",100);
        }else{
            CtoC.finish_game();
        }
         
    }
}