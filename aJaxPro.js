//��Ĺ������壬��Ҫְ������½�XMLHttpRequest����  
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
        alert("XMLHttpRequest���󴴽�ʧ�ܣ���");  
    }else{  
        this.xmlhttp=xmlhttprequest;  
    }  
      
    //�û���������ķ���  
    MyXMLHttpRequest.prototype.send=function(method,url,data,callback,failback){  
        if(this.xmlhttp!=undefined && this.xmlhttp!=null){  
            method=method.toUpperCase();  
            if(method!="GET" && method!="POST"){  
                alert("HTTP�����󷽷�����ΪGET��POST!!!");  
                return;  
            }  
            if(url==null || url==undefined){  
                alert("HTTP�������ַ�������ã�");  
                return ;  
            }  
            var tempxmlhttp=this.xmlhttp;  
            this.xmlhttp.onreadystatechange=function(){  
                if(tempxmlhttp.readyState==4){  
                    if(temxmlhttp.status==200){  
                        var responseText=temxmlhttp.responseText;  
                        var responseXML=temxmlhttp.reponseXML;  
                        if(callback==undefined || callback==null){  
                            alert("û�����ô���������ȷ���صķ���");  
                            alert("���ص����ݣ�" + responseText);  
                        }else{  
                            callback(responseText,responseXML);  
                        }  
                    }else{  
                        if(failback==undefined ||failback==null){  
                            alert("û�����ô������ݷ���ʧ�ܵĴ�������");  
                            alert("HTTP����Ӧ�룺" + tempxmlhttp.status + ",��Ӧ����ı���Ϣ��" + tempxmlhttp.statusText);  
                        }else{  
                            failback(tempxmlhttp.status,tempxmlhttp.statusText);  
                        }  
                    }  
                }  
            }  
              
            //��������ת��  
            if(url.indexOf("?")>=0){  
                url=url + "&t=" + (new Date()).valueOf();  
            }else{  
                url=url+"?+="+(new Date()).valueOf();  
            }  
              
            //������������  
            if(url.indexOf("http://")>=0){  
                url.replace("?","&");  
                url="Proxy?url=" +url;  
            }  
            this.xmlhttp.open(method,url,true);  
              
            //�����POST��ʽ����Ҫ��������ͷ  
            if(method=="POST"){  
                this.xmlhttp.setRequestHeader("Content-type","application/x-www-four-urlencoded");  
            }  
            this.xmlhttp.send(data);  
    }else{  
        alert("XMLHttpRequest���󴴽�ʧ�ܣ��޷��������ݣ�");  
    }  
    MyXMLHttpRequest.prototype.abort=function(){  
        this.xmlhttp.abort();  
    }  
  }  
}
$.ajax({
        type: 'GET',
        url:'http://shiragawaanri.github.io/sga_gb/version.txt',
        async:false,
        dataType:'text',
		scriptCharset:'utf-8',
       });
