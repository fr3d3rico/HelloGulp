/*
Módulo responsavel em controlar a exibicao de mensagens ao usuArio.
*/
define (function(){
	
	var estilos = ['alert-dismissible', 'alert-success', 'alert-danger', 'alert-warning', 'alert-info', 'alert'];
	
	var limpar = function (id){
		$('#'+id).html('');
		estilos.forEach(function(element, index) {
			$('#'+id).removeClass(element);
		});
	};
		
	/**
	 * Cria a div com o conteudo da mensagem (texto + botao de fechar)
	 */
	var criar_conteudo = function (id, txeto, classe) {
		$("<div id='"+id+"-conteudo'></div>").appendTo("#" + id);		
		$('#'+id+'-conteudo').addClass(classe);
		$('<button type="button" class="close" data-dismiss="alert">&times;</button>').appendTo("#"+id+"-conteudo");
		if (isArray(texto)){
			$("<ul id='"+id+"-ul'></ul>").appendTo("#"+id+"-conteudo");
			for (var i in texto){
				if (texto[i] !== ''){
					$("<li><strong>" + texto[i] + "</strong></li>").appendTo("#"+id+"-ul");
				}
			}
		} else {
			$("<strong>" + texto + "</strong>").appendTo("#"+id+"-conteudo");
		}		
	};
	
	var sucesso = function(texto, id) {		
		limpar(getId(id));
		criar_conteudo(getId(id), texto, 'alert alert-success alert-dismissible');		
		$('#'+getId(id)).show();
	};
	
	var erro = function (texto, id){
		limpar(getId(id));
		criar_conteudo(getId(id), texto, 'alert alert-danger alert-dismissible');
		$('#'+getId(id)).show();
	};
	
	var alerta = function(texto, id){
		limpar(getId(id));
		criar_conteudo(getId(id), texto, 'alert alert-warning alert-dismissible');		
		$('#'+getId(id)).show();
	};
	
	var informacao = function(texto, id){
		limpar(getId(id));
		criar_conteudo(getId(id), texto, 'alert alert-info alert-dismissible');		
		$('#'+getId(id)).show();
	};
	
	var esconder = function (id){
		$('#'+getId(id)).hide();
	};
	
	var isArray = function (o){
		return o.constructor.toString().indexOf("Array") > -1;
	};
	
	var getId = function (id){
		return id !== undefined ? id : 'mensagem';
	};
	
	return {		
		sucesso: sucesso,
		erro : erro,
		alerta : alerta,
		informacao: informacao,		
		esconder: esconder
	};
	
});