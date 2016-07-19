function alert_pre_input(){
	var _alert = window.alert;
	window.alert = function(msg) {
		console.log("页面有 alert消息 : ",msg);
		notifyMe(msg+"  3秒后重新加载",1);
		setTimeout(function(){location.reload();},3000);
	}
}
notifyMe("",-1);
alert_pre_input();//插入页面的alert函数劫持
//alert("消息消息消息");

var localVerSion = "0.6.15"
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
	var mydate = new Date();
	var nowsec = mydate.getTime()/1000;
	if(localVerSion != newVerSion){
		if(localStorage["updataNotifySec"] == "" || localStorage["updataNotifySec"] == undefined){
			localStorage["updataNotifySec"] = Number(nowsec); 
			notifyMe("---有新版本: ver "+newVerSion+"可更新---提示间隔：12小时",1);
		}else{
			if((nowsec - Number(localStorage["updataNotifySec"]))>(3600*12)){
				localStorage["updataNotifySec"] = Number(nowsec); 
				notifyMe("---有新版本: ver "+newVerSion+"可更新---提示间隔：12小时",1);
			}
		}
	}
}

updateCK();




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
                },30000);
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