var generateMap = function () {

	var entityName = $('#model-select').val();
	var properties = "\n";
	var propertiesObj = document.data.definitions[entityName].properties;

	Object.keys(propertiesObj)
		.forEach(columnName => {
			if (columnName != "Id") {
				var column = propertiesObj[columnName];
				//console.log(columnName);
				switch (column.type) {
					case "integer":
						//provider.AddColumn("NumberInt", v.NumberInt, "");
						properties += '\t\t\tprovider.AddColumn("' + columnName + '", v.' + columnName + ');\n';
						break;
					case "string":
						properties += '\t\t\tprovider.AddColumn("' + columnName + '", v.' + columnName + ');\n';
						break;
					case "boolean":
						// if(v.Active.HasValue) provider.AddColumn("Active", (v.Active.Value ? 1:0).ToString(), string.Empty);
						properties += '\t\t\if(v.' + columnName + '.HasValue) provider.AddColumn("' + columnName + '", (v.' + columnName + '.Value ? 1:0).ToString());';
						break;
					case "number":
						properties += '\t\t\tprovider.AddColumn("' + columnName + '", v.' + columnName + ');\n';
						break;
					default:
						if(column["$ref"])
						{
							var idSuffix = column["$ref"] ? 'Id' : '';
							properties += '\t\t\tvar keyValue = v.'+columnName+idSuffix+'.HasValue ? v.'+columnName+idSuffix+'.Value.ToString() : String.Empty;\n';
							properties += '\t\t\tprovider.AddColumn("' + columnName + idSuffix + '", keyValue);\n';

						} else{
							properties += '\t\t\tprovider.AddColumn("' + columnName  + '", v.' + columnName  + ');\n';
						}

				}
			}
		});

	$.ajax({
		url: "APIProject/Templates/ExampleSQLMapper.cs",
		dataType: "text",
		success: function (data) {
			data = data.replace(/{{EntityName}}/g, entityName);
			data = data.replace(/{{Columns}}/g, properties);
			$("#mapper").val(data);

		}
	});

};