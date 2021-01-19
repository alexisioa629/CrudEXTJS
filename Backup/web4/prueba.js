Ext.onReady(function () {

Ext.Loader.setConfig({
    enabled: true
});
var form1=Ext.create('Ext.form.Panel', {
    //renderTo: document.body,
    title: 'User Form',
    height: 350,
    width: 300,
    bodyPadding: 10,
    defaultType: 'textfield',
    items: [
        {
            fieldLabel: 'First Name',
            name: 'firstName'
        },
        {
            fieldLabel: 'Last Name',
            name: 'lastName'
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Date of Birth',
            name: 'birthDate'
        }
    ]
});
    var store = Ext.create('Ext.data.Store', {
        fields: ['name', 'email', 'phone'],
        data: [
            { 'name': 'Lisa', "email": "lisa@simpsons.com", "phone": "555-111-1224" },
            { 'name': 'Bart', "email": "bart@simpsons.com", "phone": "555-222-1234" },
            { 'name': 'Homer', "email": "home@simpsons.com", "phone": "555-222-1244" },
            { 'name': 'Marge', "email": "marge@simpsons.com", "phone": "555-222-1254" }
        ]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        title: 'Simpsons',

        store: store,

        columns: [
            { text: 'Name', dataIndex: 'name', width: 200 },
            { text: 'Email', dataIndex: 'email', width: 250 },
            { text: 'Phone', dataIndex: 'phone', width: 120 }
        ],

        height: 200,
        layout: 'fit',
        fullscreen: true
    });

Ext.create('Ext.container.Viewport', {
    layout: 'border',
    items: [form1]
});
});