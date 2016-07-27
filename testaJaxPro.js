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
						//setJson(b.data,"u","23121");
						var get = JSON.parse(b.data);
						console.info(get);
						get.u=2321312;
						console.info(get);
						var res = JSON.stringify(get); 
						console.info("Test res = ",res);
						console.info('Test b.data = ',b.data);
						b.data = res;
						console.ino(b.data);
						a.abort();
						//return false;
					//}
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

function setJson(jsonStr,name,value)
{
    if(!jsonStr)jsonStr="{}";
    var jsonObj = JSON.parse(jsonStr);
    jsonObj[name] = value;
        return JSON.stringify(jsonObj) 
}