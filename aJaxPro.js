var hookAjaxSettingsBeforeSend = "";
$(function(){
	var runCk = false;
function chAjaxK(){
	if($.ajaxSettings.beforeSend != undefined){
		hookAjaxSettingsBeforeSend = $.ajaxSettings.beforeSend;
		$.ajaxSettings.beforeSend = function(a,b){
			//console.info(b.url);
			//testsssssssssssssssssssss
			if(b.url.match(/ob\?t/)|| b.url == "ob" || b.url.match(/ob\/r/)){
				if(b.url.match(/ob\/r/)) console.info('加速可能被检测 url = ',b.url);
				//console.info('检测到 ob,尝试拦截url =',b.url,'的$.ajax请求');
				if($('script[id^="IFmyAlert"]').length > 0){
					alert("aJaxhAsCk")
				}
				a.abort();
				return false;
			}else
				hookAjaxSettingsBeforeSend(a,b);
		}
	runCk = true;
	console.info('$.ajax拦截启动');
	}
}
//chAjaxK();
var timer = setInterval(function(){
	chAjaxK();
	if(runCk == true){
		clearInterval(timer);
		console.info('卸载多余的计时器');
		sendDirectScript2("","ajaxpro");
	}
	},500)
});
