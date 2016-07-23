var hookAjaxSettingsBeforeSend = "";
$(function(){
	var runCk = false;
function chAjaxK(){
	if($.ajaxSettings.beforeSend != undefined){
		hookAjaxSettingsBeforeSend = $.ajaxSettings.beforeSend;
		$.ajaxSettings.beforeSend = function(a,b){
			if(b.url.match(/ob?t=/)){
				console.info('检测到 ob?t=,尝试拦截',b.url);
				xhr.abort();
				return false;
			}else
				hookAjaxSettingsBeforeSend(a,b);
		}
	runCk = true;
	console.info('ajax拦截运行')
	}
}
var timer = setInterval(function(){
	chAjaxK();
	if(runCk ==true){
		clearInterval(timer);
		console.info('卸载计时器')
	}
		},1000)
});


