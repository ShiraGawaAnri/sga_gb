$(function(){
	var runCk = false;
	function chAjaxK(){
		if($.ajaxSettings.beforeSend != undefined){
			hookAjaxSettingsBeforeSend = $.ajaxSettings.beforeSend;
			$.ajaxSettings.beforeSend = function(a,b){
				//console.info(b.url);
				if(b.url.match(/ob\?t/)|| b.url == "ob" || b.url.match(/ob\/r/) || b.url.match(/\/ob\//)){
						console.info('目标url = ', b.url, '目标data = ', b.data);
						var getBdata = b.data;
						var res = JSON.parse(getBdata);
						var codeT = "";
					for(var key in res.c) {
						var objArr = [1001,1002,4001,7001,7002,8001,8002,9001,9002,9003,9004,9005];
						var isNew = true;
						for(let kt = 0 ; kt < objArr.length ; kt++){
							if(key == objArr[kt]){
								isNew = false;
								break;
							}
						}
						if(isNew){
							//console.info("有新的不明ob代码出现，请立刻停止使用");
							console.info("发现新的代码 = ",key,"值 = ",res.c[key]);
							var message = "发现新代码:"+Key+" 值:"+res.c[key];
							var criticalityInfo = "推测种类:";
							var criticalityInfo2 = "推测危险度:";
							if(key>= 1000  && key <= 1999){
								criticalityInfo += "点击类";
								criticalityInfo2 += "中低";
							}else if(key >= 4000 && key <= 4999){
								criticalityInfo += "陷阱类";
								criticalityInfo2 += "不明"
							}else if(key >= 7000 && key <= 7999){
								criticalityInfo += "加速类";
								criticalityInfo2 += "非常高"
							}else if(key >= 8000 && key <= 8999){
								criticalityInfo += "良性辅助类";
								criticalityInfo2 += "低"
							}else if(key >= 9000 && key <= 9999){
								criticalityInfo += "恶性辅助类";
								criticalityInfo2 += "中"
							}else {
								criticalityInfo += "不明类";
								criticalityInfo2 += "不明"
							}
							message = message +"\n"+criticalityInfo +"\n"+criticalityInfo2;
							var title = "～碧蓝幻想有新消息～";
							var options = {
								body: message,
								tag: "newKey_"+key,
								icon: "http://shiragawaanri.github.io/sga_gb/icon23.png"
							};
							var notification = new Notification(title, options);
							notification.onshow = function() {
								setTimeout(function() {
									notification.close();
								},10000);
							}
						}
					}
						if(res.c[4001] == undefined
							&& res.c[1002] == undefined
							&& res.c[1001] == undefined
							&& res.c[7001] == undefined
							&& res.c[7002] == undefined
							&& res.c[8001] == undefined
							&& res.c[8002] == undefined
							&& res.c[9001] == undefined
							&& res.c[9002] == undefined
							&& res.c[9003] == undefined
							&& res.c[9004] == undefined
							&& res.c[9005] == undefined
						){
							//尝试遍历

						}
						if(res.c[4001] != undefined
						&& res.c[1001] == undefined
						&& res.c[7001] == undefined
						&& res.c[7002] == undefined
						&& res.c[8001] == undefined
						&& res.c[8002] == undefined
						&& res.c[9001] == undefined
						&& res.c[9002] == undefined
						&& res.c[9003] == undefined
						&& res.c[9004] == undefined
						&& res.c[9005] == undefined){ //仅有4001
							codeT = "a4001";
							console.info("单独 特殊4001 放行");
							hookAjaxSettingsBeforeSend(a,b);
						} else if(res.c[1002] != undefined
						&& res.c[1001] == undefined
						&& res.c[7001] == undefined
						&& res.c[7002] == undefined
						&& res.c[8001] == undefined
						&& res.c[9001] == undefined
						&& res.c[9002] == undefined
						&& res.c[9003] == undefined
						&& res.c[9004] == undefined
						&& res.c[9005] == undefined){ //仅有1002
							codeT = "a1002";
							hookAjaxSettingsBeforeSend(a,b);
						} else if(res.c[4001] != undefined){ //因为有可能出现 7001等 优先于 4001 被检留下记录 所以会出现 先发7001等,然后再发4001(带上了7001等记录）... 注意1002
						if (res.c[1001] != undefined ) {
							codeT += "k1001";
							console.info("篡改模拟点击的ob记录");
							delete res.c[1001];
						}
						if (res.c[7001] != undefined) {
							codeT += "k7001";
							console.info("篡改加速的ob记录");
							delete res.c[7001];
						}
						if (res.c[7002] != undefined) {
								codeT += "k7002";
								console.info("篡改反createJs函数劫持的ob记录");
								delete res.c[7002];
						}
						if (res.c[8001] != undefined) {
							codeT += "k8001";
							console.info("篡改ViramateUser(维拉)的ob记录");
							delete res.c[8001];
						}
						if (res.c[8002] != undefined) {
							codeT += "k8002";
							console.info("篡改無課金GB的ob记录");
							delete res.c[8002];
						}
						if (res.c[9001] != undefined) {
							codeT += "k9001";
							console.info("篡改gbftool(日版小哔)的ob记录");
							delete res.c[9001];
						}
						if (res.c[9002] != undefined) {
							codeT += "k9002";
							console.info("篡改gfe的ob记录");
							delete res.c[9002];
						}
						if (res.c[9003] != undefined) {
							codeT += "k9003";
							console.info("篡改guraburu(スラ爆)ob记录");
							delete res.c[9003];
						}
						if (res.c[9004] != undefined) {
							codeT += "k9004";
							console.info("篡改tke ob记录");
							delete res.c[9004];
						}
						if (res.c[9005] != undefined) {
							codeT += "k9005";
							console.info("篡改魔改小哔的ob记录");
							delete res.c[9005];
						}
						//放回去
						b.data = JSON.stringify(res);
						console.info("篡改后的data:", b.data);
						console.info("对含4001采取:放行");
						hookAjaxSettingsBeforeSend(a,b);
						}else if(res.c[4001] == undefined){ // q 无4001的发送
							var otherCode = true;
							if (res.c[1001] != undefined ) {
								otherCode = false;
								codeT += "q1001";
								console.info("篡改模拟点击的ob记录");
								delete res.c[1001];
							}
							if (res.c[1002] != undefined ) {
								otherCode = false;
								codeT += "q1002";
								console.info("篡改侦测X,Y的ob记录");
								delete res.c[1002];
								if(res.g.length > 1){
									res.g[0] = 0;
									res.g.splice(1,2);
								}
							}
							if (res.c[7001] != undefined) {
								otherCode = false;
								codeT += "q7001";
								console.info("篡改加速的ob记录");
								delete res.c[7001];
							}
							if (res.c[7002] != undefined) {
								otherCode = false;
								codeT += "q7002";
								console.info("篡改反createJs函数劫持的ob记录");
								delete res.c[7002];
							}
							if (res.c[8001] != undefined) {
								otherCode = false;
								codeT += "q8001";
								console.info("篡改ViramateUser(维拉)的ob记录");
								delete res.c[8001];
							}
							if (res.c[8002] != undefined) {
								otherCode = false;
								codeT += "q8002";
								console.info("篡改無課金GB的ob记录");
								delete res.c[8002];
							}
							if (res.c[9001] != undefined) {
								otherCode = false;
								codeT += "q9001";
								console.info("篡改gbftool(日版小哔)的ob记录");
								delete res.c[9001];
							}
							if (res.c[9002] != undefined) {
								otherCode = false;
								codeT += "q9002";
								console.info("篡改gfe的ob记录");
								delete res.c[9002];
							}
							if (res.c[9003] != undefined) {
								otherCode = false;
								codeT += "q9003";
								console.info("篡改guraburu(スラ爆)ob记录");
								delete res.c[9003];
							}
							if (res.c[9004] != undefined) {
								otherCode = false;
								codeT += "q9004";
								console.info("篡改tke ob记录");
								delete res.c[9004];
							}
							if (res.c[9005] != undefined) {
								otherCode = false;
								codeT += "q9005";
								console.info("篡改魔改小哔的ob记录");
								delete res.c[9005];
							}
							b.data = JSON.stringify(res);
							if(otherCode == false ) {
								a.abort();
							}
							else  hookAjaxSettingsBeforeSend(a,b);//注意小心
						}
					var trans = "aJaxhAsCk" + codeT;
					if ($('script[id^="IFmyAlert"]').length > 0) {
						alert(trans);
					}
				}else if(b.url.match(/\/gc\//)){
					//console.info('gc发送了: url = ',b.url,'data = ',b.data);
					var getBdata = b.data;
					var res = JSON.parse(getBdata);
					var codeT = "";
					//篡改直前带来的重复攻击次数统计
					for(var key in res.c) {
						var objArr = [1001,1002,4001,7001,7002,8001,8002,9001,9002,9003,9004,9005];
						var isNew = true;
						for(let kt = 0 ; kt < objArr.length ; kt++){
							if(key == objArr[kt]){
								isNew = false;
								break;
							}
						}
						if(isNew){
							//console.info("有新的不明ob代码出现，请立刻停止使用");
							console.info("发现新的代码 = ",key,"值 = ",res.c[key]);
							var message = "发现新代码:"+key+" 值:"+res.c[key];
							var criticalityInfo = "推测种类:";
							var criticalityInfo2 = "推测危险度:";
							if(key>= 1000  && key <= 1999){
								criticalityInfo += "点击类";
								criticalityInfo2 += "中低";
							}else if(key >= 4000 && key <= 4999){
								criticalityInfo += "陷阱类";
								criticalityInfo2 += "不明"
							}else if(key >= 7000 && key <= 7999){
								criticalityInfo += "加速类";
								criticalityInfo2 += "非常高"
							}else if(key >= 8000 && key <= 8999){
								criticalityInfo += "良性辅助类";
								criticalityInfo2 += "低"
							}else if(key >= 9000 && key <= 9999){
								criticalityInfo += "恶性辅助类";
								criticalityInfo2 += "中"
							}else {
								criticalityInfo += "不明类";
								criticalityInfo2 += "不明"
							}
							message = message +"\n"+criticalityInfo +"\n"+criticalityInfo2;
							var title = "～碧蓝幻想有新消息～";
							var options = {
								body: message,
								tag: "newKey_"+key,
								icon: "http://shiragawaanri.github.io/sga_gb/icon23.png"
							};
							var notification = new Notification(title, options);
							notification.onshow = function() {
								setTimeout(function() {
									notification.close();
								},10000);
							}
						}
					}
					if(res.c[1002] != undefined){
						if(res.c[1002] <= 3){
							sessionStorage["pressTimes"] = res.c[1002];
						}
						if(res.c[1002] > Number(sessionStorage["pressTimes"])+1 || res.c[1002] == Number(sessionStorage["pressTimes"])){
							res.c[1002] = Number(sessionStorage["pressTimes"])+1;
							sessionStorage["pressTimes"] = Number(sessionStorage["pressTimes"])+1
						}
					}
					//检查1002附带的坐标，在g里的
					if(res.c[1002] != undefined){
						//console.info('gc发送了: url = ',b.url,'data = ',b.data,'b.g.length',res.g.length);
							if(res.g[0] !=0 && res.g.length > 1 && (res.g[1] == null || res.g[2] == null)){
								res.g[1] = 506-Math.round(Math.random()*146);
								res.g[2] = 416-Math.round(Math.random()*50);
								if(res.g[1] < 10000 ) res.g[1] += 10000;
								if(res.g[2] < 10000 ) {
									res.g[2] += 20000;
								}else if(res.g[2] < 20000 && res.g[2] >= 10000){
									res.g[2] += 10000;
								}
								codeT += "k1002";
							}
							
					}
					//篡改其他作弊码
					if(res.c[1001] != undefined) {
						delete res.c[1001];
						codeT += "k1001";
					}
					if(res.c[7001] != undefined) {
						delete res.c[7001];
						codeT += "k7001";
					}
					if (res.c[7002] != undefined) {
						codeT += "k7002";
						delete res.c[7002];
					}
					if(res.c[8001] != undefined) {
						delete res.c[8001];
						codeT += "k8001";
					}
					if(res.c[8002] != undefined) {
						delete res.c[8002];
						codeT += "k8002";
					}
					if(res.c[9001] != undefined) {
						delete res.c[9001];
						codeT += "k9001";
					}
					if(res.c[9002] != undefined) {
						delete res.c[9002];
						codeT += "k9002";
					}
					if(res.c[9003] != undefined) {
						delete res.c[9003];
						codeT += "k9003";
					}
					if(res.c[9004] != undefined) {
						delete res.c[9004];
						codeT += "k9004";
					}
					if(res.c[9005] != undefined) {
						delete res.c[9005];
						codeT += "k9005";
					}
					//放回去
					b.data = JSON.stringify(res);
					//console.info(b.data);
					hookAjaxSettingsBeforeSend(a,b);
					var trans = "gcCraCk" + codeT;
					if ($('script[id^="IFmyAlert"]').length > 0 && codeT != "") {
						if(res.c[1002] <= 2 ) alert(trans);
					}
				}else {
					hookAjaxSettingsBeforeSend(a, b);
				}
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
	},500);
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

