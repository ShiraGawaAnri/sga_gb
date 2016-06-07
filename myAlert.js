function alert_pre_input(){
	var _alert = window.alert;
	window.alert = function(msg) {
		console.log(msg);console.log("alert now");
	}
}
alert_pre_input();
setTimeout(function(){alert("oootktktk")},5000);