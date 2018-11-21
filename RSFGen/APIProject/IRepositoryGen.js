var generateIRepository = function () {

    $.ajax({
        url: "APIProject/Templates/ExampleIRepository.cs",
        dataType: "text",
        success: function (data) {
            var entityName = $('#model-select').val();
            data = data.replace(/{{EntityName}}/g, entityName);
            $("#irepository").val(data);
        }
    });
}