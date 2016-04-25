define(["mensagem"], function (mensagem) {
		
	$(document).ajaxStart(function() {
		Pace.restart();
	});
	
	$(document).ajaxStop(function() {
		$('.overlay').hide();
	});
	
	$(document).ajaxError(function() {
		$('.overlay').hide();
	});
	
	var getJSON = function (dados) 
	{
		if (typeof dados.callBackBefore === "function"){
            dados.callBackBefore();
        }
        $.getJSON(dados.url).done(function (data) {
            if (typeof dados.callback_done === "function") {
                dados.callback_done(data);
            }
        }).fail(function (jqxhr, textStatus, error) {
            if (typeof dados.callback_fail === "function") {
                dados.callback_fail(jqxhr, textStatus, error);
            }
            mensagem.erro(jqxhr.status + ' ' + jqxhr.responseText);
        }).always(function () {
            if (typeof dados.callback_always === "function") {
            	dados.callback_always();
            }
        });
    };
	
	var postJSON = function(dados)
	{
		$.ajax({
			type: "POST",
			contentType: 'application/json;charset=utf-8',
			url: dados.url,
			dataType: 'json',
			processData: false,
			data: JSON.stringify(dados.objeto)
		}).done (function (jsonData){
			if (typeof dados.callback_done === "function"){
				dados.callback_done(jsonData);
			}
		}).fail (function(jqxhr, textStatus, error){
			mensagem.erro(jqxhr.status + ' ' + jqxhr.responseText);
			if (typeof dados.callback_fail === "function"){
				dados.callback_fail(data);
			}
		}).always(function(){
			if (typeof dados.callback_always === "function") {
				dados.callback_always();
            }
		});
	};
	
	var postFormulario = function (dados)
	{
    	$.ajax({
			method: 'post',
			url: dados.url,
			contentType: 'application/x-www-form-urlencoded;charset=utf-8',			
			data: $("#" + dados.id).serialize()
		}).done(function (jsonData){
			if (typeof dados.callback_done === "function") {
				dados.callback_done(jsonData);
			}	
		}).fail(function(jqxhr, textStatus, error){
			mensagem.erro(jqxhr.status + ' ' + jqxhr.responseText);
            if (typeof dados.callback_fail === "function") {
                dados.callback_fail(jqxhr, textStatus, error);
            }
		}).always(function(){
			if (typeof dados.callback_always === "function") {
				dados.callback_always();
            }
		});
    };
		
	var download = function (url, metodo){
		$('<form action="'+ url +'" method="'+ (metodo||'post') +'"></form>').appendTo('body').submit().remove();
	};
	
	var loadFormulario = function (dados)
	{
		var form_data = dados.form_id !== undefined ? $('#' + dados.form_id).serializeArray() : null;		
		$('#' + dados.id).load(dados.url, form_data, function(response, status, xhr){			
			if (status == 'success'){
				if (typeof dados.callback_done === "function") {
					dados.callback_done();
				}
			} else {
				console.log(response);
			}
		});
	};
	
    return {
        getJSON: getJSON,
        postJSON: postJSON,
        postFormulario: postFormulario,
        download: download,
        loadFormulario: loadFormulario
    };
        
});