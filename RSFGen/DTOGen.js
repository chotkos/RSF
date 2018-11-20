var generateDTO = function(){

  $.ajax({
    url : "ExampleDTO.cs",
    dataType: "text",
    success : function (data) {
      var dto = data;
      var entityName = $('#model-select').val();
      data = data.replace(/{{EntityName}}/g, entityName);
      console.log(data);
  }});
  
};
