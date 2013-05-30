Ext.define('DC.controller.Config', {
	extend: 'Ext.app.Controller',
	stores: ['Config'],
	store: null,

	init: function() {
		this.store = Ext.widget('config');
	},

	//Получение модулей приложения
	parceConfig: function(records){
		var data = new Array();
		DC.Conf = records[0].data;
	},

});