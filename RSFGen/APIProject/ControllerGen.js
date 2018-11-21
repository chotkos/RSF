var generateController = function () {

    $.ajax({
        url: "APIProject/Templates/ExampleController.cs",
        dataType: "text",
        success: function (data) {
            var entityName = $('#model-select').val();
            data = data.replace(/{{EntityName}}/g, entityName);
            $("#controller").val(data);
        }
    });
}