﻿function alert_pre_input(){
	var _alert = window.alert;
	window.alert = function(msg) {
		//console.log("页面有 alert消息 : ",msg);
		if(msg == "aFPScRack" || msg == "cRaCkTap"){
		var mydate = new Date();
		var preMin = Number(localStorage["iMarkMin"]);
		var nowMin = mydate.getMinutes();
			if(localStorage["pRotectCheckMin"] == "" || localStorage["pRotectCheckMin"] == undefined){
				localStorage["pRotectCheckMin"] = mydate.getMinutes();
				notifyMe("保护机制运行中0.7.23_C",0);
			}else{
				var preMin = Number(localStorage["pRotectCheckMin"]);
				var nowMin = mydate.getMinutes();
				if ( (nowMin - preMin ) >=15 || (nowMin - preMin) <= -15){
				localStorage["pRotectCheckMin"] = nowMin;
				notifyMe("保护机制运行中0.7.23_C",0);
				}
			}
		}else{
		notifyMe(msg+"  3秒后重新加载",1);
		setTimeout(function(){location.reload();},3000);
		}
	}
}
notifyMe("",-1);
alert_pre_input();//插入页面的alert函数劫持
//getFpsCrack();//尝试欺骗getFps
//alert("消息消息消息");
function notifyMe(message,flag) {
	var rand = (function(){
	var today = new Date(); 
	var seed = today.getTime();
	function rnd(){
		seed = ( seed * 9301 + 49297 ) % 233280;
    return seed/ ( 233280.0 );
  	};
  	return function rand(number){
    return Math.ceil(rnd(seed)* number);};
	})();
	var random_icon = 
	new Array("icon20.png",
		"icon22.png",
		"icon23.png",
		"icon24.png");
	var get_rand = rand(4);
	var src_url = "http://shiragawaanri.github.io/sga_gb/";
	var part_icon_url = random_icon[get_rand-1];
	var icon_url = src_url+part_icon_url;
	  var title = "～碧蓝幻想有新消息～";
	  var options = {
      body: message,
      tag: "anri_shiragawa",
      icon: icon_url

  };
  if (!("Notification" in window)) {
  	return false;//浏览器不支持
  }
  //flag -1:检测 0:通常消息 1:验证码,更新/通讯不良alert
  if(flag == -1 && Notification.permission !== "granted"){
	Notification.requestPermission(function (permission) {
			if (permission === "granted") {
				options = {body:"已开启桌面通知",tag:"granted-just-one",icon:icon_url}
				var notification = new Notification(title, options);
				notification.onshow = function() {
					setTimeout(function() {
						notification.close();
					}, 3000);
				};
		  }
		});
	}
	else if(flag !=-1 && Notification.permission === "granted"){
			if(flag == 1){
				var notification = new Notification(title, options);
				notification.onshow = function() {
				setTimeout(function() {
				notification.close();
                },10000);
				}
			}else if (flag == 0){
				var notification = new Notification(title, options);
				notification.onshow = function() {
				setTimeout(function() {
				notification.close();
                },2000);
			}
            };
	}
}
/*
function sendDirectScript(scriptStr,id) {
	var script_id = document.getElementById(id);
            if (script_id) {
                //document.getElementsByTagName('head')[0].removeChild(script_id);
                $('#'+id).remove();
            }
	if ($('#'+id).size() == 0) {
		$("<script>")
			.attr("id",id)
			.appendTo("head");
	}
	$('#'+id).html(scriptStr);
}
*/
function sendDirectScript2(scriptStr,id) {
	var script_id = document.getElementById(id);
            if (script_id) {
                $('#'+id).remove();
            }
	if ($('#'+id).size() == 0) {
		$("<script>")
			.attr("id",id)
			.appendTo("body");
	}
	$('#'+id).html(scriptStr);
}

var getOriginFPS = createjs.Ticker.getFPS;
function crackFPS(){
		var scriptStr = '$(function(){'
						+'var hookFPS=createjs.Ticker.getFPS();'
						+'var hookInterval=createjs.Ticker.getInterval();'	
						+'createjs.Ticker.getFPS=function(){'
						+'	return hookFPS;'
						+'};'
						+'createjs.Ticker.getInterval=function(b){'
						+'	return hookInterval;'
						+'};'
						+'createjs.Ticker.setFPS('+gbfToolFpsSetting+');'
						+'if(hookFPS!=createjs.Ticker.getFPS()||hookInterval!=createjs.Ticker.getInterval()){'
						+'	console.info("warning!");'
						+'	return;'
						+'}'
						+'var fpsHook=createjs.Ticker.setFPS;'	
						+'createjs.Ticker.setFPS=function(){'
						+'	fpsHook('+gbfToolFpsSetting+');'
						+'	if(createjs && createjs.Ticker && createjs.Ticker.getFPS && createjs.Ticker.getFPS() > 35){'
						+'		console.info("FPS被检测为:"+createjs.Ticker.getFPS());'
						+'		alert("---远程保护失效---");'
						+'	}'
						+'	return 24;'
						+'};'
						+'alert("aFPScRack");'
					+'})'		
	sendDirectScript2(scriptStr,"IF"+"FcPaS");	
}
crackFPS();
var timer3=setInterval(function(){if(getOriginFPS == createjs.Ticker.getFPS) crackFPS()},5000);

function crackTap(){
	var scriptStr = "";
	scriptStr = ""
					+"$(function(){"
					+"$('body').off('mousedown mouseup touchstart touchend tap');"
					+"});"
//					+"window.onload=function(){"
//					+"$('body').off('mousedown mouseup touchstart touchend tap');"
//					+"};"
					+"alert('cRaCkTap');"
					+""
					;
	sendDirectScript2(scriptStr,"ckH");
}
crackTap();
//var timer2=setInterval(function(){crackTap();},1000);

