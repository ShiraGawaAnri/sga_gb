$(function(){
	var runCk = false;
	function chAjaxK(){
		if($.ajaxSettings.beforeSend != undefined){
			hookAjaxSettingsBeforeSend = $.ajaxSettings.beforeSend;
			$.ajaxSettings.beforeSend = function(a,b){
				//console.info(b.url);
				if(b.url.match(/ob\?t/)|| b.url == "ob" || b.url.match(/ob\/r/) || b.url.match(/ob\//)){
					if(b.url.match(/ob\/r/))
					{console.info('可能被检测 url = ',b.url,'data = ',b.data);
					//console.info('test = ',JSON.stringify(b.data).split(",")[0]);
					if(JSON.stringify(b.data).split(",")[0].match(/"1001/)){
}						console.info("加速ob被拦截 危险:高");
					}else if(JSON.stringify(b.data).split(",")[0].match(/"7001/)) {
						console.info("模拟点击ob被拦截 危险:低");
					}else {
						console.info("拦截了不明标识ob 危险:不明")
					}
					//console.info('检测到 ob,尝试拦截url =',b.url,'的$.ajax请求');
					if($('script[id^="IFmyAlert"]').length > 0){
						alert("aJaxhAsCk")
					}
					a.abort();
					//return false;
				}else
					hookAjaxSettingsBeforeSend(a,b);
			}
			runCk = true;
			console.info('$.ajax拦截启动');
		}
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