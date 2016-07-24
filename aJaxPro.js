var hookAjaxSettingsBeforeSend = "";
var runCk = false;
function chAjaxK(){
	if($.ajaxSettings.beforeSend != undefined){
		hookAjaxSettingsBeforeSend = $.ajaxSettings.beforeSend;
		$.ajaxSettings.beforeSend = function(a,b){
			//console.info(b.url);
			if(b.url.match(/ob\?t/)){
				console.info('检测到 ob?t=,尝试拦截url =',b.url,'的$.ajax请求');
				if($('script[id^="IFmyAlert"]').length > 0){
					alert("aJaxhAsCk");
				}
				//a.abort();
				return false;
			}else
				hookAjaxSettingsBeforeSend(a,b);
		}
	runCk = true;
	console.info('$.ajax拦截启动')
	}

var timer = setInterval(function(){
	chAjaxK();
	if(runCk == true){
		clearInterval(timer);
		console.info('卸载多余的计时器');
		sendDirectScript2("","ajaxpro");
	}
	},500)
});

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
