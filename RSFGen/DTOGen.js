var generateDTO = function(){

  $.ajax({
    url : "ExampleDTO.cs",
    dataType: "text",
    success : function (data) {
      console.log("ExampleDTO:",data);
  }});
  
};
