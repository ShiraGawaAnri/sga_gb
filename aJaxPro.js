//类的构建定义，主要职责就是新建XMLHttpRequest对象  
var MyXMLHttpRequest=function(){  
    var xmlhttprequest;  
    if(window.XMLHttpRequest){  
        xmlhttprequest=new XMLHttpRequest();  
        if(xmlhttprequest.overrideMimeType){  
            xmlhttprequest.overrideMimeType("text/xml");  
        }  
    }else if(window.ActiveXObject){  
        var activeName=["MSXML2.XMLHTTP","Microsoft.XMLHTTP"];  
        for(var i=0;i<activeName.length;i++){  
            try{  
                xmlhttprequest=new ActiveXObject(activeName[i]);  
                break;  
            }catch(e){  
                         
            }  
        }  
    }  
      
    if(xmlhttprequest == undefined || xmlhttprequest == null){  
        alert("XMLHttpRequest对象创建失败！！");  
    }else{  
        this.xmlhttp=xmlhttprequest;  
    }  
      
    //用户发送请求的方法  
    MyXMLHttpRequest.prototype.send=function(method,url,data,callback,failback){  
        if(this.xmlhttp!=undefined && this.xmlhttp!=null){  
            method=method.toUpperCase();  
            if(method!="GET" && method!="POST"){  
                alert("HTTP的请求方法必须为GET或POST!!!");  
                return;  
            }  
            if(url==null || url==undefined){  
                alert("HTTP的请求地址必须设置！");  
                return ;  
            }  
            var tempxmlhttp=this.xmlhttp;  
            this.xmlhttp.onreadystatechange=function(){  
                if(tempxmlhttp.readyState==4){  
                    if(temxmlhttp.status==200){  
                        var responseText=temxmlhttp.responseText;  
                        var responseXML=temxmlhttp.reponseXML;  
                        if(callback==undefined || callback==null){  
                            alert("没有设置处理数据正确返回的方法");  
                            alert("返回的数据：" + responseText);  
                        }else{  
                            callback(responseText,responseXML);  
                        }  
                    }else{  
                        if(failback==undefined ||failback==null){  
                            alert("没有设置处理数据返回失败的处理方法！");  
                            alert("HTTP的响应码：" + tempxmlhttp.status + ",响应码的文本信息：" + tempxmlhttp.statusText);  
                        }else{  
                            failback(tempxmlhttp.status,tempxmlhttp.statusText);  
                        }  
                    }  
                }  
            }  
              
            //解决缓存的转换  
            if(url.indexOf("?")>=0){  
                url=url + "&t=" + (new Date()).valueOf();  
            }else{  
                url=url+"?+="+(new Date()).valueOf();  
            }  
              
            //解决跨域的问题  
            if(url.indexOf("http://")>=0){  
                url.replace("?","&");  
                url="Proxy?url=" +url;  
            }  
            this.xmlhttp.open(method,url,true);  
              
            //如果是POST方式，需要设置请求头  
            if(method=="POST"){  
                this.xmlhttp.setRequestHeader("Content-type","application/x-www-four-urlencoded");  
            }  
            this.xmlhttp.send(data);  
    }else{  
        alert("XMLHttpRequest对象创建失败，无法发送数据！");  
    }  
    MyXMLHttpRequest.prototype.abort=function(){  
        this.xmlhttp.abort();  
    }  
  }  
}
$.ajaxPrefilter( function(options, originalOptions, jqXHR){
    // options对象 包括accepts、crossDomain、contentType、url、async、type、headers、error、dataType等许多参数选项
    // originalOptions对象 就是你为$.ajax()方法传递的参数对象，也就是 { url: "/index.php" }
    // jqXHR对象 就是经过jQuery封装的XMLHttpRequest对象(保留了其本身的属性和方法)
	console.log("t1",option.url)
	console.log("t2",orginalOptions.url)
	console.log("t3",jqXHR.url)
    //options.type = "GET"; // 将请求方式改为GET
    //options.headers = { }; // 清空自定义的请求头
});
$.ajax({
        type: 'GET',
        url:'http://shiragawaanri.github.io/sga_gb/version.txt',
        async:false,
        dataType:'text',
		scriptCharset:'utf-8',
       });
