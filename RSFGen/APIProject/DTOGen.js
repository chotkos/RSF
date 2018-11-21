var generateDTO = function () {

	var properties = "\n";
	var entityName = $('#model-select').val();
	var propertiesObj = document.data.definitions[entityName].properties;

	Object.keys(propertiesObj)
		.forEach(columnName => {
			if (columnName != "Id") {
				var column = propertiesObj[columnName];
				//console.log(columnName);
				switch (column.type) {
					case "integer":
						properties += "\t\tpublic int " + columnName + " { get; set; }\n";
						break;
					case "string":
						if (column.format === "date-time") {
							properties += "\t\tpublic DateTime " + columnName + " { get; set; }\n";
						} else {
							properties += "\t\tpublic string " + columnName + " { get; set; }\n";
						}
						break;
					case "boolean":
						properties += "\t\tpublic bool? " + columnName + " { get; set; }\n";
						break;
					case "number":
						properties += "\t\tpublic decimal " + columnName + " { get; set; }\n";
						break;
					default:
						properties += "\t\tpublic int? " + columnName + "Id { get; set; }\n";

				}
			}
		});




	$.ajax({
		url: "APIProject/Templates/ExampleDTO.cs",
		dataType: "text",
		success: function (data) {
			data = data.replace(/{{EntityName}}/g, entityName);
			data = data.replace(/{{Properties}}/g, properties);
			$("#dto").val(data);
		}
	});

};