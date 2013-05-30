Ext.define('DC.view.CAD.Panel' ,{
	extend: 'Ext.Panel',
	alias: 'widget.CAD_Panel',
	id: 'CAD',
	//layout:'column',
	//width: 1000,
	border:false,
	defaults:{
        baseCls:'x-plain',
        bodyStyle:'padding:0px',
        width: 0	
	},
	items:[
		{text: 'Заказы'}
	]
});

