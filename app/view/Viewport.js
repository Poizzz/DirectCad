Ext.define('DC.view.Viewport', {
	extend: 'Ext.container.Viewport',
	layout: 'fit',
	cls: 'noselect',
	activeTab: 1,
	items: [{
		xtype: 'tabpanel',
		id: 'MainTabPanel',
		items:[
			{
				title: 'Заказы',
				itemId: 'Orders',
				disable: true
			},{
				title: 'Конструктор',
				id: 'CADTab',
				autoScroll: true,
				active : true
			}
		]
	}],
});
