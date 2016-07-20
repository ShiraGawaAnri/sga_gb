function alert_pre_input(){
	var _alert = window.alert;
	window.alert = function(msg) {
		//console.log("页面有 alert消息 : ",msg);
		if(msg == "aFPScRack"){
		var mydate = new Date();
		var preMin = Number(localStorage["iMarkMin"]);
		var nowMin = mydate.getMinutes();
			if(localStorage["FPSCheckMin"] == "" || localStorage["FPSCheckMin"] == undefined){
				localStorage["FPSCheckMin"] = mydate.getMinutes();
				notifyMe("侦查到反外挂检测FPS 尝试绕开",0);
			}else{
				var preMin = Number(localStorage["FPSCheckMin"]);
				var nowMin = mydate.getMinutes();
				if ( (nowMin - preMin ) >=15 || (nowMin - preMin) <= -15){
				localStorage["FPSCheckMin"] = nowMin;
				notifyMe("侦查到反外挂检测FPS 尝试绕开",0);
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
function crackFPS(){
	var scriptStr = "";
	scriptStr = ""
					+"createjs.Ticker.getFPS = function(){alert('aFPScRack');return 24;};"
					+""
					;
	sendDirectScript(scriptStr,"ckFPS");
}
function crackTap(){
	var scriptStr = "";
	scriptStr = ""
					+'$("body").off("mousedown mouseup touchstart touchend tap");'
					+""
					;
	sendDirectScript(scriptStr,"ckTap");
	
}
crackTap();
$("body").off("mousedown mouseup touchstart touchend tap");
var timer3=setInterval(function(){crackFPS()},5000);
/*
function getFpsCrack(){
	var _getFps = createjs.Ticker.getFPS;
	createjs.Ticker.getFPS = function() {
		//console.log("侦查到检测FPS-status 1")
		notifyMe("侦查到反外挂检测FPS-status 1,尝试绕过",1);
		return 24;
	}
	createjs.Ticker.getFPS() = function(){
		//console.log("侦查到检测FPS-status 2")
		notifyMe("侦查到反外挂检测FPS-status 2,尝试绕过",1);
		return 24;
	}
}
*/

