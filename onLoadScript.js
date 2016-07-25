var localVerSion = "0.7.25T";
//注入劫持系列函数的脚本
var timer = setInterval(function(){
if($('script[src*="aJaxPro.js"]').length == 0 ) {
		function lodScr(){
			var mydate = new Date();
			var nowsec = mydate.getTime();
			var oHead = document.getElementsByTagName('body').item(0);   
			var oScript= document.createElement("script");
			oScript.id = "ajaxproLoad";
			oScript.type = "text/javascript"; 
			oScript.src="http://shiragawaanri.github.io/sga_gb/aJaxPro.js?time="+nowsec; 
			oScript.charset="utf-8";
			oHead.appendChild(oScript);
			}
		lodScr();
		return false;
}
if($('script[src*="myRemoteJs.js"]').length == 0 ){
		function lodScr2(){
			var mydate = new Date();
			var nowsec = mydate.getTime();
			var oHead = document.getElementsByTagName('HEAD').item(0);   
			var oScript= document.createElement("script"); 
			oScript.id = "remoteLoad"; 
			oScript.type = "text/javascript";   
			oScript.src="http://shiragawaanri.github.io/sga_gb/myRemoteJs.js?time="+nowsec;
			oScript.charset="utf-8";
			oHead.appendChild(oScript)
		}
		lodScr2();
		return false;
}
if($('script[src*="aJaxPro.js"]').length > 0 && $('script[src*="myRemoteJs.js"]').length > 0){
	clearInterval(timer);
}
},500);

//更新通知脚本(测试)
function updateCK(){
	var verSionText = $.ajax({
        type: 'GET',
        url:'http://shiragawaanri.github.io/sga_gb/version.txt',
        async:false,
        dataType:'text',
		scriptCharset:'utf-8',
       });
	var newVerSion = verSionText.responseText;
	if(verSionText.responseText != undefined){
		var mydate = new Date();
		var nowsec = mydate.getTime()/1000;
		if(localVerSion != newVerSion){
			if(localStorage["newVerSionLog"] == "" || localStorage["newVerSionLog"] == undefined){
				localStorage["newVerSionLog"] = newVerSion;
				notifyMe("---当前最新版本为: ver"+newVerSion+"---",1);
			}else if(localStorage["newVerSionLog"] != newVerSion){
				localStorage["updataNotifySec"] = Number(nowsec); 
				notifyMe("---有更新版本: ver "+newVerSion+"可更新---",1);
			}else if(localStorage["newVerSionLog"] == newVerSion){
				if(localStorage["updataNotifySec"] == "" || localStorage["updataNotifySec"] == undefined){
					localStorage["updataNotifySec"] = Number(nowsec); 
					notifyMe("---有新版本: ver "+newVerSion+"可更新---\n提示间隔：12小时",1);
				}else{
					if((nowsec - Number(localStorage["updataNotifySec"]))>(3600*12)){
						localStorage["updataNotifySec"] = Number(nowsec); 
						notifyMe("---有新版本: ver "+newVerSion+"可更新---\n提示间隔：12小时",1);
					}
				}
			}
		}
	return true;
	}else return false;
}
var ckFun = false;
ckFun = updateCK();
var timer2=setInterval( function(){ ckFun = updateCK();},180*1000);
if (ckFun == true ){clearInterval(timer2);}

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
                },20000);
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