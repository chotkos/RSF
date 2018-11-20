var generateMap = function () {

	var entityName = $('#model-select').val(); 

	$.ajax({
		url: "NameSQLMapper.cs",
		dataType: "text",
		success: function (data) {
			data = data.replace(/{{EntityName}}/g, entityName);
			console.log(data);
			$("#mapper").val(data);

		}
	});

};
