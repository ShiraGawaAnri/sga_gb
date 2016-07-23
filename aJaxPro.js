var hookAjaxSettingsBeforeSend = "";
$(function(){
	var runCk = false;
function chAjaxK(){
	if($.ajaxSettings.beforeSend != undefined){
		hookAjaxSettingsBeforeSend = $.ajaxSettings.beforeSend;
		$.ajaxSettings.beforeSend = function(a,b){
			console.info(b.url);
			var target = "ob\?t";
			if(b.url.match(target)){
				console.info('检测到 ob?t=,尝试拦截',b.url);
				xhr.abort();
				return false;
			}else
				hookAjaxSettingsBeforeSend(a,b);
		}
	runCk = true;
	console.info('ajax$拦截运行')
	}
}
var timer = setTimeout(function(){
	chAjaxK();
	},3000)
});
