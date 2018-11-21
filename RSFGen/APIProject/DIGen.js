var generateDI = function () {

    $.ajax({
        url: "APIProject/Templates/ExampleDI.cs",
        dataType: "text",
        success: function (data) {
            var entityName = $('#model-select').val();
            data = data.replace(/{{EntityName}}/g, entityName);
            $("#di").val(data);
        }
    });
}