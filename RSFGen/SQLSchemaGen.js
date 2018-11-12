var getSQLForDefinition= function(definition)  {
    
};

var generateSQLTables = function(definitions){
    var result = "";
    Object.keys(definitions)
        .forEach(entityName => {
            var tableResult = "CREATE TABLE " + entityName + "; ";
            console.log(tableResult);
            var columns = definitions[entityName];
            Object.keys(columns)
                .forEach(columnName => {
                    var col =  columns[columnName]
                    console.log("Column:", col);
                });
            
            
            
            result+= tableResult
        });
};
