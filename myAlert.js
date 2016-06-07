function alert_pre_input(){
	var _alert = window.alert;
	window.alert = function(msg) {
		console.log("有alert消息 : ",msg);
		notifyMe(1,msg);
	}
}
alert_pre_input();//插入页面的alert函数劫持
console.log("quick");
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