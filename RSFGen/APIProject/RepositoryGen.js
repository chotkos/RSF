var generateRepository = function () {

    $.ajax({
        url: "APIProject/Templates/ExampleRepository.cs",
        dataType: "text",
        success: function (data) {
            var entityName = $('#model-select').val();
            data = data.replace(/{{EntityName}}/g, entityName);
            $("#repository").val(data);
        }
    });
}