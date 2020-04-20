let L_Tokens: { Id: number, Lexema: string, Descripcion:string, Fila:number, Columna:number}[];
let L_Tokens_Error: { Id: number, Lexema: string, Descripcion:string, Fila:number, Columna:number}[];
class Analizador_L{
     //Array
     Tokens: { Id: number, Lexema: string, Descripcion:string, Fila:number, Columna:number}[];
     Tokens_Error: { Id: number, Lexema: string, Descripcion:string, Fila:number, Columna:number}[];
     constructor(){
          this.Tokens=[{"Id":0,"Lexema":"INICIO", "Descripcion":"INICIO","Fila":0,"Columna":0}];
          this.Tokens_Error=[{"Id":0,"Lexema":"INICIO", "Descripcion":"INICIO","Fila":0,"Columna":0}];
     }

    public Analizar_Cadena(Contenido: string) {
        let Fila=1;
        let Columna=1;
        let Estado: Number=0;
        let Cadena="";
        for(let pos=0;pos<Contenido.length;pos++){
            switch(Estado) { 
                case 0: { 
                   if(Contenido.charAt(pos).charCodeAt(0)==47){
                        Estado=3;
                   } else if(Contenido.charAt(pos).charCodeAt(0)==42){
                         this.Tokens.push({"Id":2,"Lexema":"*", "Descripcion":"Asterisco","Fila":Fila,"Columna":Columna});
                         Columna++;
                   } else if(Contenido.charAt(pos).charCodeAt(0)==59){
                         this.Tokens.push({"Id":3,"Lexema":";", "Descripcion":"Punto y Coma","Fila":Fila,"Columna":Columna});
                         Columna++;
                   } else if(Contenido.charAt(pos).charCodeAt(0)==61){
                         this.Tokens.push({"Id":4,"Lexema":"=", "Descripcion":"Igual","Fila":Fila,"Columna":Columna});
                         Columna++;
                   } else if(Contenido.charAt(pos).charCodeAt(0)==44){
                         this.Tokens.push({"Id":5,"Lexema":",", "Descripcion":"Coma","Fila":Fila,"Columna":Columna});
                         Columna++;
                   } else if(Contenido.charAt(pos).charCodeAt(0)==43){
                         this.Tokens.push({"Id":6,"Lexema":"+", "Descripcion":"Signo Mas","Fila":Fila,"Columna":Columna});
                         Columna++;
                   } else if(Contenido.charAt(pos).charCodeAt(0)==40){
                         this.Tokens.push({"Id":7,"Lexema":"(", "Descripcion":"Parentesis Izquierdo","Fila":Fila,"Columna":Columna});
                         Columna++;
                   } else if(Contenido.charAt(pos).charCodeAt(0)==41){
                         this.Tokens.push({"Id":8,"Lexema":")", "Descripcion":"Parentesis Derecho","Fila":Fila,"Columna":Columna});
                         Columna++;
                   } else if(Contenido.charAt(pos).charCodeAt(0)==123){
                         this.Tokens.push({"Id":9,"Lexema":"{", "Descripcion":"Llave Izquierda","Fila":Fila,"Columna":Columna});
                         Columna++;
                   } else if(Contenido.charAt(pos).charCodeAt(0)==125){
                         this.Tokens.push({"Id":10,"Lexema":"}", "Descripcion":"Llave Derecha","Fila":Fila,"Columna":Columna});
                         Columna++;
                   } else if(Contenido.charAt(pos).charCodeAt(0)==62){
                         this.Tokens.push({"Id":11,"Lexema":">", "Descripcion":"Mayor que","Fila":Fila,"Columna":Columna});
                         Columna++;
                   } else if(Contenido.charAt(pos).charCodeAt(0)==60){
                         this.Tokens.push({"Id":12,"Lexema":"<", "Descripcion":"Menor que","Fila":Fila,"Columna":Columna});
                         Columna++;
                   } else if(Contenido.charAt(pos).charCodeAt(0)==46){
                         this.Tokens.push({"Id":13,"Lexema":".", "Descripcion":"Punto","Fila":Fila,"Columna":Columna});
                         Columna++;
                   } else if(Contenido.charAt(pos).charCodeAt(0)==34){
                         this.Tokens.push({"Id":14,"Lexema":"\"", "Descripcion":"Comillas Dobles","Fila":Fila,"Columna":Columna});
                         Columna++;
                         Estado=6;
                   } else if(Contenido.charAt(pos).charCodeAt(0)==39){
                         this.Tokens.push({"Id":24,"Lexema":"\'", "Descripcion":"Comillas Simples","Fila":Fila,"Columna":Columna});
                         Columna++;
                         Estado=7;
                   } else if(Contenido.charAt(pos).charCodeAt(0)==58){
                         this.Tokens.push({"Id":15,"Lexema":":", "Descripcion":"Dos Puntos","Fila":Fila,"Columna":Columna});
                         Columna++;
                   } else if(Contenido.charAt(pos).charCodeAt(0)==45){
                         this.Tokens.push({"Id":16,"Lexema":"-", "Descripcion":"Signo Menos","Fila":Fila,"Columna":Columna});
                         Columna++;
                   } else if(Contenido.charAt(pos).charCodeAt(0)==38){
                         this.Tokens.push({"Id":17,"Lexema":"&", "Descripcion":"Ampersand","Fila":Fila,"Columna":Columna});
                         Columna++;
                   } else if(Contenido.charAt(pos).charCodeAt(0)==124){
                         this.Tokens.push({"Id":18,"Lexema":"|", "Descripcion":"Barra Vertical","Fila":Fila,"Columna":Columna});
                         Columna++;
                   } else if(Contenido.charAt(pos).charCodeAt(0)==33){
                         this.Tokens.push({"Id":19,"Lexema":"!", "Descripcion":"Signo de Admiracion","Fila":Fila,"Columna":Columna});
                         Columna++;
                   }else if(Contenido.charAt(pos).match(/[a-z]/i) || Contenido.charAt(pos).charCodeAt(0)==95 ){
                        //Id ->Estado1
                        var tem=Contenido.charAt(pos);
                        Cadena+=tem;
                        Estado=1;
                   } else if(Contenido.charAt(pos).charCodeAt(0)>=48  && Contenido.charAt(pos).charCodeAt(0)<=57){
                        //Digito ->Estado2
                        var tem=Contenido.charAt(pos);
                        Cadena+=tem;
                        Estado=2;
                   }else if(Contenido.charAt(pos)=='\n'){
                        Columna=1;
                        Fila++;
                   }else if(Contenido.charAt(pos).match(/[\s]/)){  
                   }else{
                        this.Tokens_Error.push({"Id":-1,"Lexema":Contenido.charAt(pos), "Descripcion":"Error Lexico","Fila":Fila,"Columna":Columna});
                        Columna++;
                  }

                   break; 
                }
                case 1:{
                     //id
                    if(Contenido.charAt(pos).match(/[a-z]/i) || Contenido.charAt(pos).charCodeAt(0)==95||(Contenido.charAt(pos).charCodeAt(0)>=48  && Contenido.charAt(pos).charCodeAt(0)<=57) ){
                         var tem=Contenido.charAt(pos);
                         Cadena+=tem;
                    }else{
                         this.Tokens.push({"Id":20,"Lexema":Cadena, "Descripcion":"Id","Fila":Fila,"Columna":Columna});
                         Cadena="";
                         pos--; Columna++;
                         Estado=0;
                    }
                    break;
                }
                case 2:{
                     //Digito
                     if((Contenido.charAt(pos).charCodeAt(0)>=48  && Contenido.charAt(pos).charCodeAt(0)<=57) ||  Contenido.charAt(pos).charCodeAt(0)==46){
                         var tem=Contenido.charAt(pos);
                         Cadena+=tem;
                     }else{
                         this.Tokens.push({"Id":21,"Lexema":Cadena, "Descripcion":"Digito","Fila":Fila,"Columna":Columna});
                         Cadena="";
                         pos--; Columna++;
                         Estado=0; 
                     }
                     break;
                }
                case 3:{
                     //Comentario
                     if(Contenido.charAt(pos).charCodeAt(0)==47){
                           //de una linea
                          Estado=4;
                     }else if(Contenido.charAt(pos).charCodeAt(0)==42){
                           //Multilinea
                          Estado=5;
                     }else{
                        this.Tokens.push({"Id":1,"Lexema":"/", "Descripcion":"Barra Inclinada","Fila":Fila,"Columna":Columna});
                        pos--;Columna++;  
                        Estado=0;
                     }
                     break;
                }
                case 4:{
                     //Contenido de Comentario
                    if(Contenido.charAt(pos)!='\n'){
                         var tem=Contenido.charAt(pos);
                         Cadena+=tem;
                    }else{
                        this.Tokens.push({"Id":22,"Lexema":Cadena, "Descripcion":"Comentario Simple","Fila":Fila,"Columna":Columna});
                        Columna=0; Fila++; Cadena="";
                        Estado=0;
                    }
                    break;
                }
                case 5:{
                      
                      //Comentario multilinea
                      if(Contenido.charAt(pos).charCodeAt(0)==42){
                            try {
                              if(Contenido.charAt(pos+1).charCodeAt(0)==47){
                                    this.Tokens.push({"Id":23,"Lexema":Cadena, "Descripcion":"Comentario Multiple","Fila":Fila,"Columna":Columna});
                                    Columna++;Cadena="";pos++;
                                    Estado=0;
                              }else{
                                   if(Contenido.charAt(pos)=='\n'){Fila++;Columna=1;}
                                   var tem=Contenido.charAt(pos);
                                   Cadena+=tem;
                              } 
                            } catch (error) {}
                      }else{  
                          if(Contenido.charAt(pos)=='\n'){Fila++;Columna=1;}
                          var tem=Contenido.charAt(pos);
                          Cadena+=tem;
                          
                      }
                  break;
                }
                case 6:{
                      //Contenido entre "
                      if(Contenido.charAt(pos).charCodeAt(0)==34){
                        this.Tokens.push({"Id":25,"Lexema":Cadena, "Descripcion":"Cadena","Fila":Fila,"Columna":Columna});
                        Columna++;Cadena="";

                        this.Tokens.push({"Id":14,"Lexema":"\"", "Descripcion":"Comillas Dobles","Fila":Fila,"Columna":Columna});
                        Columna++;
                        Estado=0; 
                      }else{
                        if(Contenido.charAt(pos)=='\n'){Fila++;Columna=0;}
                          var tem=Contenido.charAt(pos);
                          Cadena+=tem;
                      }
                      break;
                }
                case 7:{
                      //Contenido entre '
                      if(Contenido.charAt(pos).charCodeAt(0)==39){
                        this.Tokens.push({"Id":25,"Lexema":Cadena, "Descripcion":"Cadena","Fila":Fila,"Columna":Columna});
                        Columna++;Cadena="";

                        this.Tokens.push({"Id":24,"Lexema":"\'", "Descripcion":"Comillas Simples","Fila":Fila,"Columna":Columna});
                        Columna++;
                        Estado=0; 
                      }else{
                        if(Contenido.charAt(pos)=='\n'){Fila++;Columna=0;}
                          var tem=Contenido.charAt(pos);
                          Cadena+=tem;
                      }
                      break;
                }
             }
        }
        //Damos valor a la L_Tokens
        L_Tokens=this.Tokens;
        L_Tokens_Error=this.Tokens_Error;
    }
}

function Analizar(Contenido:string){
    let nuevo=new Analizador_L();
    nuevo.Analizar_Cadena(Contenido);
    //Realizamos Analisis Sintactico
    Analizar_S();
}
function RetornarLista(): { Id: number, Lexema: string, Descripcion:string, Fila:number, Columna:number}[]{
      return L_Tokens;
}

function RetornarLista_Error(): { Id: number, Lexema: string, Descripcion:string, Fila:number, Columna:number}[]{
      return L_Tokens_Error;
}