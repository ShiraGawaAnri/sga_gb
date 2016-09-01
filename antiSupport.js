function alert_pre_input(){
	sendDirectScript2("","IFmyAlert");
	var _alert = window.alert;
	window.alert = function(msg) {
		//console.log("页面有 alert消息 : ",msg);
		if(msg == "aLLproTect" ||msg == "aFPScRack" || msg == "cRaCkTap"){
		var mydate = new Date();
		var preMin = Number(localStorage["iMarkMin"]);
		var nowMin = mydate.getMinutes();
			if(localStorage["pRotectCheckMin"] == "" || localStorage["pRotectCheckMin"] == undefined){
				localStorage["pRotectCheckMin"] = mydate.getMinutes();
					notifyMe("莉莉守护盾 2016.9.01.2 运行中",1);
					
			}else{
				var preMin = Number(localStorage["pRotectCheckMin"]);
				var nowMin = mydate.getMinutes();
				if ( (nowMin - preMin ) >=25 || (nowMin - preMin) <= -25){
				localStorage["pRotectCheckMin"] = nowMin;
					notifyMe("莉莉守护盾 2016.9.01.2 运行中",1);
				}
			}
		}else if(msg.match(/aJaxhAsCka/)){ //a 放行
			if(msg.match(/a4001/)) notifyMe("放行4001检测",0);
		}else if(msg.match(/aJaxhAsCkk/)) {//k 篡改后放行
			var myMsg = "";
			if (msg.match(/k1001/)) myMsg += " 模拟点击";
			if (msg.match(/k7001/)) myMsg += " 加速";
			if (msg.match(/k8001/)) myMsg += " 维拉";
			if (msg.match(/k8002/)) myMsg += " 无氪金";
			if (msg.match(/k9001/)) myMsg += " 日版小哔";
			if (msg.match(/k9002/)) myMsg += " GFE";
			if (msg.match(/k9003/)) myMsg += " スラ爆";
			if (msg.match(/k9004/)) myMsg += " tke";
			if (msg.match(/k9005/)) myMsg += " 魔改小哔";
			notifyMe("☢Warning☢对:\n" + myMsg + "等ob记录删除后放行\n☢Warning☢", 1);
		}else if(msg.match(/aJaxhAsCkq/)){//q 拦截
			var myMsg = "";
			if (msg.match(/q1001/)) myMsg += " 模拟点击";
			if (msg.match(/q1002/)) myMsg += " 侦测X,Y";
			if (msg.match(/q7001/)) myMsg += " 加速";
			if (msg.match(/q8001/)) myMsg += " 维拉";
			if (msg.match(/q8002/)) myMsg += " 无氪金";
			if (msg.match(/q9001/)) myMsg += " 日版小哔";
			if (msg.match(/q9002/)) myMsg += " GFE";
			if (msg.match(/q9003/)) myMsg += " スラ爆";
			if (msg.match(/q9004/)) myMsg += " tke";
			if (msg.match(/q9005/)) myMsg += " 魔改小哔";
			notifyMe("☢Warning☢对:\n" + myMsg + "等ob拦截\n☢Warning☢", 1);
		}
		else if(msg.match(/gcCraCk/)) {//目前只有 篡改后放行
			var myMsg = "";
			if (msg.match(/k1002/)) notifyMe("☢Attention☢\n你可能 操作系统/chrome版本过旧/使用其他自动有问题 请尽快解决\n☢Attention警告☢",1);
			if (msg.match(/k1001/)) myMsg += " 模拟点击";
			if (msg.match(/k7001/)) myMsg += " 加速";
			if (msg.match(/k8001/)) myMsg += " 维拉";
			if (msg.match(/k8002/)) myMsg += " 无氪金";
			if (msg.match(/k9001/)) myMsg += " 日版小哔";
			if (msg.match(/k9002/)) myMsg += " GFE";
			if (msg.match(/k9003/)) myMsg += " スラ爆";
			if (msg.match(/k9004/)) myMsg += " tke";
			if (msg.match(/k9005/)) myMsg += " 魔改小哔";
			if(myMsg != "" && !msg.match(/k1002/)) {
				notifyMe("☢Attention☢对:\n" + myMsg + "等ob记录删除后放行\n☢Attention☢", 1);
			}else if(myMsg != "" && msg.match(/k1002/)){
				setTimeout(function(){notifyMe("☢Attention☢对:\n" + myMsg + "等ob记录删除后放行\n☢Attention☢", 1);},10000);
			}
		}
		else if(msg == "timePlan"){
			notifyMe("☸执行定时周回任务中☸",1);
		}else{
		notifyMe("官方消息:"+msg+"\n",1);
		//setTimeout(function(){location.reload();},3000);
		}
	}
}
notifyMe("",-1);
alert_pre_input();
var timer = setInterval(function(){
if($('script[id^="IFmyAlert"]').length == 0)
	alert_pre_input();
else if($('script[id^="IFmyAlert"]').length >0)
	clearInterval(timer);
},1000);
//插入页面的alert函数劫持
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
/*
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
						+'		alert("---FPS远程保护失效---");'
						+'	}'
						+'	return 24;'
						+'};'
						+'alert("aFPScRack");'
					+'})'		
	sendDirectScript2(scriptStr,"IF"+"FcPaS");	
}
crackFPS();
var timer3=setInterval(function(){if(getOriginFPS == createjs.Ticker.getFPS) crackFPS()},5000);
*/
/*
function crackTap(){
	var scriptStr = "";
	scriptStr = ""
					+"$(function(){"
//					+"$('body').off('mousedown mouseup touchstart touchend tap');"
//					+"$('#wrapper').off('tap');"
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
*/
//var timer2=setInterval(function(){crackTap();},1000);
