Ext.define('DC.store.Config', {
	extend: 'Ext.data.Store',
	//autoLoad: true,
	model: 'DC.model.Config',
	alias: 'widget.config',

	/*listeners:{
	    load:function( ddd, records, successful, eOpts) {

		   	if(successful == false){
		   		console.log(DC.controller);//.controller.Config.msg( 'Готово. ', 'ssss', Ext.MessageBox.INFO );
		   	}
		   	this.each(function(r) {
	            console.log('>>');
	            console.log(r.data);
	        });
	    }
	}*/

});