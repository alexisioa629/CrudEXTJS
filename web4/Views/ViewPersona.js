
var datosFormCrear;
var datosGridEliminar;
var datosGridEditar;
var datosFormEditarPer;


Ext.onReady(function () {

    Ext.Loader.setConfig({
        enabled: true
    });

    store = Ext.create('Ext.data.Store', {
        fields: ['idpersona', 'nombres', 'apellidos', 'correo', 'edad'],
        autoSync: true,
        data: null
    });

    this.formularioCrear = Ext.create('Ext.form.Panel', {
        id: 'formularioCrearPer',
        height: 'auto',
        width: 'auto',
        //region: 'north',
        defaultType: 'textfield',

        items: [
            {
                id: 'nombreForm',
                fieldLabel: 'Nombres',
                name: 'nombres'
            },
            {
                id: 'apellidosForm',
                fieldLabel: 'Apellidos',
                name: 'apellidos'
            },
            {
                id: 'correoForm',
                fieldLabel: 'Correo',
                name: 'correo'
            },
            {
                id: 'edadForm',
                fieldLabel: 'Edad',
                name: 'edad'
            },

        ],
        buttons: [
            {
                xtype: 'button',
                text: 'Agregar',
                handler:
                    function () {
                        datosFormCrear = this.up('form').getForm();
                        console.log(datosFormCrear.getValues())
                        ajaxCrearPersona()
                        location.reload();
                        
                       


                    }

            }
        ]

    })
    function activar() {
        this.win = new Ext.Window({
            id: 'ventanaCrear',
            title: 'Crear Persona',
            bodyStyle: 'padding:10px;background-color:#fff;',
            width: 300,
            height: 270,
            items: [this.formularioCrear]
            
        });

        this.win.show();
    }


    ajaxGetPersona();
    var grid = Ext.create('Ext.grid.Panel', {
        id: 'gridPersonas',
        title: 'Personas',
        type: 'grideditable',
        scrollable: true,
        triggerEvent: 'doubletap',
        enableDeleteButton: true,
        formConfig: null,
        //region: 'south',
        region: 'north',
        store: store,
       
        columns: [
            
            { text: 'Id', dataIndex: 'idpersona', width: 100 },
            { text: 'Nombres', dataIndex: 'nombres', width: 150 },
            { text: 'Apellidos', dataIndex: 'apellidos', width: 200 },
            { text: 'Correo', dataIndex: 'correo', width: 200 },
            { text: 'Edad', dataIndex: 'edad', width: 250 },
            
              
        ],
       

        tbar: [
            { text: "Agregar", scope: this, handler: activar },
            { text: "Editar", scope: this, handler: activarVentanaEditar },
            { text: "Delete", scope: this, handler: deletePersona }
        ],

        listeners: {
            itemclick: function (dv, record, item, index, e) {
                datosGridEliminar = record.data
                datosGridEditar = record
                
            }
        }
       

    })
    this.formularioEditar = Ext.create('Ext.form.Panel', {
        id: 'formularioEditarPer',
        height: 'auto',
        width: 'auto',
        defaultType: 'textfield',

        items: [
            {
                id: 'idpersonaForm',
                fieldLabel: 'Id Persona',
                name: 'idpersona',

            },
            {
                id: 'nombreForm',
                fieldLabel: 'Nombres',
                name: 'nombres',
              
            },
            {
                id: 'apellidosForm',
                fieldLabel: 'Apellidos',
                name: 'apellidos'
            },
            {
                id: 'correoForm',
                fieldLabel: 'Correo',
                name: 'correo'
            },
            {
                id: 'edadForm',
                fieldLabel: 'Edad',
                name: 'edad'
            },

        ],
        buttons: [
            {
                xtype: 'button',
                text: 'Editar',

                handler: function () {
                    datosFormEditarPer = this.up('form').getForm();
                    console.log(datosFormEditarPer.getValues())
                    ajaxEditarPersona()
                    //location.reload();
                }
                   
             }
        ]

    })


    function activarVentanaEditar() {
        this.win2 = new Ext.Window({
            id: 'ventanaEditar',
            title: 'Editar Persona',
            bodyStyle: 'padding:10px;background-color:#fff;',
            width: 300,
            height: 270,
            items: [this.formularioEditar]


        });
        formularioEditar.getForm().loadRecord(datosGridEditar)
        console.log(datosGridEditar)
        this.win2.show();
        

    }

    function deletePersona() {
        ajaxEliminarPersona()
        location.reload();
    }
    



    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [grid, /*formularioCrear*/]
    });


})
//funciones para hcer peticiones
function ajaxGetPersona() {
    Ext.Ajax.request({
        async: false,
        url: 'http://localhost:3000/persona/allpersonas',
        method: 'GET',
        timeout: 60000,
        headers:
        {
            'Content-Type': 'application/json'
        },
        success: function (response) {
            var data = JSON.parse(response.responseText)
            console.log(data)
            store.loadData(data)

            return data;
        },
        failure: function (response) {
            Ext.Msg.alert('Status', 'Time Out.');

        }
    });
}


function ajaxCrearPersona() {
    //datosEnviar.idpersona = Ext.getCmp('nombreForm');
    Ext.Ajax.request({
        async: false,
        url: 'http://localhost:3000/persona/createpersona',
        method: 'POST',
        timeout: 60000,
        ///params con parametros
        jsonData:
            datosFormCrear.getValues(),


        headers:
        {
            'Content-Type': 'application/json'
        },
        success: function (response) {
            var data = JSON.parse(response.responseText)
            return data;
        },
        failure: function (response) {
            Ext.Msg.alert('Status', 'Time Out.');

        }
    });
}


function ajaxEliminarPersona() {
    
    Ext.Ajax.request({
        async: false,
        url: 'http://localhost:3000/persona/deletepersona',
        method: 'POST',
        timeout: 60000,
        jsonData: 
            
            datosGridEliminar
        ,

        headers:
        {
            'Content-Type': 'application/json'
        },
        success: function (response) {
            var data = JSON.parse(response.responseText)
            return data;
        },
        failure: function (response) {
            Ext.Msg.alert('Status', 'Time Out.');

        }
    });
}


function ajaxEditarPersona() {

    Ext.Ajax.request({
        async: false,
        url: 'http://localhost:3000/persona/updatepersona',
        method: 'POST',
        timeout: 60000,
        jsonData:
            datosFormEditarPer.getValues(),

        headers:
        {
            'Content-Type': 'application/json'
        },
        success: function (response) {
            var data = JSON.parse(response.responseText)
            return data;
        },
        failure: function (response) {
            Ext.Msg.alert('Status', 'Time Out.');

        }
    });
}
