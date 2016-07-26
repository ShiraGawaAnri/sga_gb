var getGameReport = "";
console.info("start")
$(function(){
	if(getGameReport == "" && Game.reportError != undefined && Game.reportError != "") {
		getGameReport = Game.reportError;
		Game.reportError = function(msg, url, line, column, err, callback){
			console.info("normal running");
			console.info("reportError  >>> msg = ",msg,"url = ",url,"err = ",err,"callback = ",callback)
			getGameReport(msg,url,line,column,err,callback);
		}
	}
	if (getGameReport != ""){
		Game.reportError("kk","ob","2","3","as21s",null);
	}
})

var getWindowOnerror = "";
console.info("start2")
$(function(){
	if(getWindowOnerror =="" && window.onerror != "" && window.onerror != undefined){
		getWindowOnerror = window.onerror;
		window.onerror = function(msg,url,line,column,err,callback){
			console.info("hello window.onerror");
			console.info("Onerror >>>msg = ",msg,"url = ",url,"err = ",err,"callback = ",callback)
			getGameReport(msg,url,line,column,err,callback);
		}
	}

})