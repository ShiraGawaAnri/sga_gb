$(function(){
	var runCk = false;
	function chAjaxK(){
		if($.ajaxSettings.beforeSend != undefined){
			hookAjaxSettingsBeforeSend = $.ajaxSettings.beforeSend;
			$.ajaxSettings.beforeSend = function(a,b){
				//console.info(b.url);
				if(b.url.match(/ob\?t/)|| b.url == "ob" || b.url.match(/ob\/r/) || b.url.match(/\/ob\//)){
					//if(b.url.match(/ob\/r/)) {
						console.info('可能被检测 url = ', b.url, 'data = ', b.data);
						//console.info('test = ',JSON.stringify(b.data).split(",")[0]);
						var codeT = "";
						if(JSON.parse(b.data).c[4001] != undefined 
						&& JSON.parse(b.data).c[1001] == undefined 
						&& JSON.parse(b.data).c[1002] == undefined
						&& JSON.parse(b.data).c[7001] == undefined
						&& JSON.parse(b.data).c[8001] == undefined
						&& JSON.parse(b.data).c[9001] == undefined
						&& JSON.parse(b.data).c[9002] == undefined
						&& JSON.parse(b.data).c[9003] == undefined
						&& JSON.parse(b.data).c[9005] == undefined){
							codeT = "4001";
							console.info("单独 特殊4001 放行");
							hookAjaxSettingsBeforeSend(a,b);
						}
						else if (JSON.parse(b.data).c[1001] != undefined ) {
							codeT = "1001";
							console.info("模拟点击ob被拦截 危险:低");
						} else if (JSON.parse(b.data).c[1002] != undefined ) {
							codeT = "1002";
							console.info("篡改鼠标X,Yob被拦截 危险:低");
						} else if (JSON.parse(b.data).c[7001] != undefined) {
							codeT = "7001";
							console.info("加速ob被拦截 危险:高");
						} else if (JSON.parse(b.data).c[8001] != undefined) {
							codeT = "8001";
							console.info("ViramateUser(维拉)ob被拦截 危险:不确定能完全拦截");
						} else if (JSON.parse(b.data).c[8002] != undefined) {
							codeT = "8002";
							console.info("無課金GB被拦截 危险:不确定能完全拦截");
						} else if (JSON.parse(b.data).c[9001] != undefined) {
							codeT = "9001";
							console.info("gbftool(日版小哔)ob被拦截 危险:低");
						} else if (JSON.parse(b.data).c[9002] != undefined) {
							codeT = "9002";
							console.info("gfe(国内某辅助）ob被拦截 危险:不确定能完全拦截");
						} else if (JSON.parse(b.data).c[9003] != undefined) {
							codeT = "9003";
							console.info("guraburu(不明) ob被拦截 危险:不确定能完全拦截");
						} else if (JSON.parse(b.data).c[9005] != undefined) {
							codeT = "9005";
							console.info("魔改小哔系列的 ob被拦截 危险:不确定能完全拦截");
						} else {
							console.info("拦截了不明标识ob 危险:不明")
						}
						//console.info('检测到 ob,尝试拦截url =',b.url,'的$.ajax请求');
						var trans = "aJaxhAsCk" + codeT;
						if ($('script[id^="IFmyAlert"]').length > 0) {
							alert(trans);
						}
						if(codeT != "4001" ) a.abort();
						//return false;
					//}
				}else if(b.url.match(/\/gc\//)){
					//console.info('gc发送了: url = ',b.url,'data = ',b.data);
					var getBdata = b.data;
					var res = JSON.parse(getBdata);
					//篡改直前带来的重复攻击次数统计
					if(res.c[1002] != undefined){
						if(res.c[1002] == 1){
							sessionStorage["pressTimes"] = 1;
						}
						if(res.c[1002] > Number(sessionStorage["pressTimes"])+1){
							res.c[1002] = Number(sessionStorage["pressTimes"])+1;
							sessionStorage["pressTimes"] = Number(sessionStorage["pressTimes"])+1
						}
					}
					//篡改其他作弊码
					if(res.c[1001] != undefined) delete res.c[1001];
					if(res.c[7001] != undefined) delete res.c[7001];
					if(res.c[8001] != undefined) delete res.c[8001];
					if(res.c[8002] != undefined) delete res.c[8002];
					if(res.c[9001] != undefined) delete res.c[9001];
					if(res.c[9002] != undefined) delete res.c[9002];
					if(res.c[9003] != undefined) delete res.c[9003];
					if(res.c[9005] != undefined) delete res.c[9005];
					//放回去
					b.data = JSON.stringify(res);
					//console.info(b.data);
					hookAjaxSettingsBeforeSend(a,b);
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

if(sendDirectScript2 == undefined){
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
}