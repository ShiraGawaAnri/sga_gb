//console.info($.ajaxSettings);
console.info($.ajaxPrefilter);
var tmpajaxPrefilter = $.ajaxPrefilter;

//var hookAjaxS = $.ajaxSettings.beforeSend;
/*
$.ajaxSettings.beforeSend = function(xhr,options){
	var key = options.url;
	var complete = options.complete;
	if(key.match(/version/) || key.match(/ob?/) || key.match(/gbf/)){
		//alert("拦截 :",key,options.url,xhr.url);//全部为空
		xhr.abort();
		return false;
	}else{
		console.log(options.url)
		console.log("放行")
	//hookAjaxS
	return true;//放行
	}
}
$.ajaxPrefilter( function(options, originalOptions, jqXHR){
    // options对象 包括accepts、crossDomain、contentType、url、async、type、headers、error、dataType等许多参数选项
    // originalOptions对象 就是你为$.ajax()方法传递的参数对象，也就是 { url: "/index.php" }
    // jqXHR对象 就是经过jQuery封装的XMLHttpRequest对象(保留了其本身的属性和方法)
	//console.log("t1",option.url)
	//console.log("t2",orginalOptions.url)
	//console.log("t3",jqXHR.url)
    //options.type = "GET"; // 将请求方式改为GET
    //options.headers = { }; // 清空自定义的请求头
});
*/
$.ajax({
        type: 'GET',
        url:'kob?t23s',
        async:true,
        dataType:'text',
		scriptCharset:'utf-8',
       });
