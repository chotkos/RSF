
var getType = function(column,columnName){
    switch(column.type){
        case "integer":
            if(columnName == "Id"){
                return " ADD "+columnName+" INT32 PRIMARY KEY"
            } else{
                return " ADD "+columnName+" INT32";
            }
            break;
        case "string":
            if(column.format === "date-time"){
                return " ADD "+columnName+" DATETIME";
            } else {
                return " ADD "+columnName+" VARCHAR(100)";
            }
            break;
        case "boolean":
            return " ADD "+columnName+" BIT"
            break;  
        case "number":
            return " ADD "+columnName+" DECIMAL(18,2)";
            break;
        default: 
            var refTable = column["$ref"].split('definitions/')[1];
            return " ADD "+columnName+"Id INT FOREIGN KEY REFERENCES "+refTable+"refTable(Id)";
            break
    }
};
 

var generateSQLTables = function(definitions){
    var result = "";
    Object.keys(definitions)
        .forEach(entityName => {
            var tableResult = "CREATE TABLE " + entityName + " ( ";
            var columns = definitions[entityName].properties;
            Object.keys(columns)
                .forEach(columnName => {
                    if(columnName!= "type"){
                        var col =  columns[columnName]
                        console.log(col);
                        var type = getType(col,columnName); 
                        tableResult+= "ALTER TABLE "+ entityName + type +", \n";
                    }
                });
            
            result+= tableResult + ");";
        });
    console.log(result);
    $('#sql-result').val(result);
};
