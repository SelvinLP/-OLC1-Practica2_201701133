"use strict";
var L_Tokens_S;
var L_Tokens_S_Error;
var ContenidoPython = "";
var CantidadTabs = 1;
var variable;
var Contenidvar = "";
var variableTotal = [];
var Tipovar = "";
var CadenaHTML = "";
var Analizador_S = /** @class */ (function () {
    function Analizador_S() {
        ContenidoPython = "";
        CadenaHTML = "";
        CantidadTabs = 0;
        variableTotal = [];
    }
    Analizador_S.prototype.Inicio = function (pos) {
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Lexema.toLowerCase() == "void") { // ->void <MAIN_METODO>
                //Agregar Cambio
                ContenidoPython += "def ";
                pos++;
                pos = this.Main_Metodo(pos);
            }
            else { //-> <FUNCIONES>
                var postem = pos;
                pos = this.Tipo(pos, 0);
                if (pos != postem) { //Es que si es una funcoin
                    pos = this.Funciones(pos);
                }
                else {
                    pos++;
                }
            }
        }
    };
    Analizador_S.prototype.Main_Metodo = function (pos) {
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Lexema.toLowerCase() == "main") { //-> main () { <SENTENCIAS> }
                //Agregar Contenido
                ContenidoPython += "main ";
                pos++;
                pos = this.ParI(pos, 0);
                pos = this.ParD(pos, 0);
                pos = this.LlaveI(pos);
                while (pos < L_Tokens_S.length) {
                    var postem = pos;
                    pos = this.Sentencias(pos);
                    if (pos == postem) {
                        if (L_Tokens_S[pos].Lexema == "}") {
                            break;
                        }
                        else {
                            pos++;
                        }
                    }
                    else {
                        if (L_Tokens_S[pos].Lexema == "}") {
                            break;
                        }
                    }
                }
                pos = this.LlaveD(pos);
                break;
            }
            else if (L_Tokens_S[pos].Descripcion == "Id") { //-> id ( <PARAMETROS> ) { <SENTENCIAS_M> }
                //Agregar Contenido
                ContenidoPython += L_Tokens_S[pos].Lexema;
                pos++;
                pos = this.ParI(pos, 0);
                pos = this.Parametros(pos);
                pos = this.ParD(pos, 0);
                pos = this.LlaveI(pos);
                pos = this.Sentencias_M(pos);
                pos = this.LlaveD(pos);
                break;
            }
            else {
                L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: Id o main", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
            }
            pos++;
        }
        return pos;
    };
    Analizador_S.prototype.Funciones = function (pos) {
        //-><TIPO> id ( <PARAMETROS> ){ <SENTENCIAS_F> }
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Descripcion == "Id") {
                //Agregamos Contenido
                ContenidoPython += L_Tokens_S[pos].Lexema;
                pos++;
                break;
            }
            else {
                L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: Id", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                pos++;
            }
        }
        pos = this.ParI(pos, 0);
        pos = this.Parametros(pos);
        pos = this.ParD(pos, 0);
        pos = this.LlaveI(pos);
        pos = this.Sentencias_F(pos);
        pos = this.LlaveD(pos);
        return pos;
    };
    Analizador_S.prototype.Parametros = function (pos) {
        //-><DECLARACION>
        if (pos < L_Tokens_S.length) {
            pos = this.DeclaracionP(pos);
        }
        return pos;
    };
    Analizador_S.prototype.Sentencias = function (pos) {
        if (pos < L_Tokens.length) {
            if (L_Tokens_S[pos].Lexema.toLowerCase() == "if") { //->if ( <CONDICION> ){ <SENTENCIAS> } <ELSE>
                for (var postb = 0; postb < CantidadTabs; postb++) {
                    ContenidoPython += "\t";
                }
                ContenidoPython += "if ";
                pos++;
                pos = this.ParI(pos, 1);
                pos = this.Condicion(pos);
                pos = this.ParD(pos, 1);
                pos = this.LlaveI(pos);
                while (pos < L_Tokens_S.length) {
                    var postem = pos;
                    pos = this.Sentencias(pos);
                    if (pos == postem) {
                        if (L_Tokens_S[pos].Lexema == "}") {
                            break;
                        }
                        else {
                            pos++;
                        }
                    }
                    else {
                        if (L_Tokens_S[pos].Lexema == "}") {
                            break;
                        }
                    }
                }
                pos = this.LlaveD(pos);
                pos = this.Else(pos);
            }
            else if (L_Tokens_S[pos].Lexema.toLowerCase() == "switch") { //->switch ( Digito ) { <CASOS> }<SENTENCIAS>
                for (var postb = 0; postb < CantidadTabs; postb++) {
                    ContenidoPython += "\t";
                }
                ContenidoPython += "def switch";
                pos++;
                pos = this.ParI(pos, 0);
                pos = this.Digito_Id(pos);
                pos = this.ParD(pos, 0);
                pos = this.LlaveI(pos);
                for (var postb = 0; postb < CantidadTabs; postb++) {
                    ContenidoPython += "\t";
                }
                ContenidoPython += "switcher={ \n";
                CantidadTabs++;
                while (pos < L_Tokens_S.length) {
                    var postem = pos;
                    pos = this.Casos(pos);
                    if (pos == postem) {
                        if (L_Tokens_S[pos].Lexema == "}") {
                            break;
                        }
                        else {
                            pos++;
                        }
                    }
                    else {
                        if (L_Tokens_S[pos].Lexema == "}") {
                            break;
                        }
                    }
                }
                pos = this.LlaveD(pos);
                for (var postb = 0; postb < CantidadTabs; postb++) {
                    ContenidoPython += "\t";
                }
                ContenidoPython += "} \n";
                CantidadTabs--;
            }
            else if (L_Tokens_S[pos].Lexema.toLowerCase() == "for") { //->for ( <DECLARACION> ; <CONDICION> ; <ITERADOR> ){ <SENTENCIAS_CICLO> }<SENTENCIAS>
                for (var postb = 0; postb < CantidadTabs; postb++) {
                    ContenidoPython += "\t";
                }
                ContenidoPython += "for ";
                pos++;
                pos = this.ParI(pos, 1);
                while (pos < L_Tokens_S.length) {
                    var postem = pos;
                    pos = this.Tipo(pos, 1);
                    if (pos != postem) {
                        pos = this.Digito_Id(pos);
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: Tipo", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
                pos = this.Igual(pos);
                ContenidoPython += " in range( ";
                pos = this.Digito_Id(pos);
                pos = this.PuntoyComa(pos);
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Descripcion == "Digito" || L_Tokens_S[pos].Descripcion == "Id") {
                        pos++;
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: Digito o Id", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == ">") {
                        pos++;
                        if (pos < L_Tokens_S.length) {
                            if (L_Tokens_S[pos].Lexema == "=") {
                                pos++;
                            }
                        }
                        break;
                    }
                    else if (L_Tokens_S[pos].Lexema == "<") {
                        pos++;
                        if (pos < L_Tokens_S.length) {
                            if (L_Tokens_S[pos].Lexema == "=") {
                                pos++;
                            }
                        }
                        break;
                    }
                    else if (L_Tokens_S[pos].Lexema == "!") {
                        pos++;
                        if (pos < L_Tokens_S.length) {
                            if (L_Tokens_S[pos].Lexema == "=") {
                                pos++;
                                break;
                            }
                        }
                    }
                    else if (L_Tokens_S[pos].Lexema == "=") {
                        pos++;
                        if (pos < L_Tokens_S.length) {
                            if (L_Tokens_S[pos].Lexema == "=") {
                                pos++;
                                break;
                            }
                        }
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: >,<,>=,<=,==,!=", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
                ContenidoPython += ",";
                pos = this.Id_Cadena_Digito(pos);
                pos = this.PuntoyComa(pos);
                pos = this.Iterador(pos);
                pos = this.ParD(pos, 0);
                pos = this.LlaveI(pos);
                pos = this.Sentencias_Ciclo(pos);
                pos = this.LlaveD(pos);
            }
            else if (L_Tokens_S[pos].Lexema.toLowerCase() == "while") { //->while ( <CONDICION> ){ <SENTENCIAS_CICLO> }<SENTENCIAS>
                for (var postb = 0; postb < CantidadTabs; postb++) {
                    ContenidoPython += "\t";
                }
                ContenidoPython += "while ";
                pos++;
                pos = this.ParI(pos, 1);
                pos = this.Condicion(pos);
                pos = this.ParD(pos, 1);
                pos = this.LlaveI(pos);
                pos = this.Sentencias_Ciclo(pos);
                pos = this.LlaveD(pos);
            }
            else if (L_Tokens_S[pos].Lexema.toLowerCase() == "do") { //->do { <SENTENCIAS_CICLO> } while ( <CONDICION> ); <SENTENCIAS>
                for (var postb = 0; postb < CantidadTabs; postb++) {
                    ContenidoPython += "\t";
                }
                ContenidoPython += "while true";
                pos++;
                pos = this.LlaveI(pos);
                pos = this.Sentencias_Ciclo(pos);
                pos = this.LlaveD(pos);
                CantidadTabs++;
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema.toLowerCase() == "while") {
                        pos++;
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: while", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
                pos = this.ParI(pos, 1);
                for (var postb = 0; postb < CantidadTabs; postb++) {
                    ContenidoPython += "\t";
                }
                ContenidoPython += "if( ";
                pos = this.Condicion(pos);
                pos = this.ParD(pos, 0);
                ContenidoPython += ": \n";
                pos = this.PuntoyComa(pos);
                for (var postb = 0; postb < CantidadTabs; postb++) {
                    ContenidoPython += "\t";
                }
                ContenidoPython += "\tbreak\n";
                CantidadTabs--;
            }
            else if (L_Tokens_S[pos].Lexema.toLowerCase() == "console") { //->Console.WriteLine( <CADENA_IMPRIMIR> ); <SENTENCIAS>
                for (var postb = 0; postb < CantidadTabs; postb++) {
                    ContenidoPython += "\t";
                }
                pos++;
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == ".") {
                        pos++;
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: .", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema.toLowerCase() == "write" || L_Tokens_S[pos].Lexema.toLowerCase() == "writeline") {
                        pos++;
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: Line", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
                ContenidoPython += "print";
                pos = this.ParI(pos, 0);
                pos = this.CadenaImprimir(pos);
                pos = this.ParD(pos, 0);
                pos = this.PuntoyComa(pos);
                ContenidoPython += "\n";
            }
            else { //-><DECLARACION>
                variable = [];
                Contenidvar = "";
                pos = this.Declaracion(pos);
                for (var posv = 0; posv < variable.length; posv++) {
                    for (var postb = 0; postb < CantidadTabs; postb++) {
                        ContenidoPython += "\t";
                    }
                    ContenidoPython += "var " + variable[posv] + "=" + Contenidvar + "\n";
                }
                //Declaracion solo para asignacion de valor
                if (variable.length == 0) {
                    if (L_Tokens_S[pos].Descripcion == "Id") {
                        var Contem = L_Tokens_S[pos].Lexema + " = ";
                        pos++;
                        if (pos < L_Tokens_S.length) {
                            if (L_Tokens_S[pos].Lexema == "=") {
                                for (var postb = 0; postb < CantidadTabs; postb++) {
                                    ContenidoPython += "\t";
                                }
                                ContenidoPython += Contem;
                                pos++;
                                pos = this.ExpresionSinContenido(pos);
                                pos = this.PuntoyComa(pos);
                                ContenidoPython += Contenidvar + "\n";
                            }
                            else {
                                pos--;
                            }
                        }
                        else {
                            pos--;
                        }
                    }
                }
            }
        }
        return pos;
    };
    Analizador_S.prototype.Sentencias_M = function (pos) {
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Lexema.toLowerCase() == "return") { //->return;
                for (var postb = 0; postb < CantidadTabs; postb++) {
                    ContenidoPython += "\t";
                }
                ContenidoPython += "return ";
                pos++;
                pos = this.PuntoyComa(pos);
                ContenidoPython += "\n";
                if (L_Tokens_S[pos].Lexema == "}") {
                    break;
                }
            }
            else {
                //-><SENTENCIAS> <SENTENCIAS_M>
                var postem = pos;
                pos = this.Sentencias(pos);
                if (pos == postem) {
                    if (L_Tokens_S[pos].Lexema == "}") {
                        break;
                    }
                    else {
                        pos++;
                    }
                }
                else {
                    if (L_Tokens_S[pos].Lexema == "}") {
                        break;
                    }
                }
            }
        }
        return pos;
    };
    Analizador_S.prototype.Sentencias_F = function (pos) {
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Lexema.toLowerCase() == "return") { //->return <VALORES>;
                //Agregar Contenido
                for (var postb = 0; postb < CantidadTabs; postb++) {
                    ContenidoPython += "\t";
                }
                ContenidoPython += "return ";
                pos++;
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == ";") {
                        ContenidoPython += "\n";
                        pos++;
                        break;
                    }
                    else {
                        ContenidoPython += L_Tokens_S[pos].Lexema;
                    }
                    pos++;
                }
                if (L_Tokens_S[pos].Lexema == "}") {
                    break;
                }
            }
            else {
                //-><SENTENCIAS> <SENTENCIAS_F>
                var postem = pos;
                pos = this.Sentencias(pos);
                if (pos == postem) {
                    if (L_Tokens_S[pos].Lexema == "}") {
                        break;
                    }
                    else {
                        pos++;
                    }
                }
                else {
                    if (L_Tokens_S[pos].Lexema == "}") {
                        break;
                    }
                }
            }
        }
        return pos;
    };
    Analizador_S.prototype.Declaracion = function (pos) {
        // -> <TIPO> <L_ID> <DECLARACION_TIPO>
        if (pos < L_Tokens_S.length) {
            var postem = pos;
            pos = this.Tipo(pos, 1);
            if (pos != postem) {
                pos = this.L_Id(pos);
                pos = this.Declaracion_Tipo(pos);
            }
        }
        return pos;
    };
    Analizador_S.prototype.DeclaracionP = function (pos) {
        // -> <TIPO> <L_ID> <DECLARACION_TIPO>
        if (pos < L_Tokens_S.length) {
            var postem = pos;
            pos = this.Tipo(pos, 1);
            if (pos != postem) {
                pos = this.Digito_Id(pos);
                if (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == "=") { //->= <EXPRESION> ;
                        //Agregar Contenido
                        ContenidoPython += "= ";
                        pos++;
                        pos = this.Expresion(pos);
                    }
                    else if (L_Tokens_S[pos].Lexema == ",") {
                        //Agregar Contenido
                        ContenidoPython += ", ";
                        pos++;
                        while (pos < L_Tokens_S.length) {
                            postem = pos;
                            pos = this.Tipo(pos, 1);
                            if (pos == postem) {
                                L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: int,double,char,bool,string", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                                pos++;
                            }
                            else {
                                break;
                            }
                        }
                        pos = this.Digito_Id(pos);
                        pos = this.DeclaracionP(pos);
                    }
                }
            }
        }
        return pos;
    };
    Analizador_S.prototype.L_Id = function (pos) {
        if (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Descripcion == "Id") { //->id <L_ID>
                //Agregar Contenido
                variable.push(L_Tokens_S[pos].Lexema);
                variableTotal.push({ "Lexema": L_Tokens_S[pos].Lexema, "Tipo": Tipovar, "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                pos++;
                pos = this.L_Id(pos);
            }
            else if (L_Tokens_S[pos].Lexema == ",") { //->,id <L_ID>
                //Agregar Contenido
                pos++;
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Descripcion == "Id") {
                        //Agregar Contenido
                        variable.push(L_Tokens_S[pos].Lexema);
                        variableTotal.push({ "Lexema": L_Tokens_S[pos].Lexema, "Tipo": Tipovar, "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: Id", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
                pos = this.L_Id(pos);
            }
        }
        return pos;
    };
    Analizador_S.prototype.Declaracion_Tipo = function (pos) {
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Lexema == ";") { //->;
                pos++;
                break;
            }
            else if (L_Tokens_S[pos].Lexema == "=") { //->= <EXPRESION> ;
                pos++;
                pos = this.ExpresionSinContenido(pos);
                pos = this.PuntoyComa(pos);
                break;
            }
            else {
                L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: ; o =", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                pos++;
            }
        }
        return pos;
    };
    Analizador_S.prototype.Expresion = function (pos) {
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Descripcion == "Digito") { //->Digito <OPERACION>
                //Agregamos Contenido
                ContenidoPython += L_Tokens_S[pos].Lexema;
                pos++;
                pos = this.Operacion(pos);
                break;
            }
            else if (L_Tokens_S[pos].Lexema == "\"") { //->“ Cadena ” <OPERACION>
                //Agregamos Contenido
                ContenidoPython += "\"";
                pos++;
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Descripcion == "Cadena") {
                        //Agregamos Contenido
                        ContenidoPython += L_Tokens_S[pos].Lexema;
                        pos++;
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: Cadena", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == "\"") {
                        //Agregamos Contenido
                        ContenidoPython += "\"";
                        pos++;
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: \"", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
                pos = this.Operacion(pos);
                break;
            }
            else if (L_Tokens_S[pos].Lexema == "\'") { //' Cadena ' <OPERACION>
                //Agregamos Contenido
                ContenidoPython += "\'";
                pos++;
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Descripcion == "Cadena") {
                        //Agregamos Contenido
                        if (L_Tokens_S[pos].Lexema.length != 1) {
                            CadenaHTML += L_Tokens_S[pos].Lexema;
                        }
                        ContenidoPython += L_Tokens_S[pos].Lexema;
                        pos++;
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: Cadena", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == "\'") {
                        //Agregamos Contenido
                        ContenidoPython += "\'";
                        pos++;
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: \'", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
                pos = this.Operacion(pos);
                break;
            }
            else if (L_Tokens_S[pos].Descripcion == "Id") { //-> Id
                //Agregamos Contenido
                ContenidoPython += L_Tokens_S[pos].Lexema;
                pos++;
                pos = this.Operacion(pos);
                break;
            }
            else {
                L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: Id , \" , \' , Digito", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                pos++;
            }
        }
        return pos;
    };
    Analizador_S.prototype.ExpresionSinContenido = function (pos) {
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Descripcion == "Digito") { //->Digito <OPERACION>
                //Agregamos Contenido
                Contenidvar += L_Tokens_S[pos].Lexema;
                pos++;
                if (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == "+" || L_Tokens_S[pos].Lexema == "-" || L_Tokens_S[pos].Lexema == "*" || L_Tokens_S[pos].Lexema == "/") {
                        Contenidvar += L_Tokens_S[pos].Lexema;
                        pos++;
                        pos = this.ExpresionSinContenido(pos);
                    }
                }
                break;
            }
            else if (L_Tokens_S[pos].Lexema == "\"") { //->“ Cadena ” <OPERACION>
                //Agregamos Contenido
                Contenidvar += L_Tokens_S[pos].Lexema;
                pos++;
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Descripcion == "Cadena") {
                        //Agregamos Contenido
                        Contenidvar += L_Tokens_S[pos].Lexema;
                        pos++;
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: Cadena", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == "\"") {
                        //Agregamos Contenido
                        Contenidvar += L_Tokens_S[pos].Lexema;
                        pos++;
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: \"", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
                if (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == "+" || L_Tokens_S[pos].Lexema == "-" || L_Tokens_S[pos].Lexema == "*" || L_Tokens_S[pos].Lexema == "/") {
                        Contenidvar += L_Tokens_S[pos].Lexema;
                        pos++;
                        pos = this.ExpresionSinContenido(pos);
                    }
                }
                break;
            }
            else if (L_Tokens_S[pos].Lexema == "\'") { //' Cadena ' <OPERACION>
                //Agregamos Contenido
                Contenidvar += L_Tokens_S[pos].Lexema;
                pos++;
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Descripcion == "Cadena") {
                        //Agregamos Contenido
                        if (L_Tokens_S[pos].Lexema.length != 1) {
                            CadenaHTML += L_Tokens_S[pos].Lexema;
                        }
                        Contenidvar += L_Tokens_S[pos].Lexema;
                        pos++;
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: Cadena", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == "\'") {
                        //Agregamos Contenido
                        Contenidvar += L_Tokens_S[pos].Lexema;
                        pos++;
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: \'", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
                if (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == "+" || L_Tokens_S[pos].Lexema == "-" || L_Tokens_S[pos].Lexema == "*" || L_Tokens_S[pos].Lexema == "/") {
                        Contenidvar += L_Tokens_S[pos].Lexema;
                        pos++;
                        pos = this.ExpresionSinContenido(pos);
                    }
                }
                break;
            }
            else if (L_Tokens_S[pos].Descripcion == "Id") { //-> Id
                //Agregamos Contenido
                Contenidvar += L_Tokens_S[pos].Lexema;
                pos++;
                if (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == "+" || L_Tokens_S[pos].Lexema == "-" || L_Tokens_S[pos].Lexema == "*" || L_Tokens_S[pos].Lexema == "/") {
                        Contenidvar += L_Tokens_S[pos].Lexema;
                        pos++;
                        pos = this.ExpresionSinContenido(pos);
                    }
                }
                break;
            }
            else {
                L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: Id , \" , \' , Digito", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                pos++;
            }
        }
        return pos;
    };
    Analizador_S.prototype.Operacion = function (pos) {
        if (pos < L_Tokens_S.length) {
            var postem = pos;
            pos = this.Aritmetico(pos);
            if (pos != postem) {
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Descripcion == "Digito") { //->Digito <OPERACION>
                        //Agregamos Contenido
                        ContenidoPython += L_Tokens_S[pos].Lexema;
                        pos++;
                        pos = this.Operacion(pos);
                        break;
                    }
                    else if (L_Tokens_S[pos].Lexema == "\"") { //->“ Cadena ” <OPERACION>
                        //Agregamos Contenido
                        ContenidoPython += "\"";
                        pos++;
                        while (pos < L_Tokens_S.length) {
                            if (L_Tokens_S[pos].Descripcion == "Cadena") {
                                //Agregamos Contenido
                                ContenidoPython += L_Tokens_S[pos].Lexema;
                                pos++;
                                break;
                            }
                            else {
                                L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: Cadena", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                                pos++;
                            }
                        }
                        while (pos < L_Tokens_S.length) {
                            if (L_Tokens_S[pos].Lexema == "\"") {
                                //Agregamos Contenido
                                ContenidoPython += "\"";
                                pos++;
                                break;
                            }
                            else {
                                L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: \"", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                                pos++;
                            }
                        }
                        pos = this.Operacion(pos);
                        break;
                    }
                    else if (L_Tokens_S[pos].Lexema == "\'") { //' Cadena ' <OPERACION>
                        //Agregamos Contenido
                        ContenidoPython += "\'";
                        pos++;
                        while (pos < L_Tokens_S.length) {
                            if (L_Tokens_S[pos].Descripcion == "Cadena") {
                                //Agregamos Contenido
                                if (L_Tokens_S[pos].Lexema.length != 1) {
                                    CadenaHTML += L_Tokens_S[pos].Lexema;
                                }
                                ContenidoPython += L_Tokens_S[pos].Lexema;
                                pos++;
                                break;
                            }
                            else {
                                L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: Cadena", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                                pos++;
                            }
                        }
                        while (pos < L_Tokens_S.length) {
                            if (L_Tokens_S[pos].Lexema == "\'") {
                                //Agregamos Contenido
                                ContenidoPython += "\'";
                                pos++;
                                break;
                            }
                            else {
                                L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: \'", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                                pos++;
                            }
                        }
                        pos = this.Operacion(pos);
                        break;
                    }
                    else if (L_Tokens_S[pos].Descripcion == "Id") { //-> Id
                        //Agregamos Contenido
                        ContenidoPython += L_Tokens_S[pos].Lexema;
                        pos++;
                        pos = this.Operacion(pos);
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: Id , \" , \' , Digito", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
            }
        }
        return pos;
    };
    Analizador_S.prototype.Condicion = function (pos) {
        //->Digito Relacionales Digito <MAS_COND>
        pos = this.Id_Cadena_Digito(pos);
        pos = this.Relacionales(pos);
        pos = this.Id_Cadena_Digito(pos);
        pos = this.Mas_Cond(pos);
        return pos;
    };
    Analizador_S.prototype.Mas_Cond = function (pos) {
        var postem = pos;
        pos = this.Logicos(pos);
        if (pos != postem) {
            pos = this.Condicion(pos);
        }
        return pos;
    };
    Analizador_S.prototype.Else = function (pos) {
        if (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Lexema.toLowerCase() == "else") { //-><IF_O_NO>
                pos++;
                pos = this.IfoNo(pos);
            }
        }
        return pos;
    };
    Analizador_S.prototype.IfoNo = function (pos) {
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Lexema == "{") { //->{ <SENTENCIAS> }
                for (var postb = 0; postb < CantidadTabs; postb++) {
                    ContenidoPython += "\t";
                }
                ContenidoPython += "else: \n";
                CantidadTabs++;
                pos++;
                while (pos < L_Tokens_S.length) {
                    var postem = pos;
                    pos = this.Sentencias(pos);
                    if (pos == postem) {
                        if (L_Tokens_S[pos].Lexema == "}") {
                            break;
                        }
                        else {
                            pos++;
                        }
                    }
                    else {
                        if (L_Tokens_S[pos].Lexema == "}") {
                            break;
                        }
                    }
                }
                pos = this.LlaveD(pos);
                break;
            }
            else if (L_Tokens_S[pos].Lexema.toLowerCase() == "if") { //->if ( <CONDICION> ){ <SENTENCIAS> } <ELSE>
                for (var postb = 0; postb < CantidadTabs; postb++) {
                    ContenidoPython += "\t";
                }
                ContenidoPython += "elif: ";
                pos++;
                pos = this.ParI(pos, 1);
                pos = this.Condicion(pos);
                pos = this.ParD(pos, 1);
                pos = this.LlaveI(pos);
                while (pos < L_Tokens_S.length) {
                    var postem = pos;
                    pos = this.Sentencias(pos);
                    if (pos == postem) {
                        if (L_Tokens_S[pos].Lexema == "}") {
                            break;
                        }
                        else {
                            pos++;
                        }
                    }
                    else {
                        if (L_Tokens_S[pos].Lexema == "}") {
                            break;
                        }
                    }
                }
                pos = this.LlaveD(pos);
                pos = this.Else(pos);
                break;
            }
            else {
                L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: { o if ", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                pos++;
            }
        }
        return pos;
    };
    Analizador_S.prototype.Casos = function (pos) {
        if (L_Tokens_S[pos].Lexema.toLowerCase() == "case") { //->Case Valor : <SENTENCIAS_CASE> <CASOS>
            for (var postb = 0; postb < CantidadTabs; postb++) {
                ContenidoPython += "\t";
            }
            pos++;
            while (pos < L_Tokens_S.length) {
                if (L_Tokens_S[pos].Descripcion == "Digito") {
                    ContenidoPython += L_Tokens_S[pos].Lexema;
                    pos++;
                    break;
                }
                else {
                    L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: Digito", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                    pos++;
                }
            }
            pos = this.DosPuntos(pos);
            pos = this.Sentencias_Case(pos);
            CantidadTabs--;
            for (var postb = 0; postb < CantidadTabs; postb++) {
                ContenidoPython += "\t";
            }
            ContenidoPython += ", \n";
        }
        else if (L_Tokens_S[pos].Lexema.toLowerCase() == "default") { //->default : <SENTENCIAS_CASE> <CASOS>
            for (var postb = 0; postb < CantidadTabs; postb++) {
                ContenidoPython += "\t";
            }
            ContenidoPython += "default ";
            pos++;
            pos = this.DosPuntos(pos);
            pos = this.Sentencias_Case(pos);
            CantidadTabs--;
            for (var postb = 0; postb < CantidadTabs; postb++) {
                ContenidoPython += "\t";
            }
            ContenidoPython += ", \n";
        }
        return pos;
    };
    Analizador_S.prototype.Iterador = function (pos) {
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Lexema == ")") {
                break;
            }
            else {
                pos++;
            }
        }
        return pos;
    };
    Analizador_S.prototype.Sentencias_Ciclo = function (pos) {
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Lexema.toLowerCase() == "break") { //->break;
                for (var postb = 0; postb < CantidadTabs; postb++) {
                    ContenidoPython += "\t";
                }
                ContenidoPython += "break";
                pos++;
                pos = this.PuntoyComa(pos);
                ContenidoPython += "\n";
                if (L_Tokens_S[pos].Lexema == "}") {
                    break;
                }
            }
            else if (L_Tokens_S[pos].Lexema.toLowerCase() == "continue") { //->continue;
                for (var postb = 0; postb < CantidadTabs; postb++) {
                    ContenidoPython += "\t";
                }
                ContenidoPython += "continue";
                pos++;
                pos = this.PuntoyComa(pos);
                ContenidoPython += "\n";
                if (L_Tokens_S[pos].Lexema == "}") {
                    break;
                }
            }
            else {
                //-><SENTENCIAS> <SENTENCIAS_CICLO>
                var postem = pos;
                pos = this.Sentencias(pos);
                if (pos == postem) {
                    if (L_Tokens_S[pos].Lexema == "}") {
                        break;
                    }
                    else {
                        pos++;
                    }
                }
                else {
                    if (L_Tokens_S[pos].Lexema == "}") {
                        break;
                    }
                }
            }
        }
        return pos;
    };
    Analizador_S.prototype.CadenaImprimir = function (pos) {
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Descripcion == "Digito") { //->Digito <CADENAIMPRIMIR>
                ContenidoPython += L_Tokens_S[pos].Lexema;
                pos++;
                if (L_Tokens_S[pos].Lexema == ")") {
                    break;
                }
            }
            else if (L_Tokens_S[pos].Lexema == "\"") { //->“ Cadena ” <OPERACION>
                ContenidoPython += L_Tokens_S[pos].Lexema;
                pos++;
                if (L_Tokens_S[pos].Descripcion == "Cadena") {
                    ContenidoPython += L_Tokens_S[pos].Lexema;
                    pos++;
                }
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == "\"") {
                        ContenidoPython += L_Tokens_S[pos].Lexema;
                        pos++;
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: \"", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
                if (L_Tokens_S[pos].Lexema == ")") {
                    break;
                }
            }
            else if (L_Tokens_S[pos].Lexema == "\'") { //' Cadena ' <OPERACION>
                ContenidoPython += L_Tokens_S[pos].Lexema;
                pos++;
                if (L_Tokens_S[pos].Descripcion == "Cadena") {
                    if (L_Tokens_S[pos].Lexema.length != 1) {
                        CadenaHTML += L_Tokens_S[pos].Lexema;
                    }
                    ContenidoPython += L_Tokens_S[pos].Lexema;
                    pos++;
                }
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == "\'") {
                        ContenidoPython += L_Tokens_S[pos].Lexema;
                        pos++;
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: \'", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
                if (L_Tokens_S[pos].Lexema == ")") {
                    break;
                }
            }
            else if (L_Tokens_S[pos].Descripcion == "Id") { //-> Id
                ContenidoPython += L_Tokens_S[pos].Lexema;
                pos++;
                if (L_Tokens_S[pos].Lexema == ")") {
                    break;
                }
            }
            else { //->Operador CadenaImprimir
                var postem = pos;
                if (L_Tokens_S[pos].Lexema == "+" || L_Tokens_S[pos].Lexema == "-" || L_Tokens_S[pos].Lexema == "*" || L_Tokens_S[pos].Lexema == "/") {
                    //Agregar Contenido
                    ContenidoPython += ", ";
                    pos++;
                }
                if (pos == postem) {
                    if (L_Tokens_S[pos].Lexema == ")") {
                        break;
                    }
                    else {
                        pos++;
                    }
                }
                else {
                    pos = this.Id_Cadena_Digito(pos);
                    if (L_Tokens_S[pos].Lexema == ")") {
                        break;
                    }
                }
            }
        }
        return pos;
    };
    Analizador_S.prototype.Sentencias_Case = function (pos) {
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Lexema.toLowerCase() == "break") { //->break;
                pos++;
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == ";") {
                        pos++;
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: ;", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
                break;
            }
            else {
                //-><SENTENCIAS> <SENTENCIAS_CASE>
                var postem = pos;
                pos = this.Sentencias(pos);
                if (pos == postem) {
                    if (L_Tokens_S[pos].Lexema.toLowerCase() == "case" || L_Tokens_S[pos].Lexema.toLowerCase() == "default" || L_Tokens_S[pos].Lexema == "}") {
                        break;
                    }
                    else {
                        pos++;
                    }
                }
                else {
                    if (L_Tokens_S[pos].Lexema.toLowerCase() == "case" || L_Tokens_S[pos].Lexema.toLowerCase() == "default" || L_Tokens_S[pos].Lexema == "}") {
                        break;
                    }
                }
            }
        }
        return pos;
    };
    Analizador_S.prototype.Tipo = function (pos, Contenido) {
        if (L_Tokens_S[pos].Lexema.toLowerCase() == "int" || L_Tokens_S[pos].Lexema.toLowerCase() == "double" || L_Tokens_S[pos].Lexema.toLowerCase() == "char" || L_Tokens_S[pos].Lexema.toLowerCase() == "bool" || L_Tokens_S[pos].Lexema.toLowerCase() == "string") {
            //Agregamos Contenido
            Tipovar = L_Tokens_S[pos].Lexema;
            if (Contenido == 0) {
                ContenidoPython += "def ";
            }
            else {
                if (Contenido != 1) {
                    ContenidoPython += L_Tokens_S[pos].Lexema + " ";
                }
            }
            pos++;
        }
        else {
            if (Contenido == 0) {
                L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: int,double,char,bool,string,void", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
            }
            else {
                if (Contenido != 1) {
                    L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: int,double,char,bool,string", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                }
            }
        }
        return pos;
    };
    Analizador_S.prototype.Aritmetico = function (pos) {
        if (L_Tokens_S[pos].Lexema == "+" || L_Tokens_S[pos].Lexema == "-" || L_Tokens_S[pos].Lexema == "*" || L_Tokens_S[pos].Lexema == "/") {
            //Agregar Contenido
            ContenidoPython += L_Tokens_S[pos].Lexema;
            pos++;
        }
        return pos;
    };
    Analizador_S.prototype.Relacionales = function (pos) {
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Lexema == ">") {
                pos++;
                if (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == "=") {
                        ContenidoPython += " >= ";
                        pos++;
                    }
                    else {
                        ContenidoPython += " > ";
                    }
                }
                break;
            }
            else if (L_Tokens_S[pos].Lexema == "<") {
                pos++;
                if (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == "=") {
                        ContenidoPython += " <= ";
                        pos++;
                    }
                    else {
                        ContenidoPython += " < ";
                    }
                }
                break;
            }
            else if (L_Tokens_S[pos].Lexema == "!") {
                pos++;
                if (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == "=") {
                        ContenidoPython += " != ";
                        pos++;
                        break;
                    }
                }
            }
            else if (L_Tokens_S[pos].Lexema == "=") {
                pos++;
                if (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == "=") {
                        ContenidoPython += " == ";
                        pos++;
                        break;
                    }
                }
            }
            else {
                L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: >,<,>=,<=,==,!=", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                pos++;
            }
        }
        return pos;
    };
    Analizador_S.prototype.Logicos = function (pos) {
        if (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Lexema == "&") {
                ContenidoPython += " &";
                pos++;
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == "&") {
                        ContenidoPython += "& ";
                        pos++;
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: &", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
            }
            else if (L_Tokens_S[pos].Lexema == "|") {
                ContenidoPython += " |";
                pos++;
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == "|") {
                        ContenidoPython += "| ";
                        pos++;
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: |", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
            }
            else if (L_Tokens_S[pos].Lexema == "!") {
                ContenidoPython += " ! ";
                pos++;
            }
        }
        return pos;
    };
    Analizador_S.prototype.Id_Cadena_Digito = function (pos) {
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Descripcion == "Digito") { //->Digito <OPERACION>
                //Agregamos Contenido
                ContenidoPython += L_Tokens_S[pos].Lexema;
                pos++;
                break;
            }
            else if (L_Tokens_S[pos].Lexema == "\"") { //->“ Cadena ” <OPERACION>
                //Agregamos Contenido
                ContenidoPython += "\"";
                pos++;
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Descripcion == "Cadena") {
                        //Agregamos Contenido
                        ContenidoPython += L_Tokens_S[pos].Lexema;
                        pos++;
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: Cadena", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == "\"") {
                        //Agregamos Contenido
                        ContenidoPython += "\"";
                        pos++;
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: \"", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
                break;
            }
            else if (L_Tokens_S[pos].Lexema == "\'") { //' Cadena ' <OPERACION>
                //Agregamos Contenido
                ContenidoPython += "\'";
                pos++;
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Descripcion == "Cadena") {
                        //Agregamos Contenido
                        if (L_Tokens_S[pos].Lexema.length != 1) {
                            CadenaHTML += L_Tokens_S[pos].Lexema;
                        }
                        ContenidoPython += L_Tokens_S[pos].Lexema;
                        pos++;
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: Cadena", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
                while (pos < L_Tokens_S.length) {
                    if (L_Tokens_S[pos].Lexema == "\'") {
                        //Agregamos Contenido
                        ContenidoPython += "\'";
                        pos++;
                        break;
                    }
                    else {
                        L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: \'", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                        pos++;
                    }
                }
                break;
            }
            else if (L_Tokens_S[pos].Descripcion == "Id") { //-> Id
                //Agregamos Contenido
                ContenidoPython += L_Tokens_S[pos].Lexema;
                pos++;
                break;
            }
            else {
                L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: Id , \" , \' , Digito", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                pos++;
            }
        }
        return pos;
    };
    //Validaciones especiales
    Analizador_S.prototype.ParI = function (pos, Contenido) {
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Lexema == "(") {
                pos++;
                if (Contenido != 1) {
                    ContenidoPython += "( ";
                }
                break;
            }
            else {
                L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: (", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                pos++;
            }
        }
        return pos;
    };
    Analizador_S.prototype.ParD = function (pos, Contenido) {
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Lexema == ")") {
                pos++;
                if (Contenido != 1) {
                    ContenidoPython += " )";
                }
                break;
            }
            else {
                L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: )", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                pos++;
            }
        }
        return pos;
    };
    Analizador_S.prototype.LlaveI = function (pos) {
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Lexema == "{") {
                pos++;
                ContenidoPython += ": \n";
                break;
            }
            else {
                L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: {", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                pos++;
            }
        }
        CantidadTabs++;
        return pos;
    };
    Analizador_S.prototype.LlaveD = function (pos) {
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Lexema == "}") {
                pos++;
                //ContenidoPython+="} \n";
                break;
            }
            else {
                L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: }", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                pos++;
            }
        }
        CantidadTabs--;
        return pos;
    };
    Analizador_S.prototype.Digito_Id = function (pos) {
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Descripcion == "Digito" || L_Tokens_S[pos].Descripcion == "Id") {
                //Agregamos Contenido
                ContenidoPython += L_Tokens_S[pos].Lexema;
                pos++;
                break;
            }
            else {
                L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: Digito o Id", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                pos++;
            }
        }
        return pos;
    };
    Analizador_S.prototype.PuntoyComa = function (pos) {
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Lexema == ";") {
                pos++;
                //ContenidoPython+="; \n";
                break;
            }
            else {
                L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: ;", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                pos++;
            }
        }
        return pos;
    };
    Analizador_S.prototype.DosPuntos = function (pos) {
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Lexema == ":") {
                CantidadTabs++;
                pos++;
                ContenidoPython += ": \n";
                break;
            }
            else {
                L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: :", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                pos++;
            }
        }
        return pos;
    };
    Analizador_S.prototype.Igual = function (pos) {
        while (pos < L_Tokens_S.length) {
            if (L_Tokens_S[pos].Lexema == "=") {
                pos++;
                break;
            }
            else {
                L_Tokens_S_Error.push({ "Id": -1, "Lexema": L_Tokens_S[pos].Lexema, "Descripcion": "Error Sintactico, Se Esperaba: =", "Fila": L_Tokens_S[pos].Fila, "Columna": L_Tokens_S[pos].Columna });
                pos++;
            }
        }
        return pos;
    };
    return Analizador_S;
}());
function Analizar_S() {
    L_Tokens_S = RetornarLista();
    L_Tokens_S_Error = RetornarLista_Error();
    var nuevo = new Analizador_S();
    nuevo.Inicio(1);
    //Agregamos Contenido
    AgregarContenidoT();
    CambioHTML_JSON(CadenaHTML);
    document.getElementById("CampoTextoPython").value = ContenidoPython;
    alert("Se Analizo Correctamente");
}
function AgregarContenidoT() {
    //Agregar a Tabla
    var ttabla = document.getElementById("tablaVar");
    try {
        ttabla.removeChild(ttabla.getElementsByTagName("tbody")[0]);
    }
    catch (error) { }
    var tblBody = document.createElement("tbody");
    for (var posv = 0; posv < variableTotal.length; posv++) {
        var hilera = document.createElement("tr");
        //No
        var celda = document.createElement("td");
        var textoCelda = document.createTextNode("" + (posv + 1));
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
        //Nombre
        var celda = document.createElement("td");
        var textoCelda = document.createTextNode("" + variableTotal[posv].Lexema);
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
        //Tipo
        var celda = document.createElement("td");
        var textoCelda = document.createTextNode("" + variableTotal[posv].Tipo);
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
        //Fila
        var celda = document.createElement("td");
        var textoCelda = document.createTextNode("" + variableTotal[posv].Fila);
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
        //Nombre
        var celda = document.createElement("td");
        var textoCelda = document.createTextNode("" + variableTotal[posv].Columna);
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
        tblBody.appendChild(hilera);
    }
    ttabla.appendChild(tblBody);
}
