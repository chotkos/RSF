var getSQLForDefinition= function(definition)  {
    
};

var generateSQLTables = function(definitions){
    var result = "";
    Object.keys(definitions)
        .forEach(entityName => {
            var tableResult = "CREATE TABLE " + entityName + "; ";
            var columns = definitions[entityName];
            Object.keys(columns)
                .forEach(columnName => {
                    var col =  columns[columnName]
                    console.log(col);
                });
            
            
            
            result+= tableResult
        });
};
