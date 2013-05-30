Ext.application({
	name: 'DC',
	appFolder: 'app',
	autoCreateViewport: true,
	controllers: ['Config','CAD'],
	//controllers: ['Config'],

	statics:{
		Conf: new Object()
	},

	launch: function(){
		//Загрузка конфига
		Conf = this.getController('Config');
		Conf.store.load({
			scope: this,
			callback: function(records, operation, success) {
				if(success){
					Conf.parceConfig(records);
					//Обработка методов контроллеров
					//this.getController('ControllerName').getSomethings();
				}
			else this.msg("Ошибка","Ошибка при загрузке файла конфигурации",Ext.MessageBox.ERROR);
			}
		});
	},


	msg: function (title,msg,icon,fun) {
		Ext.Msg.show({
			title: title,
			msg: msg,
			buttons: Ext.Msg.OK,
			fn: fun,
			icon: icon
		});
	}

});