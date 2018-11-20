var generateMap = function () {

	var entityName = $('#model-select').val(); 
	var properties = "\n";
	var propertiesObj = document.data.definitions[entityName].properties;

	Object.keys(propertiesObj)
		.forEach(columnName => {
			if (columnName != "Id") {
				var column = propertiesObj[columnName];
				console.log(columnName);
				switch (column.type) {
					case "integer":
						//provider.AddColumn("NumberInt", v.NumberInt, "");
						properties += '\t\t\tprovider.AddColumn("'+columnName+'", v.'+columnName+', "");\n';
						break;
					case "string":
						properties += '\t\t\tprovider.AddColumn("'+columnName+'", v.'+columnName+', "\'");\n';												
						break;
					case "boolean":
						// if(v.Active.HasValue) provider.AddColumn("Active", (v.Active.Value ? 1:0).ToString(), string.Empty);
						properties += '\t\t\if(v.'+columnName+'.HasValue) provider.AddColumn("'+columnName+'", (v.'+columnName+'.Value ? 1:0).ToString(), string.Empty);';
						break;
					case "number":
						properties += '\t\t\tprovider.AddColumn("'+columnName+'", v.'+columnName+', "");\n';
						break;
					default:
						properties += '\t\t\tprovider.AddColumn("'+columnName+'", v.'+columnName+', "");\n';

				}
			}
		});







	$.ajax({
		url: "NameSQLMapper.cs",
		dataType: "text",
		success: function (data) {
			data = data.replace(/{{EntityName}}/g, entityName);
			
			data = data.replace(/{{Columns}}/g, properties);
			console.log(data);
			$("#mapper").val(data);

		}
	});

};
