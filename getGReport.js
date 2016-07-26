function sendDirectScriptG(scriptStr,id) {
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

var tmpStr = ''
			+'var getGameReport = "";'
			+'console.info("start")'
			+'$(function(){'
			+'if(getGameReport == "" && Game.reportError != undefined && Game.reportError != "") {'
			+'getGameReport = Game.reportError;'
			+'Game.reportError = function(msg, url, line, column, err, callback){'
			+'console.info("msg = ",msg,"url = ",url,"err = ",err,"callback = ",callback)'
			+'getGameReport(msg,url,line,column,err,callback);'
			+'}'
			+'}'
			+'})'
			+''
			;
sendDirectScriptG(tmpStr,"gGRTest");
/*
var getGameReport = "";
console.info("start")
$(function(){
	if(getGameReport == "" && Game.reportError != undefined && Game.reportError != "") {
		getGameReport = Game.reportError;
		Game.reportError = function(msg, url, line, column, err, callback){
			console.info("msg = ",msg,"url = ",url,"err = ",err,"callback = ",callback)
			getGameReport(msg,url,line,column,err,callback);
		}
	}
})
*/