
var getType = function(column,columnName){
    switch(column.type){
        case "integer":
            if(columnName == "Id"){
                return  columnName+" INT PRIMARY KEY"
            } else{
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
            break;  
        case "number":
            return  columnName+" DECIMAL(18,2)";
            break;
        default: 
            var refTable = column["$ref"].split('definitions/')[1];
            return columnName+"Id INT FOREIGN KEY REFERENCES "+refTable+"refTable(Id)";
            break
    }
};
 

var generateSQLTables = function(definitions){
    var result = "";
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
                        var type = getType(col,columnName);
                        var comma = k<keysCounter? ',':'';
                        tableResult+= type +comma + " \n";
                    }
                });
            
            result+= tableResult + ");\n";
        });
    console.log(result);
    $('#sql-result').val(result);
};
