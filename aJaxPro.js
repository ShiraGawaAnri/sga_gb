$(document).ajaxSend( function(event, jqXHR, options){
    alert("������1�� ��ǰԪ�ص�idΪ" + this.id + "�������urlΪ" + options.url);
} );

$(document).ajaxSend( function(event, jqXHR, options){
    alert("������2������ʽΪ" + options.type);
} );