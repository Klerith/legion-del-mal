Ext.define('AppProveedores.view.FormProveedores', {
    extend: 'Ext.form.Panel',
    alias: 'widget.formproveedores',
    itemId: 'formproveedores',
    xtype: 'formproveedores',
    bodyPadding: 5,
    width: 700,
    border:true,
    fieldDefaults: {
        labelAlign: 'top',
        msgTarget: 'side'
    },
    defaults: {
        anchor: '100%'
    },
    url: 'CrearProveedor/save',
    initComponent: function () {
        
        var storeEstado = Ext.create('AppProveedores.store.StoreEstado');
        var storeCuentaProv = Ext.create('AppProveedores.store.StoreCuenta');
        var storeCuentaIvaProv = Ext.create('AppProveedores.store.StoreCuenta');
        var storeCuentaGasto = Ext.create('AppProveedores.store.StoreCuenta');
        var storeCuentaIvaPag = Ext.create('AppProveedores.store.StoreCuenta');
        var storeCuentaCompl = Ext.create('AppProveedores.store.StoreCuenta');
        var storeBancosSat = Ext.create('AppProveedores.store.StoreBanco');
        var storeBancosSatDlls = Ext.create('AppProveedores.store.StoreBanco');
        var storeTipoPoliza = Ext.create('AppProveedores.store.StoreTipoPoliza');
        var storeBancosPago = Ext.create('AppProveedores.store.StoreBancoPago');
        var storePais = Ext.create('AppProveedores.store.StorePais');
        var tTercero = Ext.create('AppProveedores.store.StoretTercero');
        var tOperacion = Ext.create('AppProveedores.store.StoretOperacion');
        var tOperacionDiot = Ext.create('AppProveedores.store.StoretOperacionDiot');
        var conceptoDefault = Ext.create('AppProveedores.store.StoreConceptoD');
        var ctoDefault = Ext.create('AppProveedores.store.StoreCC');
        var storeClasificacion = Ext.create('AppProveedores.store.StoreClasificacion');
        
        
        var tPersona = Ext.create('Ext.data.Store', {
            fields: ['CLAVE', 'NOMBRE'],
                data : [
                    {"CLAVE":"F", "NOMBRE":"F-Fisica"},
                    {"CLAVE":"M", "NOMBRE":"M-Moral"}
                    
                   
                 
                ]
            });
            
            var tCuenta = Ext.create('Ext.data.Store', {
            fields: ['CLAVE', 'NOMBRE'],
                data : [
                    {"CLAVE":"NAC", "NOMBRE":"NACIONAL"},
                    {"CLAVE":"EXT", "NOMBRE":"EXTRANJERO"}
                    
                   
                 
                ]
             });
             
             var tCuentaValida = Ext.create('Ext.data.Store', {
            fields: ['CLAVE', 'NOMBRE'],
                data : [
                    {"CLAVE":"1", "NOMBRE":"CUENTA CLABE"},
                    {"CLAVE":"2", "NOMBRE":"NUMERO CUENTA"},
                     {"CLAVE":"3", "NOMBRE":"SWIFT"}
                   
                 
                ]
             });
             var tCuentaValidaDlls = Ext.create('Ext.data.Store', {
            fields: ['CLAVE', 'NOMBRE'],
                data : [
                    {"CLAVE":"1", "NOMBRE":"CUENTA CLABE"},
                    {"CLAVE":"2", "NOMBRE":"NUMERO CUENTA"},
                     {"CLAVE":"3", "NOMBRE":"SWIFT"}
                   
                 
                ]
             });
            
            var tMoneda = Ext.create('Ext.data.Store', {
            fields: ['CLAVE', 'NOMBRE'],
                data : [
                    {"CLAVE":"PES", "NOMBRE":"PESOS"},
                    {"CLAVE":"USD", "NOMBRE":"DOLARES"},
                    {"CLAVE":"EUR", "NOMBRE":"EUROS"}
                    
                   
                 
                ]
            });
            
            var tActivacion  = Ext.create('Ext.data.Store', {
            fields: ['CLAVE', 'NOMBRE'],
                data : [
                    {"CLAVE":"0", "NOMBRE":"INACTIVA"},
                    {"CLAVE":"1", "NOMBRE":"ACTIVA"}
                    
                   
                 
                ]
             });
        var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
        Ext.apply(this, {
        buttons: [
        {
        text: 'Guardar',
                itemId: 'btnSaveProveedor',
                id: 'btnSaveProveedor',
                action: 'saveProveedor',
                scope: this,
                handler: function (btn) {
                    
                    console.log('save');
                    this.fireEvent("saveProveerdor", btn);
                }

        }, {
        text: 'Cancelar',
                scope: this,
                handler: function () {
                    this.up('window').close();
                }
        }],
                items: [
                {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [{
                                xtype: 'container',
                                flex: 1,
                                border: false,
                                layout: 'anchor',
                                defaultType: 'textfield',
                                items: [
                                {
                                        fieldLabel: 'COMPANIA',
                                        name: 'COMPANIA',
                                        id:'companiaProv',
                                        hidden: true,
                                        allowBlank: true
                                },
                                {
                                        fieldLabel:'Clave Proveedor:',
                                        allowBlank: true,
                                        //afterLabelTextTpl: required,
                                        name: 'ID_CLIENTE',
                                        disabled:true,
                                        //readOnly:true,
                                        id:'idClienteProv',
                                        //enforceMaxLength: true,
                                        //maxLength: 10,
                                        anchor: '95%',
                                        listeners:{
                                           // change: function (field, newValue, oldValue) {
                                           //     field.setValue(newValue.toUpperCase());
                                           // }
                                        }
                                },
                                {
                                fieldLabel: 'Nombre Corto',
                                        name: 'NOMBRE',
                                        id:'nombreProv',
                                        allowBlank: false,
                                        afterLabelTextTpl: required,
                                        enforceMaxLength: true,
                                        maxLength: 200,
                                        anchor: '95%',
                                        listeners:{
                                        change: function (field, newValue, oldValue) {
                                            field.setValue(newValue.toUpperCase());
                                        }
                                        }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Persona',
                                    name: 'cboPersona',
                                    id: 'cboPersona', 
                                    afterLabelTextTpl: required,
                                    store: tPersona,
                                    anchor: '95%',
                                    queryMode: 'local',
                                    readOnly: false,
                                    hidden:false,
                                    displayField: 'NOMBRE',
                                    valueField: 'CLAVE',
                                    allowBlank: false
                                }

                                ]
                        }, {
                        xtype: 'container',
                                flex: 1,
                                layout: 'anchor',
                                defaultType: 'textfield',
                                items: [
                                {
                                fieldLabel: 'RFC',
                                        afterLabelTextTpl: required,
                                        allowBlank: false,
                                        name: 'RFC',
                                        id:'rfcProv',
                                        enforceMaxLength: true,
                                        maxLength: 30,
                                        anchor: '95%',
                                        listeners:{
                                        change: function (field, newValue, oldValue) {
                                            field.setValue(newValue.toUpperCase());
                                        }
                                        }
                                },
                                {
                                fieldLabel: "RazÃ³n Social",
                                        afterLabelTextTpl: required,
                                        allowBlank: false,
                                        name: 'RAZON_SOCIAL',
                                        id:'razonSocialProv',
                                        enforceMaxLength: true,
                                        maxLength: 400,
                                        anchor: '95%',
                                        listeners:{
                                        change: function (field, newValue, oldValue) {
                                            field.setValue(newValue.toUpperCase());
                                        }
                                        }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Moneda',
                                    name: 'cboMonedaProv',
                                    id: 'cboMonedaProv',
                                    afterLabelTextTpl: required,
                                    store: tMoneda,
                                    queryMode: 'local',
                                    anchor: '95%',
                                    readOnly: false,
                                    hidden:false,
                                    displayField: 'NOMBRE',
                                    valueField: 'CLAVE',
                                    allowBlank: false
                                }
                                ]
                        }]
                },
                {
                xtype: 'tabpanel',
                        id:'tab',
                        plain: true,
                        layout:'fit',
                        
                        defaults: {
                            bodyPadding: 5
                        },
                        items: [
                        {
                                title: 'Generales',
                                layout: 'hbox',
                                defaultType: 'textfield',
                                split: true,
                                autoScroll: true,
                                bodyPadding: 5,
                                items: [
                                {
                                xtype: 'container',
                                        flex: 1,
                                        border: false,
                                        layout: 'anchor',
                                        
                   
                                        defaultType: 'textfield',
                                        defaults: {
                                        width: 200
                                        },
                                        items: [
                                            {
                                                fieldLabel: 'Dias de Credito',
                                                name: 'DIAS',
                                                xtype:'numberfield',
                                                id:'diasProv',
                                               
                                                allowBlank: true,
                                                listeners:{
                                                   
                                                }
                                        },

                                      
                                          {
                                                xtype: 'combobox',
                                                        name: 'cbotOperacion',
                                                        fieldLabel: "T. Operacion Cont. Elect.",
                                                        //afterLabelTextTpl: required,
                                                        allowBlank: true,                                                      
                                                        editable:false,                                                 
                                                        id: 'cbotOperacion',
                                                        store: tOperacion,
                                                        minChars: 3,
                                                        displayField: 'NOMBRE',
                                                        valueField: 'ID',
                                                        typeAhead: false,
                                                        validateOnChange: true,
                                                        hideTrigger: false,
                                                        listConfig: {
                                                            loadingText: 'Buscando...',
                                                            emptyText: 'No se encontro tipo Operacion.',
                                                            getInnerTpl: function() {
                                                                return '<span style="color:green;font-weight: bold">{ID}</span><h3>{NOMBRE}</h3>';
                                                            }
                                                        },
                                                        listeners: {
                                                            scope: this,
                                                            select: function(value) {


                                                            }





                                                        }//,
                                                                
                                                },
                                                  {
                                                xtype: 'checkboxfield',
                           
                                                        name      : 'addBanderaViatic',
                                                       
                                                        inputValue: '1',
                                                        boxLabel  : 'Agregar a Viaticos',
                                                        //checked   : false,
                                                        id        : 'checkbox1',
                                                    
                                                
                                                 listeners: {
                                                        scope: this,
                                                        checkChange: function() {
                                                            console.log('hay un cambio');
                                                           // this.fireEvent("nombreCuenta", value.valueModels[0].data.NOMBRE, value.valueModels[0].data.CUENTA);
                                                        }
                                                    }
                                            }
                                            
                                           


                                        ]
                                },
                                {
                                        xtype: 'container',
                                        flex: 1,
                                        border: false,
                                        layout: 'anchor',
                                        defaultType: 'textfield',
                                        defaults: {
                                        width: 200
                                        },
                                        items: [
                                            
                                          
                                              {
                                                fieldLabel: 'Banco para pago',
                                                name: 'BANCO_PAGO',
                                                xtype: 'combobox',
                                                id:'bancoPagoProv',
                                                allowBlank: true,
                                                hidden:true,
                                                store: storeBancosPago,
                                                        minChars: 3,
                                                        displayField: 'NOMBRE1',
                                                        valueField: 'CLAVE',
                                                        typeAhead: false,
                                                        validateOnChange: true,
                                                       
                                                        hideTrigger: false,
                                                        listConfig: {
                                                            loadingText: 'Buscando...',
                                                            emptyText: 'No se encontro el banco.',
                                                            getInnerTpl: function() {
                                                                return '<span style="color:green;font-weight: bold">{CLAVE}</span><h3>{NOMBRE}</h3>';
                                                            }
                                                        },
                                                        listeners: {
                                                            scope: this,
                                                            select: function(value) {


                                                            }





                                                        }//,
                                        },
                                        {

                                        xtype: 'textfield',
                                                fieldLabel:'Telefono',
                                                name: 'TELEFONO',
                                                id: 'txtTELEFONO',
                                                minLength: 8,
                                                enforceMaxLength: true,
                                                maxLength: 11,
                                                maskRe: /[0-9]/,
                                                listeners: {
                                                scope: this,
                                                        
                                                        change: function (field, newValue, oldValue) {
                                                            field.setValue(newValue.toUpperCase());
                                                        }

                                                }

                                        },
                                          {
                                                xtype: 'combobox',
                                                        name: 'cbotTercero',
                                                        fieldLabel: "T. Tercero",
                                                        //afterLabelTextTpl: required,
                                                        allowBlank: true,                                                      
                                                        editable:false,                                                 
                                                        id: 'cbotTercero',
                                                        store: tTercero,
                                                        minChars: 3,
                                                        displayField: 'NOMBRE',
                                                        valueField: 'TIPO',
                                                        typeAhead: false,
                                                        validateOnChange: true,
                                                        hideTrigger: false,
                                                        listConfig: {
                                                            loadingText: 'Buscando...',
                                                            emptyText: 'No se encontro tipo tercero.',
                                                            getInnerTpl: function() {
                                                                return '<span style="color:green;font-weight: bold">{TIPO}</span><h3>{NOMBRE}</h3>';
                                                            }
                                                        },
                                                        listeners: {
                                                            scope: this,
                                                            select: function(value) {


                                                            }





                                                        }//,
                                                                
                                                },
                                                      {
                                                xtype: 'combobox',
                                                        name: 'cboConceptoDefault',
                                                        fieldLabel: "Concepto (Default)",
                                                        //afterLabelTextTpl: required,
                                                        allowBlank: true,                                                      
                                                        editable:true,                                                 
                                                        id: 'cboConceptoDefault',
                                                        store: conceptoDefault,
                                                        minChars: 3,
                                                        displayField: 'NOMBRE',
                                                        valueField: 'CONCEPTO',
                                                        typeAhead: false,
                                                        validateOnChange: true,
                                                        hideTrigger: false,
                                                        listConfig: {
                                                            loadingText: 'Buscando...',
                                                            emptyText: 'No se encontro Concepto.',
                                                            getInnerTpl: function() {
                                                                return '<span style="color:green;font-weight: bold">{CONCEPTO}</span><h3>{NOMBRE}</h3>';
                                                            }
                                                        },
                                                        listeners: {
                                                            scope: this,
                                                            select: function(value) {


                                                            }





                                                        }//,
                                                                
                                                },
                                                {
                                                        fieldLabel: 'Auxiliar',
                                                        name: 'AUXILIAR',
                                                        id:'auxiliarProv',
                                                        enforceMaxLength: true,
                                                        //minLength: 13,
                                                        maxLength: 10,
                                                        hidden:true,
                                                        allowBlank: true,
                                                        listeners:{
        //                                                    change: function (field, newValue, oldValue) {
        //                                                        field.setValue(newValue.toUpperCase());
        //                                                    }
                                                        }
                                                },
                                                
                                                      {
                                                xtype: 'combobox',
                                                        name: 'cboctoDefault',
                                                        fieldLabel: "C. Costos (Default)",
                                                        //afterLabelTextTpl: required,
                                                        allowBlank: true,                                                      
                                                        editable:false,                                                 
                                                        id: 'cboctoDefault',
                                                        store: ctoDefault,
                                                        minChars: 3,
                                                        displayField: 'CTO_NAME',
                                                        valueField: 'CTO',
                                                        typeAhead: false,
                                                        validateOnChange: true,
                                                        hideTrigger: false,
                                                        listConfig: {
                                                            loadingText: 'Buscando...',
                                                            emptyText: 'No se encontro C. Costos',
                                                            getInnerTpl: function() {
                                                                return '<span style="color:green;font-weight: bold">{CTO}</span><h3>{CTO_NAME}</h3>';
                                                            }
                                                        },
                                                        listeners: {
                                                            scope: this,
                                                            select: function(value) {


                                                            }





                                                        }//,
                                                                
                                                }
                                              
                                               

                                       
                                 
                                        ]
                                }
                                ]
                        },
                        
                        {
                                title: 'Datos de Cuenta',
                                layout: 'hbox',
                                defaultType: 'textfield',
                                split: true,
                                autoScroll: true,
                                bodyPadding: 5,
                                items: [
                                {
                                xtype: 'container',
                                        flex: 1,
                                        border: false,
                                        layout: 'anchor',
                                        
                   
                                        defaultType: 'textfield',
                                        defaults: {
                                        width: 200
                                        },
                                        items: [
                                      

                                        {
                                                fieldLabel: 'Correo',
                                                name: 'CORREO',
                                                id:'correoProv',
                                                enforceMaxLength: true,
                                                //minLength: 13,
                                                maxLength: 50,
                                                allowBlank: true,
                                                listeners:{
//                                                    change: function (field, newValue, oldValue) {
//                                                        field.setValue(newValue.toUpperCase());
//                                                    }
                                                }
                                        },
                                        {
                                                fieldLabel: 'Correo 2',
                                                name: 'CORREO2',
                                                id:'correo2Prov',
                                                enforceMaxLength: true,
                                                //minLength: 13,
                                                maxLength: 50,
                                                allowBlank: true,
                                                listeners:{
//                                                    change: function (field, newValue, oldValue) {
//                                                        field.setValue(newValue.toUpperCase());
//                                                    }
                                                }
                                        },
                                        
                                        
                                        {
                                                fieldLabel: 'Password',
                                                name: 'PASSWORD',
                                                id:'passProv',
                                                enforceMaxLength: true,
                                                //minLength: 13,
                                                maxLength: 50,
                                                allowBlank: true,
                                                listeners:{
//                                                    change: function (field, newValue, oldValue) {
//                                                        field.setValue(newValue.toUpperCase());
//                                                    }
                                                }
                                        },
                                        
                                             {
                                            xtype: 'combobox',
                                            fieldLabel: 'Cuenta Activa',
                                            name: 'ACTIVACION',
                                            id: 'cboACTIVACIONProv',
                                            afterLabelTextTpl: required,
                                            store: tActivacion,
                                            queryMode: 'local',
                                            //anchor: '95%',
                                            readOnly: false,
                                            hidden:false,
                                            displayField: 'NOMBRE',
                                            valueField: 'CLAVE',
                                            allowBlank: false,
                                             listeners: {
                                                            scope: this,
                                                            select: function(value) {
                                                                
                                                              

                                                            }





                                                        }//,
          
                                        }
                                           


                                        ]
                                },
                                {
                                        xtype: 'container',
                                        flex: 1,
                                        border: false,
                                        layout: 'anchor',
                                        defaultType: 'textfield',
                                        defaults: {
                                        width: 200
                                        },
                                        items: [
                                            
                                            {
                                            xtype: 'combobox',
                                            fieldLabel: 'Tipo Cuenta',
                                            name: 'TIPO_CUENTA',
                                            id: 'cboTipoCuentaProv',
                                            afterLabelTextTpl: required,
                                            store: tCuenta,
                                            queryMode: 'local',
                                            //anchor: '95%',
                                            readOnly: false,
                                            hidden:false,
                                            displayField: 'NOMBRE',
                                            valueField: 'CLAVE',
                                            allowBlank: false,
                                             listeners: {
                                                            scope: this,
                                                            select: function(value) {
                                                                
                                                                                                  
                                                                if(value.value === 'EXT'){
                                                                   Ext.getCmp('cboBANCO').allowBlank = true;
                                                                   Ext.getCmp('rfcProv').setValue('XEXX010101000');

                                                               }else{
                                                                   
                                                                   var extran =  Ext.getCmp('rfcProv').getValue();
                                                                   if (extran === 'XEXX010101000'){
                                                                       Ext.getCmp('rfcProv').setValue('');
                                                                   }
                                                                   Ext.getCmp('cboBANCO').allowBlank = false;
                                                               }


                                                            }





                                                        }//,
          
                                        }
                                       
                                               

                                       
                                 
                                        ]
                                }
                                ]
                        },

                                            {
                              
                                                xtype:'gridproductos',
                                                height: 360
//                  

                        },
                        {
                                
                                xtype: 'container',
                                title: 'Direccion',
                                layout: 'hbox',
                                defaultType: 'textfield',
                                items: [
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        border: false,
                                        layout: 'anchor',
                                        defaultType: 'textfield',
//                                        defaults: {
//                                            width: 200
//                                        },
                                        items: [
                                            {
                                                xtype: 'fieldset',
                                                title: 'Direccion',
                                                defaultType: 'textfield',
                                                layout: 'anchor',
                                                defaults: {
                                                    anchor: '100%'
                                                },
                                                items: [
                                                    
                                                    {
                                                        xtype: 'container',
                                                        layout: 'hbox',
                                                        margin: '0 0 5 0',
                                                        items: [
                                                            
                                                            {
                                                                xtype: 'combobox',
                                                                name: 'PAIS',
                                                                id:'paisProv',
                                                                forceSelection: true,
                                                                //maxLength: 2,
                                                                //enforceMaxLength: true,
                                                                billingFieldName: 'billingState',
                                                                fieldLabel: 'Pais',
                                                                labelWidth: 50,
                                                                width: 112,
                                                                //afterLabelTextTpl: required,
                                                               store: storePais,
                                                                valueField: 'PAIS',
                                                                displayField: 'NOMBRE',
                                                                typeAhead: true,
                                                             
                                                                allowBlank: false,
                                                                listeners: {
                                                                    scope: this,
                                                                    'select': function(valor) {

                                                                         if (Ext.isEmpty(valor.value))
                                                                            return;
                                                                        Ext.getCmp('estadoProv').clearValue();
                                                                       // Ext.getCmp('cboPeriodoFe').setReadOnly(false);
                                                                        storeEstado.removeAll();
                                                                        storeEstado.proxy.extraParams.pais = valor.value;
                                                                        storeEstado.load({
                                                                            callback: function(val, val2) {

                                                                            }
                                                                        });

                                                                    }
                                                                 }
                                                            },
                                                            {
                                                                xtype: 'combobox',
                                                                name: 'ESTADO',
                                                                id:'estadoProv',
                                                                forceSelection: true,
                                                                //maxLength: 2,
                                                                //enforceMaxLength: true,
                                                                billingFieldName: 'billingState',
                                                                fieldLabel: 'Estado',
                                                                labelWidth: 50,
                                                                width: 140,
                                                              //  afterLabelTextTpl: required,
                                                               store: storeEstado,
                                                                valueField: 'ESTADO',
                                                                displayField: 'NOMBRE',
                                                                typeAhead: true,
                                                             
                                                                allowBlank: true
                                                            },
                                                            {
                                                                labelWidth: 110,
                                                                xtype: 'textfield',
                                                                fieldLabel: 'Delegacion',
                                                                name: 'DELEGACION',
                                                                id:'delegacionProv',
                                                               // afterLabelTextTpl: required,
                                                                flex: 1,
                                                                allowBlank: true
                                                            }
                                                         ]
                                                    },
                                                      {
                                                        xtype: 'container',
                                                        layout: 'hbox',
                                                        margin: '0 0 5 0',
                                                        items: [
                                                            {
                                                                labelWidth: 110,
                                                                xtype: 'textfield',
                                                                fieldLabel: 'Colonia',
                                                                name: 'COLONIA',
                                                                id:'coloniaProv',
                                                                //afterLabelTextTpl: required,
                                                                flex: 1,
                                                                allowBlank: true
                                                            }, 
                                                            
                                                            {
                                                                xtype: 'textfield',
                                                                fieldLabel: 'CP',
                                                               // afterLabelTextTpl: required,
                                                                id:'cpProv',
                                                                labelWidth: 80,
                                                                name: 'mailingPostalCode',
                                                                width: 160,
                                                                allowBlank: true,
                                                                maxLength: 10,
                                                                enforceMaxLength: true,
                                                                maskRe: /[\d\-]/,
                                                                regex: /^\d{5}(\-\d{4})?$/,
                                                                regexText: 'Must be in the format xxxxx or xxxxx-xxxx'
                                                            }
                                                                ]
                                                    },
                                                    {
                                                        labelWidth: 110,
                                                        fieldLabel: 'Calle',
                                                        name: 'CALLE',
                                                        id:'calleProv'
                                                      
                                                    }, 
                                                    {
                                                        xtype: 'container',
                                                        layout: 'hbox',
                                                        hidden:true,
                                                        margin: '0 0 5 0',
                                                        items: [
                                                            {
                                                                labelWidth: 110,
                                                                xtype: 'numberfield',
                                                                fieldLabel: 'No. Interior',
                                                                name: 'NO_INTERIOR',
                                                                id:'NO_INTERIOR',
                                                                //afterLabelTextTpl: required,
                                                                width: 160,
                                                                allowBlank: true
                                                            },
                                                            {
                                                                labelWidth: 110,
                                                                xtype: 'numberfield',
                                                                fieldLabel: 'No. Exterior',
                                                                name: 'NO_EXTERIOR',
                                                                id:'NO_EXTERIOR',
                                                                //afterLabelTextTpl: required,
                                                                width: 160,
                                                                allowBlank: true
                                                            } 
                                                            
                                                         ]
                                                    },
                                                    {
                                                        labelWidth: 110,
                                                        fieldLabel: 'Direccion (Extranjeros)',
                                                        name: 'DIRECCION',
                                                        id:'DIRECCION'
                                                      
                                                    } 
                                                  

                                                            ]
                                                        }
                                                ]
                                        }
                                        ]
                               },
                               {
                                        title: 'Cuentas',
                                        itemId: 'btnPanelDatosCta',
                                         id: 'btnPanelDatosCta',
                                        layout: 'hbox',
                                        defaultType: 'textfield',
                                        items: [
                                        {
                                                xtype: 'container',
                                                flex: 1,
                                                border: false,
                                                layout: 'anchor',
                                                defaultType: 'textfield',
                                                defaults: {
                                                width: 200
                                                },
                                                items: [
                                               
                                                {
                   
                                                xtype: 'combobox',
                                                name: 'CUENTA_CONTABLE',
                                                id: 'cboCUENTA_CONTABLE',
                                                fieldLabel: 'Cuenta Contable',
                                                store: storeCuentaProv,
                                                minChars: 3,
                                               // afterLabelTextTpl: required,
                                                displayField: 'NOMBRE',
                                                valueField: 'CUENTA',
                                                typeAhead: false,
                                                validateOnChange: true,
                                                allowBlank: true,
                                                hideTrigger: false,
                                                listConfig: {
                                                    loadingText: 'Buscando...',
                                                    emptyText: 'No se encontro la cuenta.',
                                                    getInnerTpl: function() {
                                                        return '<span style="color:green;font-weight: bold">{CUENTA_ALIAS}</span><h3>{NOMBRE}</h3>';
                                                    }
                                                },
                                                listeners: {
                                                    scope: this,
                                                    select: function(value) {


                                                    }





                                                }//,

                                               // pageSize: 10
                                            },
                                            
                                                 {
                   
                                                xtype: 'combobox',
                                                name: 'CUENTA_COMPLEMENTARIA',
                                                id: 'cboCUENTA_COMPLEMENTARIA',
                                                fieldLabel: 'Cuenta Complementaria',
                                                store: storeCuentaCompl,
                                                minChars: 3,
                                               // afterLabelTextTpl: required,
                                                displayField: 'NOMBRE',
                                                valueField: 'CUENTA',
                                                typeAhead: false,
                                                validateOnChange: true,
                                                allowBlank: true,
                                                hideTrigger: false,
                                                listConfig: {
                                                    loadingText: 'Buscando...',
                                                    emptyText: 'No se encontro la cuenta.',
                                                    getInnerTpl: function() {
                                                        return '<span style="color:green;font-weight: bold">{CUENTA_ALIAS}</span><h3>{NOMBRE}</h3>';
                                                    }
                                                },
                                                listeners: {
                                                    scope: this,
                                                    select: function(value) {


                                                    }





                                                }//,

                                               // pageSize: 10
                                            },
                                                    {
                   
                                                xtype: 'combobox',
                                                name: 'CUENTA_GASTO',
                                                id: 'cboCUENTA_GASTO',
                                                fieldLabel: 'Cuenta Gasto',
                                                store: storeCuentaGasto,
                                                minChars: 3,
                                               // afterLabelTextTpl: required,
                                                displayField: 'NOMBRE',
                                                valueField: 'CUENTA',
                                                typeAhead: false,
                                                validateOnChange: true,
                                                allowBlank: true,
                                                hideTrigger: false,
                                                listConfig: {
                                                    loadingText: 'Buscando...',
                                                    emptyText: 'No se encontro la cuenta.',
                                                    getInnerTpl: function() {
                                                        return '<span style="color:green;font-weight: bold">{CUENTA_ALIAS}</span><h3>{NOMBRE}</h3>';
                                                    }
                                                },
                                                listeners: {
                                                    scope: this,
                                                    select: function(value) {


                                                    }





                                                }//,

                                               // pageSize: 10
                                            }
                                                

                                                ]
                                        },
                                        {
                                        xtype: 'container',
                                                flex: 1,
                                                border: false,
                                                layout: 'anchor',
                                                defaultType: 'textfield',
                                                defaults: {
                                                width: 200
                                                },
                                                items: [
                                              
                                                {
                                                xtype: 'combobox',
                                                        fieldLabel: "Cuenta de IVA Provisionado",
                                                        name: 'CUENTA_IVA',
                                                        id: 'cboCUENTA_IVA',
                                                       // afterLabelTextTpl: required,
                                                        store: storeCuentaIvaProv,
                                                        minChars: 3,
                                                        displayField: 'NOMBRE',
                                                        valueField: 'CUENTA',
                                                        typeAhead: false,
                                                        validateOnChange: true,
                                                        allowBlank: true,
                                                        hideTrigger: false,
                                                        listConfig: {
                                                            loadingText: 'Buscando...',
                                                            emptyText: 'No se encontro la cuenta.',
                                                            getInnerTpl: function() {
                                                                return '<span style="color:green;font-weight: bold">{CUENTA_ALIAS}</span><h3>{NOMBRE}</h3>';
                                                            }
                                                        },
                                                        listeners: {
                                                            scope: this,
                                                            select: function(value) {


                                                            }





                                                        }//,
                                                },
                                                 {
                                                xtype: 'combobox',
                                                        fieldLabel: "Cuenta de IVA Pagado",
                                                        name: 'CUENTA_IVA_PAGO',
                                                        id: 'cboCUENTA_IVA_PAGO',
                                                       // afterLabelTextTpl: required,
                                                        store: storeCuentaIvaPag,
                                                        minChars: 3,
                                                        displayField: 'NOMBRE',
                                                        valueField: 'CUENTA',
                                                        typeAhead: false,
                                                        validateOnChange: true,
                                                        allowBlank: true,
                                                        hideTrigger: false,
                                                        listConfig: {
                                                            loadingText: 'Buscando...',
                                                            emptyText: 'No se encontro la cuenta.',
                                                            getInnerTpl: function() {
                                                                return '<span style="color:green;font-weight: bold">{CUENTA_ALIAS}</span><h3>{NOMBRE}</h3>';
                                                            }
                                                        },
                                                        listeners: {
                                                            scope: this,
                                                            select: function(value) {


                                                            }





                                                        }//,
                                                }
                                                ]
                                        }
                                    
                                        
                                        
                                        ]
                                },
                                {
                                title: "Bancos",
                                itemId: 'btnPanelBancosCta',
                                 id: 'btnPanelBancosCta',
                                 hidden:false,
                                        layout: 'hbox',
                                        defaultType: 'textfield',
                                        items: [
                                        {
                                        xtype: 'container',
                                                flex: 1,
                                                border: false,
                                                layout: 'anchor',
                                                defaultType: 'textfield',
                                                defaults: {
                                                width: 200
                                                },
                                                items: [
                                                
                                                {
                                                xtype: 'combobox',
                                                        fieldLabel:'Banco',
                                                        name: 'BANCO',
                                                        //editable:false,
                                                        afterLabelTextTpl: required,
                                                        id: 'cboBANCO',
                                                        store: storeBancosSat,
                                                        minChars: 3,
                                                        displayField: 'NOMBRE1',
                                                        valueField: 'CLAVE',
                                                        typeAhead: false,
                                                        validateOnChange: true,
                                                        allowBlank: false,
                                                        hideTrigger: false,
                                                        listConfig: {
                                                            loadingText: 'Buscando...',
                                                            emptyText: 'No se encontro el banco.',
                                                            getInnerTpl: function() {
                                                                return '<span style="color:green;font-weight: bold">{CLAVE}</span><h3>{NOMBRE}</h3>';
                                                            }
                                                        },
                                                        listeners: {
                                                            scope: this,
                                                            select: function(value) {


                                                            }





                                                        }//,
                        
                                                },
                                                {
                                                        fieldLabel: 'Cuenta Bancaria',
                                                        enforceMaxLength: true,
                                                        maxLength: 20,
                                                        name: 'CUENTA_BANCARIA',
                                                        id:'cuentaBancariaProv',
                                                        listeners:{
                                                        change: function (field, newValue, oldValue) {
                                                            field.setValue(newValue.toUpperCase());
                                                        }
                                                        }
                                                }

                                                ]
                                        },
                                        
                                        {
                                        xtype: 'container',
                                                flex: 1,
                                                border: false,
                                                layout: 'anchor',
                                                defaultType: 'textfield',
                                                defaults: {
                                                width: 200
                                                },
                                                items: [
                                                {
                                                fieldLabel:"Cuenta Clabe",
                                                        enforceMaxLength: true,
                                                        maxLength: 18,
                                                        name: 'CLABE',
                                                        id:'clabeProv',
                                                        listeners:{
                                                        change: function (field, newValue, oldValue) {
                                                            field.setValue(newValue.toUpperCase());
                                                        }
                                                        }
                                                },
                                                {
                                                        xtype: 'combobox',
                                                        fieldLabel: 'Cuenta a Dispersar',
                                                        name: 'CUENTA_VALIDA',
                                                        id: 'cboCUENTA_VALIDA',
                                                        afterLabelTextTpl: required,
                                                        store: tCuentaValida,
                                                        queryMode: 'local',
                                                        //anchor: '95%',
                                                        readOnly: false,
                                                        hidden:false,
                                                        displayField: 'NOMBRE',
                                                        valueField: 'CLAVE',
                                                        allowBlank: false,
                                                         listeners: {
                                                                        scope: this,
                                                                        select: function(value) {



                                                                        }





                                                                    }//,

                                                    }

                                                ]
                                        }
                                        ]


                                },
                                {
                                title: "Bancos Dolares",
                                itemId: 'btnPanelBancosCtaDol',
                                 id: 'btnPanelBancosCtaDol',
                                 hidden:false,
                                        layout: 'hbox',
                                        defaultType: 'textfield',
                                        items: [
                                        {
                                        xtype: 'container',
                                                flex: 1,
                                                border: false,
                                                layout: 'anchor',
                                                defaultType: 'textfield',
                                                defaults: {
                                                width: 200
                                                },
                                                items: [
                                                
                                                {
                                                xtype: 'combobox',
                                                        fieldLabel:'Banco DÃ³lares',
                                                        name: 'BANCO_DOLARES',
                                                        //editable:false,
                                                        //afterLabelTextTpl: required,
                                                        id: 'cboBANCO_DOLARES',
                                                        store: storeBancosSatDlls,
                                                        minChars: 3,
                                                        displayField: 'NOMBRE1',
                                                        valueField: 'CLAVE',
                                                        typeAhead: false,
                                                        validateOnChange: true,
                                                        allowBlank: true,
                                                        hideTrigger: false,
                                                        listConfig: {
                                                            loadingText: 'Buscando...',
                                                            emptyText: 'No se encontro el banco.',
                                                            getInnerTpl: function() {
                                                                return '<span style="color:green;font-weight: bold">{CLAVE}</span><h3>{NOMBRE}</h3>';
                                                            }
                                                        },
                                                        listeners: {
                                                            scope: this,
                                                            select: function(value) {


                                                            }





                                                        }//,
                        
                                                },
                                                {
                                                        fieldLabel: 'Cuenta Bancaria DÃ³lares',
                                                        enforceMaxLength: true,
                                                        maxLength: 20,
                                                        name: 'NUM_CUENTA_DOLARES',
                                                        id:'cuentaBancariaDolaresProv',
                                                        listeners:{
                                                        change: function (field, newValue, oldValue) {
                                                            field.setValue(newValue.toUpperCase());
                                                        }
                                                        }
                                                }

                                                ]
                                        },
                                        
                                        {
                                        xtype: 'container',
                                                flex: 1,
                                                border: false,
                                                layout: 'anchor',
                                                defaultType: 'textfield',
                                                defaults: {
                                                width: 200
                                                },
                                                items: [
                                                {
                                                fieldLabel:"Cuenta Clabe DÃ³lares",
                                                        enforceMaxLength: true,
                                                        maxLength: 18,
                                                        name: 'CUENTA_CLABE_DOLARES',
                                                        id:'clabeDolaresProv',
                                                        listeners:{
                                                        change: function (field, newValue, oldValue) {
                                                            field.setValue(newValue.toUpperCase());
                                                        }
                                                        }
                                                },
                                                {
                                                        xtype: 'combobox',
                                                        fieldLabel: 'Cuenta a Dispersar DÃ³lares',
                                                        name: 'CUENTA_VALIDA_DOLARES',
                                                        id: 'cboCUENTA_VALIDA_DOLARES',
                                                        //afterLabelTextTpl: required,
                                                        store: tCuentaValidaDlls,
                                                        queryMode: 'local',
                                                        //anchor: '95%',
                                                        readOnly: false,
                                                        hidden:false,
                                                        displayField: 'NOMBRE',
                                                        valueField: 'CLAVE',
                                                        allowBlank: true,
                                                         listeners: {
                                                                        scope: this,
                                                                        select: function(value) {



                                                                        }





                                                                    }//,

                                                    }

                                                ]
                                        }
                                        ]


                                },
                                
                                {
                                title: "Bancos Extranjero",
                                itemId: 'btnPanelBancosCtaExt',
                                 id: 'btnPanelBancosCtaExt',
                                 hidden:false,
                                        layout: 'hbox',
                                        defaultType: 'textfield',
                                        items: [
                                        {
                                        xtype: 'container',
                                                flex: 1,
                                                border: false,
                                                layout: 'anchor',
                                                defaultType: 'textfield',
                                                defaults: {
                                                width: 200
                                                },
                                                items: [
                                                    
                                                 {
                                                        fieldLabel: 'IBAN',
                                                        enforceMaxLength: true,
                                                        maxLength: 30,
                                                        name: 'IBAN',
                                                        id:'ibanProv',
                                                        listeners:{
                                                        change: function (field, newValue, oldValue) {
                                                            field.setValue(newValue.toUpperCase());
                                                        }
                                                        }
                                                },
                                                 {
                                                        fieldLabel: 'Nombre del Banco Extranjero',
                                                        enforceMaxLength: true,
                                                        maxLength: 500,
                                                        name: 'BANCO_EXTRANJERO',
                                                        id:'bancoExtranjeroProv',
                                                        listeners:{
                                                        change: function (field, newValue, oldValue) {
                                                            
                                                        }
                                                        }
                                                },
                                                {
                                                        fieldLabel: 'Direccion Banco Extranjero',
                                                        enforceMaxLength: true,
                                                        maxLength: 500,
                                                        name: 'DIR_BANCO_EXTRANJERO',
                                                        id:'dirBancoExtranjeroProv',
                                                        listeners:{
                                                        change: function (field, newValue, oldValue) {
                                                            
                                                        }
                                                        }
                                                }
                                               
                                                
                                                 
                                                ]
                                        },
                                        
                                        {
                                        xtype: 'container',
                                                flex: 1,
                                                border: false,
                                                layout: 'anchor',
                                                defaultType: 'textfield',
                                                defaults: {
                                                width: 200
                                                },
                                                items: [
                                                    
                                                 {
                                                        fieldLabel: 'SWIFT',
                                                        enforceMaxLength: true,
                                                        maxLength: 11,
                                                        name: 'SWIFT',
                                                        id:'swiftProv',
                                                        listeners:{
                                                        change: function (field, newValue, oldValue) {
                                                            field.setValue(newValue.toUpperCase());
                                                        }
                                                        }
                                                },
                                                
                                                
                                                 {
                                                        fieldLabel: 'Numero de Cuenta Extranjera',
                                                        enforceMaxLength: true,
                                                        maxLength: 100,
                                                        name: 'NUM_CTA_EXTRANJERA',
                                                        id:'cuentaExtranjeraProv',
                                                        listeners:{
                                                        change: function (field, newValue, oldValue) {
                                                            field.setValue(newValue.toUpperCase());
                                                        }
                                                        }
                                                },
                                                {
                                                        fieldLabel: 'Direccion Beneficiario Ext.',
                                                        enforceMaxLength: true,
                                                        maxLength: 100,
                                                        name: 'DIR_BENEFICIARIO_EXT',
                                                        id:'dirBenefExtProv',
                                                        listeners:{
                                                        }
                                                }
                                                
                                                

                                                ]
                                        }
                                        ]


                                },
                                
                               
                                {
                                title: "Tipo Poliza",
                                        layout: 'hbox',
                                        defaultType: 'textfield',
                                        hidden:true,
                                        items: [
                                        {
                                        xtype: 'container',
                                                flex: 1,
                                                border: false,
                                                layout: 'anchor',
                                                defaultType: 'textfield',
                                                defaults: {
                                                width: 200
                                                },
                                                items: [
                                                {
                                                xtype: 'combobox',
                                                        name: 'TIPO_POLIZA',
                                                        fieldLabel: "Tipo de Poliza",
                                                        //afterLabelTextTpl: required,
                                                        allowBlank: true,                                                      
                                                        editable:false,                                                 
                                                        id: 'cboTIPO_POLIZA',
                                                        store: storeTipoPoliza,
                                                        minChars: 3,
                                                        displayField: 'NOMBRE1',
                                                        valueField: 'TIPO_POLIZA',
                                                        typeAhead: false,
                                                        validateOnChange: true,
                                                        hideTrigger: false,
                                                        listConfig: {
                                                            loadingText: 'Buscando...',
                                                            emptyText: 'No se encontro tipo Poliza.',
                                                            getInnerTpl: function() {
                                                                return '<span style="color:green;font-weight: bold">{TIPO_POLIZA}</span><h3>{NOMBRE}</h3>';
                                                            }
                                                        },
                                                        listeners: {
                                                            scope: this,
                                                            select: function(value) {


                                                            }





                                                        }//,
                                                                
                                                }

                                                ]
                                        }
                                        ]
                                },
                                
                                {
                                title: "Pago Cie",
                                        layout: 'hbox',
                                        defaultType: 'textfield',
                                        items: [
                                        {
                                        xtype: 'container',
                                                flex: 1,
                                                border: false,
                                                layout: 'anchor',
                                                defaultType: 'textfield',
                                                defaults: {
                                                width: 200
                                                },
                                                items: [
                                                    {
                                                        xtype: 'checkboxfield',

                                                                name      : 'addBanderaCie',

                                                                inputValue: '1',
                                                                boxLabel  : 'Cie',
                                                              //  checked   : false,
                                                                id        : 'checkbox2',


                                                         listeners: {
                                                                scope: this,
                                                                checkChange: function() {
                                                                    console.log('hay un cambio');
                                                                   // this.fireEvent("nombreCuenta", value.valueModels[0].data.NOMBRE, value.valueModels[0].data.CUENTA);
                                                                }
                                                            }
                                                    }
                                                  ,
                                                  {
                                                        xtype: 'numberfield',
                                                        labelWidth: 110,
                                                        fieldLabel: 'Pago Cie',
                                                        name: 'PAGO_CIE',
                                                        id:'PAGO_CIE'
                                                      
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        labelWidth: 110,
                                                        fieldLabel: 'Referencia Cie',
                                                        name: 'REFERENCIA_CIE',
                                                        id:'REFERENCIA_CIE'
                                                      
                                                    }
                                                ]
                                        }
                                        ]
                                },
                                {
                                title: "DIOT",
                                        layout: 'hbox',
                                        defaultType: 'textfield',
                                        items: [
                                        {
                                        xtype: 'container',
                                                flex: 1,
                                                border: false,
                                                layout: 'anchor',
                                                defaultType: 'textfield',
                                                defaults: {
                                                width: 200
                                                },
                                                items: [
                                                     {
                                                xtype: 'combobox',
                                                        name: 'cbotOperacionDiot',
                                                        fieldLabel: "T. Operacion Diot",
                                                        //afterLabelTextTpl: required,
                                                        allowBlank: true,                                                      
                                                        editable:false,                                                 
                                                        id: 'cbotOperacionDiot',
                                                        store: tOperacionDiot,
                                                        minChars: 3,
                                                        displayField: 'NOMBRE',
                                                        valueField: 'TIPO',
                                                        typeAhead: false,
                                                        validateOnChange: true,
                                                        hideTrigger: false,
                                                        listConfig: {
                                                            loadingText: 'Buscando...',
                                                            emptyText: 'No se encontro tipo Operacion.',
                                                            getInnerTpl: function() {
                                                                return '<span style="color:green;font-weight: bold">{TIPO}</span><h3>{NOMBRE}</h3>';
                                                            }
                                                        },
                                                        listeners: {
                                                            scope: this,
                                                            select: function(value) {


                                                            }





                                                        }//,
                                                                
                                                }
                                              
                                                ]
                                        }
                                        ]
                                },
                                {
                                title: "Clasificacion",
                                        layout: 'hbox',
                                        defaultType: 'textfield',
                                        items: [
                                        {
                                        xtype: 'container',
                                                flex: 1,
                                                border: false,
                                                layout: 'anchor',
                                                defaultType: 'textfield',
                                                defaults: {
                                                width: 200
                                                },
                                                items: [
                                                    
                                                    {
                                                xtype: 'combobox',
                                                        fieldLabel: "Clasificacion",
                                                        name: 'CLASIFICACION1',
                                                        id: 'CLASIFICACION1',
                                                       // afterLabelTextTpl: required,
                                                        store: storeClasificacion,
                                                        minChars: 3,
                                                        displayField: 'NOMBRE1',
                                                        valueField: 'ID',
                                                        typeAhead: false,
                                                        validateOnChange: true,
                                                        allowBlank: true,
                                                        hideTrigger: false,
                                                        listConfig: {
                                                            loadingText: 'Buscando...',
                                                            emptyText: 'No se encontro Clasificacion.',
                                                            getInnerTpl: function() {
                                                                return '<span style="color:green;font-weight: bold">{ID}</span><h3>{NOMBRE}</h3>';
                                                            }
                                                        },
                                                        listeners: {
                                                            scope: this,
                                                            select: function(value) {


                                                            }




 
                                                        }//,
                                                },
                                                    
                                                   
                                                  {
                                                        xtype: 'textfield',
                                                        labelWidth: 110,
                                                        fieldLabel: 'Clasificacion 2',
                                                        name: 'CLASIFICACION2',
                                                        id:'CLASIFICACION2'
                                                      
                                                    }
                                           
                                           
                                                ]
                                        }
                                        ]
                                }
                                
                                
                                
                                
                                ]
                        }
                        ]
                });
                        this.callParent(arguments);
            }

        });








