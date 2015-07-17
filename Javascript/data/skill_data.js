var skill = function(){
	this.id;
	this.name;
	this.cost;
	this.effect;
}

var skill_burnning = function(){
	skill.call(this);
	this.prototype =  new skill();

	this.name = "Burnning";
	this.necessary_combo_activate = 10;

	this.effect = function(source){
		source.image = 1;
		source.atk += 20;
		var a = source;
		setTimeout(function(){
			a.image = 0;
			source.atk -= 20;

		}
		, 5000);
	}
}

var skill_icestorm = function(){
	skill.call(this);
	this.prototype =  new skill();

	this.name = "IceStorm";
	this.necessary_combo_activate = 30;

	this.effect = function(source){
	}
}


var skill_none = function(){
	skill.call(this);
	this.prototype =  new skill();

	this.name = "no skill";

	this.necessary_combo_activate = 99999;

	this.effect = function(source){
	}
}


var effect_db = new Array();

effect_db[0] = {
	'id' : 0,
	'name' : 'slash',

	'sprite' : "../image/effect/beat.png",

	'frame' : 8,

	'frame_time' : {
		0 : 2,
		1 : 2,
		2 : 2,
		3 : 2,
		4 : 2,
		5 : 2,
		6 : 3,
		7 : 3
	}
}