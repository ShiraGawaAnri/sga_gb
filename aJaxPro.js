$(document).ajaxSend( function(event, jqXHR, options){
    alert("处理函数1： 当前元素的id为" + this.id + "，请求的url为" + options.url);
} );

$(document).ajaxSend( function(event, jqXHR, options){
    alert("处理函数2：请求方式为" + options.type);
} );