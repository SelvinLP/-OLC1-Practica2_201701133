"use strict";
function MostrarReporte_L() {
    var L_Tokens = RetornarLista();
    //HTML
    var nueva_ventana = window.open('./Reportes/Reporte_Lex.html','_blank');
    var texto = "<!DOCTYPE html> ";
    texto+="<html lang=\"en\">";
    texto+="<head>";
    texto+="<meta charset=\"UTF-8\">";
    texto+="<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">";
    texto+="<title>Reporte Lexico</title>";
    texto+="<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css\" integrity=\"sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh\" crossorigin=\"anonymous\">";
    texto+="<script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js\" integrity=\"sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6\" crossorigin=\"anonymous\"></script>";
    texto+="</head>";
    texto+="<body>";
    texto+="<H1>Lista Tokens</H1>";
    texto+= "<table class=\"table\"><thead class=\"thead-dark\"> \n";
    texto+="<tr> \n";
    texto+= "<th scope=\"col\">#</th> \n";
    texto+= "<th scope=\"col\">Id</th> \n";
    texto+= "<th scope=\"col\">Nombre</th> \n";
    texto+= "<th scope=\"col\">Tipo</th> \n";
    texto+= "<th scope=\"col\">Fila</th> \n";
    texto+= "<th scope=\"col\">Columna</th> \n";
    texto+= "</tr> \n";
    texto+= "</thead> \n";
    texto+= "<tbody>";
    //contenido de la tabla
    var No=1;
    for(var pos=1;pos<L_Tokens.length;pos++){
        texto+= "<tr> \n";
        texto+= "<th scope=\"row\">"+No+"</th> \n";
        texto+= "<td>"+L_Tokens[pos].Id+"</td> \n";
        texto+= "<td>"+L_Tokens[pos].Lexema+"</td> \n";
        texto+= "<td>"+L_Tokens[pos].Descripcion+"</td> \n";
        texto+= "<td>"+L_Tokens[pos].Fila+"</td> \n";
        texto+= "<td>"+L_Tokens[pos].Columna+"</td> \n";
        texto+= "</tr> \n";
        No++;
    }
    texto+= "</tbody> \n";
    texto+= "</table> \n";

    texto+="</body>";
    texto+="</html>";
    nueva_ventana.document.write(texto);
}

//Reporte de Errores
function MostrarReporte_E() {
    var L_Tokens = RetornarLista_Error();
    //HTML
    var nueva_ventana = window.open('./Reportes/Reporte_Errores.html','_blank');
    var texto = "<!DOCTYPE html> ";
    texto+="<html lang=\"en\">";
    texto+="<head>";
    texto+="<meta charset=\"UTF-8\">";
    texto+="<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">";
    texto+="<title>Reporte Errores</title>";
    texto+="<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css\" integrity=\"sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh\" crossorigin=\"anonymous\">";
    texto+="<script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js\" integrity=\"sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6\" crossorigin=\"anonymous\"></script>";
    texto+="</head>";
    texto+="<body>";
    texto+="<H1>Lista de Errores</H1>";
    texto+= "<table class=\"table\"><thead class=\"thead-dark\"> \n";
    texto+="<tr> \n";
    texto+= "<th scope=\"col\">#</th> \n";
    texto+= "<th scope=\"col\">Nombre</th> \n";
    texto+= "<th scope=\"col\">Descripcion</th> \n";
    texto+= "<th scope=\"col\">Fila</th> \n";
    texto+= "<th scope=\"col\">Columna</th> \n";
    texto+= "</tr> \n";
    texto+= "</thead> \n";
    texto+= "<tbody>";
    //contenido de la tabla
    var No=1;
    for(var pos=1;pos<L_Tokens.length;pos++){
        texto+= "<tr> \n";
        texto+= "<th scope=\"row\">"+No+"</th> \n";
        texto+= "<td>"+L_Tokens[pos].Lexema+"</td> \n";
        texto+= "<td>"+L_Tokens[pos].Descripcion+"</td> \n";
        texto+= "<td>"+L_Tokens[pos].Fila+"</td> \n";
        texto+= "<td>"+L_Tokens[pos].Columna+"</td> \n";
        texto+= "</tr> \n";
        No++;
    }
    texto+= "</tbody> \n";
    texto+= "</table> \n";

    texto+="</body>";
    texto+="</html>";
    nueva_ventana.document.write(texto);
}