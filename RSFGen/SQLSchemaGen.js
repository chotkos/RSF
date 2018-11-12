
var getType = function(column,columnName){
    switch(column.type){
        case "integer":
            if(columnName == "Id"){
                return " INT32 PRIMARY KEY"
            } else{
                return " INT32";
            }
            break;
        case "string":
            if(column.format === "date-time"){
                return " DATETIME";
            } else {
                return " VARCHAR(100)";
            }
            break;
        case "boolean":
            return " BIT"
            break;  
        default:
            var refTable = column["$ref"].split('definitions/')[0];
            return "Id INT FOREIGN KEY REFERENCES "+refTable+"refTable(Id)";
            break
    }
};
 

var generateSQLTables = function(definitions){
    var result = "";
    Object.keys(definitions)
        .forEach(entityName => {
            var tableResult = "CREATE TABLE " + entityName + "; ";
            var columns = definitions[entityName].properties;
            Object.keys(columns)
                .forEach(columnName => {
                    var col =  columns[columnName]
                    console.log(col);
                    var type = getType(col,columnName); 
                    tableResult+= "ALTER TABLE "+ entityName + " ADD " + columnName + type +"; ";
                });
            
            result+= tableResult
        });
    console.log(result);
};
