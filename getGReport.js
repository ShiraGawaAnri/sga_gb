var getGameReport = "";
console.info("start")
$(function(){
	if(getGameReport == "" && Game.reportError != undefined && Game.reportError != "") {
		getGameReport = Game.reportError;
		Game.reportError = function(msg, url, line, column, err, callback){
			console.info("normal running");
			console.info("msg = ",msg,"url = ",url,"err = ",err,"callback = ",callback)
			getGameReport(msg,url,line,column,err,callback);
		}
	}
})