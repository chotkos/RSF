var alters ="";


var getType = function(column,columnName,entityName){
    var originalCn = columnName;
    columnName = "["+columnName+"]";
    switch(column.type){
        case "integer":
            if(columnName == "[Id]"){
                return  columnName+" INT IDENTITY(1,1) PRIMARY KEY"
            } else {
                return  columnName+" INT";
            }
            break;
        case "string":
            if(column.format === "date-time"){
                return  columnName+" DATETIME";
            } else {
                return  columnName+" VARCHAR(100)";
            }
            break;
        case "boolean":
            return  columnName+" BIT"
        case "number":
            return  columnName+" DECIMAL(18,2)"; 
        default: 
            var refTable = column['$ref'].split('definitions/')[1]; 
            alters+="ALTER TABLE "+entityName+" ADD ["+originalCn+"Id] INT FOREIGN KEY REFERENCES "+refTable+"(Id); \n";

            return null;//columnName+"Id INT FOREIGN KEY REFERENCES "+refTable+"(Id)"; 
    }
};


var fillEntitySelector = function(){

	var entities = Object.keys(document.data.definitions);
	$('#model-select').empty()

	$.each( entities, function( key, value ) {
	  $('#model-select').append("<option value='"+value+"'>"+value+"</option>")
	});
};


var generateSQLTables = function(definitions){
    var dbName = $('#db-name').val();
    var result = "IF EXISTS(select * from sys.databases where name='"+dbName+"')" + 
	" DROP DATABASE "+dbName+"; \nCREATE DATABASE "+dbName+"; \nUSE "+$('#db-name').val()+"; \nGO \n";
    alters = "";
    Object.keys(definitions)
        .forEach(entityName => {
            var tableResult = "CREATE TABLE " + entityName + " ( \n";
            var columns = definitions[entityName].properties;
            var keysCounter = Object.keys(columns).length;
            var k=0;
            Object.keys(columns)
                .forEach(columnName => {
                    k++;
                    if(columnName!= "type"){
                        var col =  columns[columnName]
                        console.log(col);
                        var type = getType(col,columnName,entityName);
                        var comma = k<keysCounter? ',':'';
                        if(type){
	                        tableResult+= type +comma + " \n";
                        }
                    }
                });
            
            result+= tableResult + ");\n";
        });
        
    result+=alters;
        
        
    console.log(result);
    $('#sql-result').val(result);
	fillEntitySelector();
};
