var generateMap = function () {

	var entityName = $('#model-select').val();
	var properties = "\n";
	var propertiesObj = document.data.definitions[entityName].properties;
	var keyValueCounter = 0;

	Object.keys(propertiesObj)
		.forEach(columnName => {
			if (columnName != "Id") {
				var column = propertiesObj[columnName];
				//console.log(columnName);
				switch (column.type) {
					case "integer":
						//provider.AddColumn("NumberInt", v.NumberInt, "");
						properties += '\t\t\tprovider.AddColumn("' + columnName + '", v.' + columnName + '.ToString());\n';
						break;
					case "string":

						if (column.format === "date-time") {
							keyValueCounter++;
							properties += '\t\t\tvar dateString' + keyValueCounter + ' = v.' + columnName + ' != null ? v.' + columnName + '.ToString("yyyy-MM-dd HH:mm:ss") : String.Empty ;\n';
							properties += '\t\t\tprovider.AddColumn("' + columnName + '", dateString' + keyValueCounter + ');\n';
						} else {
							properties += '\t\t\tprovider.AddColumn("' + columnName + '", v.' + columnName + ');\n';
						}
						break;
					case "boolean":
						// if(v.Active.HasValue) provider.AddColumn("Active", (v.Active.Value ? 1:0).ToString(), string.Empty);
						properties += '\t\t\tif(v.' + columnName + '.HasValue) provider.AddColumn("' + columnName + '", (v.' + columnName + '.Value ? 1:0).ToString());\n';
						break;
					case "number":
						properties += '\t\t\tprovider.AddColumn("' + columnName + '", v.' + columnName + '.ToString() );\n';
						break;
					default:
						if (column["$ref"]) {
							keyValueCounter++;
							var idSuffix = column["$ref"] ? 'Id' : '';
							properties += '\t\t\tvar keyValue' + keyValueCounter + ' = v.' + columnName + idSuffix + '.HasValue ? v.' + columnName + idSuffix + '.Value.ToString() : String.Empty;\n';
							properties += '\t\t\tprovider.AddColumn("' + columnName + idSuffix + '", keyValue' + keyValueCounter + ');\n';

						} else {
							properties += '\t\t\tprovider.AddColumn("' + columnName + '", v.' + columnName + ');\n';
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