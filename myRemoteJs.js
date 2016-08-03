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
					notifyMe("莉莉守护盾 2016.8.3 运行中",1);
					
			}else{
				var preMin = Number(localStorage["pRotectCheckMin"]);
				var nowMin = mydate.getMinutes();
				if ( (nowMin - preMin ) >=25 || (nowMin - preMin) <= -25){
				localStorage["pRotectCheckMin"] = nowMin;
					notifyMe("莉莉守护盾 2016.8.3 运行中",1);
				}
			}
		}else if(msg == "aJaxhAsCk4001"){
			notifyMe("<---特殊ob 放行--->",0);
		}else if(msg == "aJaxhAsCk"){
			notifyMe("☢Warning☢拦截不明ob☢Warning☢\n危险度:不明",1);
		}else if(msg == "aJaxhAsCk1001"){
			notifyMe("☢Warning☢拦截模拟点击ob☢Warning☢\n危险度:低",1);
		}else if(msg == "aJaxhAsCk7001"){
			notifyMe("☢Warning☢拦截加速ob☢Warning☢\n危险度:高",1);
		}else if(msg == "aJaxhAsCk8001"){
			notifyMe("☢Warning☢拦截ViramateUser(维拉)ob☢Warning☢\n危险度:不明",1);
		}else if(msg == "aJaxhAsCk8002"){
			notifyMe("☢Warning☢拦截無課金GBob☢Warning☢\n危险度:不明",1);
		}else if(msg == "aJaxhAsCk9001"){
			notifyMe("☢Warning☢拦截gbftool(日版小哔)ob☢Warning☢\n危险度:不明",1);
		}else if(msg == "aJaxhAsCk9002"){
			notifyMe("☢Warning☢拦截gfe(国内某辅助)ob☢Warning☢\n危险度:不明",1);
		}else if(msg == "aJaxhAsCk9003"){
			notifyMe("☢Warning☢guraburu(不明)ob☢Warning☢\n危险度:不明",1);
		}else if(msg == "timePlan"){
			notifyMe("☸执行定时周回任务中☸",1);
		}else{
		notifyMe("官方消息:"+msg+"\n3秒后重新加载",1);
		setTimeout(function(){location.reload();},3000);
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
