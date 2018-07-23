sap.ui.define([
  "jquery.sap.global",
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel",
   "sap/m/MessageToast"
], function (jQuery, Controller,  JSONModel, MessageToast ) {
   "use strict";

      var host = "localhost:9999";
      var remoto = "165.227.205.2:9999"; 
      var servicio = "firmad";
      var server = host;
      var rut = "";
   
   return Controller.extend("HelloWorld.App", {


      onAceptar: function () {
         

        this.getView().setBusy(true);


         var clave = this.getView().byId("password").getValue();

         if (clave != ""){
          MessageToast.show("Firmando Aceptado");



          var oModel = new JSONModel({
            Source: 'http://'+server+'/firmar?id='+rut+'&clave='+clave+'&motivo=prueba_aceptado',
            Title: "Documento Aceptado",
            Height: "600px"
            
            });

            
            this.getView().setModel(oModel);

            var pdf = this.getView().byId("PDFViewer");

            pdf.attachSourceValidationFailed(oModel, this._onValidarPDF);
       }
       else{
        MessageToast.show("Debe ingresar una clave");
       }

         this.getView().setBusy(false);

      },

      onRechazar: function(){
        MessageToast.show("Firmando Rechazado");
        this.getView().setBusy(true);

        

         var clave = this.getView().byId("password").getValue();

          if (clave != ""){

            var oModel = new JSONModel({
            Source: 'http://'+server+'/firmar?id='+rut+'&clave='+clave+'&motivo=prueba_rechazado',
            Title: "Documento Rechazado",
            Height: "600px"
            
            });

            
            this.getView().setModel(oModel);

            var pdf = this.getView().byId("PDFViewer");

            pdf.attachSourceValidationFailed(oModel, this._onValidarPDF);

          }
          else{
            MessageToast.show("Debe ingresar una clave");
          }
          this.getView().setBusy(false);

      },

      _onValidarPDF: function(oEvent){
          oEvent.preventDefault();
          //MessageToast.show("ERROR PDF");
      },


      onInit: function(){


        this.getView().setBusy(true);


      var oModelJ = new sap.ui.model.json.JSONModel();
        //
        // Perform a jQuery .ajax request
        //
        $.ajax({
          url: "./login",
            dataType: 'json',
            async: false,
            success: function(response){
              var data = response;  // binding to /value can also take place here
              oModelJ.setData(data);
              rut = data.rut;
              MessageToast.show('Usuario Success: '+data.username + '   RUT = '+data.rut);

            }
        });


      
      // var oModelEC = new sap.ui.model.json.JSONModel();

      // $.ajax({
      //     url: "./odataec",
      //       dataType: 'json',
      //       success: function(response){
      //       var data = response;  // binding to /value can also take place here
      //         oModelEC.setData(data); 

      //         MessageToast.show('Userid lectura odata'+ data.d.userId);
      //       }
      //   })



    var oModelUser = new sap.ui.model.json.JSONModel();
    //this.getView().setModel(oModelUser);

      $.ajax({
          url: "./odataec/usuarios",
            dataType: 'json',
            async: false,
            success: function(response){
            
            var data = response;  // binding to /value can also take place here
              oModelUser.setData(data); 
              

            }
        })

        var tablaUsuarios = this.getView().byId("tablaUsuarios");
        
        tablaUsuarios.setModel(oModelUser,"tabModel");


        this.getView().byId("tablaUsuarios").setModel(oModelUser,"userModel");

        
//        var oModel = new JSONModel({
//        Source: 'http://'+server+'/visualizar?id='+rut,
//        Title: "Documento a firmar",
//        Height: "600px"
//        
//        });

        
//        this.getView().setModel(oModel);

//        var pdf = this.getView().byId("PDFViewer");

//        pdf.attachSourceValidationFailed(oModel, this._onValidarPDF);


         this.getView().setBusy(false);

      }
   });
});