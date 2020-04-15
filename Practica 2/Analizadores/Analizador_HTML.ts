let CadenaJson="";
let CadenaHtmlEnvio="";
class Analis_Cambio{
    Cantidad_TB=0;
    constructor() {
        CadenaJson="";
        this.Cantidad_TB=0;
    }

    public Analizar(Contenido:string) {
        let Estado=0;
        let CadTem="";
        for(let pos=0;pos<Contenido.length;pos++){
            switch (Estado){
                case 0:{
                    if(Contenido.charAt(pos).charCodeAt(0)==60){
                        if(CadTem.length!=0){
                            //JSON
                            CadenaJson+="\"TEXTO\":\" "+CadTem+" \""+"\n";
                            CadTem="";
                            for(let cant=0;cant<this.Cantidad_TB;cant++){CadenaJson+="\t";}
                        }
                        Estado=1;
                    }else{
                        CadTem+=Contenido.charAt(pos);
                    }
                    break;
                }
                case 1:{
                    //comprobacion si es inicio o fin de etiqueta
                    if(Contenido.charAt(pos).charCodeAt(0)==47){
                        Estado=2;
                    }else{
                        pos--;
                        Estado=3;
                    }
                    break;
                }
                case 2:{
                    //Final de etiqueta
                    if(Contenido.charAt(pos).charCodeAt(0)==62){
                        this.Cantidad_TB--;CadenaJson+="\n";
                        for(let cant=0;cant<this.Cantidad_TB;cant++){CadenaJson+="\t";}
                        CadenaJson+="}"+"\n";
                        Estado=0;
                    }
                    break;
                }
                case 3:{
                    //Inicio de Etiqueta
                    if(Contenido.charAt(pos).charCodeAt(0)!=62){
                        if(Contenido.charAt(pos).match(/[\s]/) && (CadTem.toLowerCase()=="body" || CadTem.toLowerCase()=="div")){//espacio
                            for(let cant=0;cant<this.Cantidad_TB;cant++){CadenaJson+="\t";}
                            this.Cantidad_TB++;
                            CadenaJson+="\"";
                            CadenaJson+=CadTem.toUpperCase();CadTem="";
                            CadenaJson+="\":{"+"\n";
                            for(let cant=0;cant<this.Cantidad_TB;cant++){CadenaJson+="\t";}
                            Estado=4;
                        }
                        CadTem+=Contenido.charAt(pos);
                    }else{
                        //Comprobacion de tipos
                        let bandera=false
                        if(CadTem.toLowerCase()=="html" || CadTem.toLowerCase()=="head" || CadTem.toLowerCase()=="title" || CadTem.toLowerCase()=="p" || CadTem.toLowerCase()=="button" || CadTem.toLowerCase()=="label" || CadTem.toLowerCase()=="input" ){
                            bandera=true;
                        }else if(CadTem.toLowerCase()=="h1" || CadTem.toLowerCase()=="h2" || CadTem.toLowerCase()=="h3" || CadTem.toLowerCase()=="h4"){
                            bandera=true;
                        }
                        if(bandera==true){
                            this.Cantidad_TB++;
                            CadenaJson+="\"";
                            CadenaJson+=CadTem.toUpperCase();CadTem="";
                            CadenaJson+="\":{"+"\n";
                            for(let cant=0;cant<this.Cantidad_TB;cant++){CadenaJson+="\t";}
                            Estado=0;
                        }else{CadTem="";}
                    }
                    break;
                }
                case 4:{
                    if(Contenido.charAt(pos).match(/[\s]/)){
                    }else{
                        if(Contenido.charAt(pos).charCodeAt(0)==61){
                            CadenaJson+="\""+CadTem.toUpperCase()+"\":";CadTem="";
                            pos++;
                            while(pos<Contenido.length){
                                if(Contenido.charAt(pos).charCodeAt(0)==62){
                                    CadenaJson+="\n";
                                    break;
                                }else{CadenaJson+=Contenido.charAt(pos);}
                                pos++;
                            }
                            for(let cant=0;cant<this.Cantidad_TB;cant++){CadenaJson+="\t";}
                            Estado=0;
                        }else{
                            CadTem+=Contenido.charAt(pos);
                        }
                    }
                    break;
                }
            }
        }
    }

    public Analizarhtml(Contenido:string){
        let Estado=0;
        this.Cantidad_TB=0;
        let CadTem="";
        for(let pos=0;pos<Contenido.length;pos++){
            switch (Estado){
                case 0:{
                    if(Contenido.charAt(pos).charCodeAt(0)==60){
                        if(CadTem.length!=0){
                            for(let cant=0;cant<this.Cantidad_TB;cant++){CadenaHtmlEnvio+="\t";}
                            CadenaHtmlEnvio+=CadTem+"\n";
                            CadTem="";
                        }
                        Estado=1;
                    }else{
                        CadTem+=Contenido.charAt(pos);
                    }
                    break;
                }
                case 1:{
                    //comprobacion si es inicio o fin de etiqueta
                    if(Contenido.charAt(pos).charCodeAt(0)==47){
                        CadTem+="</";
                        Estado=2;
                    }else{
                        CadTem+="<";
                        pos--;
                        Estado=3;
                    }
                    break;
                }
                case 2:{
                    //Final de etiqueta
                    if(Contenido.charAt(pos).charCodeAt(0)==62){
                        CadTem+=">"+"\n";
                        this.Cantidad_TB--;
                        for(let cant=0;cant<this.Cantidad_TB;cant++){CadenaHtmlEnvio+="\t";}
                        CadenaHtmlEnvio+=CadTem;
                        Estado=0;CadTem="";
                    }else{
                        CadTem+=Contenido.charAt(pos);
                    }
                    break;
                }
                case 3:{
                    //Inicio
                    if(Contenido.charAt(pos).charCodeAt(0)==62){
                        CadTem+=">"+"\n";
                        for(let cant=0;cant<this.Cantidad_TB;cant++){CadenaHtmlEnvio+="\t";}
                        CadenaHtmlEnvio+=CadTem;
                        this.Cantidad_TB++;
                        Estado=0;CadTem="";
                    }else{
                        CadTem+=Contenido.charAt(pos);
                    }
                    break;
                }
            }
        }
    }
}
function CambioHTML_JSON(Contenido:string){
    let nuevoA=new Analis_Cambio();
    nuevoA.Analizar(Contenido);
    nuevoA.Analizarhtml(Contenido);
    //Insertando HTML
    (<HTMLInputElement>document.getElementById("CampoTextoHTML")).value=CadenaHtmlEnvio;
    //Insertando JSON
    (<HTMLInputElement>document.getElementById("CampoTextoJSON")).value=CadenaJson;
}