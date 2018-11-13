var runGenerator = function(fileUrl){
	$.getJSON("data.json", function (json) {
            console.log("JSON Data received ", json);
            let paths = {};

            Object.keys(json.definitions)
                .forEach(e => {
                    console.log(`key=${e}  value=${json.definitions[e]}`);
		     /*
                    json.paths["/" + e + "/{id}"] = getGetByIdObject(e);
                    json.paths["/" + e + "/create"] = getCreateObject(e);
                    json.paths["/" + e + "/update"] = getUpdateObject(e);
                    json.paths["/" + e + "/delete/{id}" ] = getRemoveObject(e);
                    json.paths["/" + e + "/search"] = getSearchObject(e);
			*/
		    var x = {};
		    //experiment
                    x["get"] = getGetByIdObject(e);
                    x["post"] = getCreateObject(e);
                    x["put"] = getUpdateObject(e);
                    x["delete"] = getRemoveObject(e);
                    //json.paths["/" + e + "/search"] = getSearchObject(e);
		    
		    json.paths["/"+e] = x;
                });

            $('#path-result').val(JSON.stringify(json.paths));
            //json.paths = paths;
            $('#json-result').val(JSON.stringify(json));
            console.log("Your new paths", json.paths);
            console.log("Your new JSON", json);
		document.data = json;
	

        });

};




document.onreadystatechange = () => {

    if (document.readyState === 'complete') {
        // document ready        

      $("#path-result").click(e => {
          e.currentTarget.select();
          document.execCommand('copy');
      });  

      $("#sql-result").click(e => {
          e.currentTarget.select();
          document.execCommand('copy');
      });


      $("#json-result").click(e => {
          e.currentTarget.select();
          document.execCommand('copy');
      });
	    
      $("#sql-create").click(e=>{
          generateSQLTables(document.data.definitions);
      });

      $("#download").click(e => {
          var filename = "withPaths.json";
          var type = "text/plain";
          var data = $("#json-result").val();
          var file = new Blob([data], {type: type});
          if (window.navigator.msSaveOrOpenBlob) // IE10+
              window.navigator.msSaveOrOpenBlob(file, filename);
          else { // Others
              var a = document.createElement("a"),
                  url = URL.createObjectURL(file);
              a.href = url;
              a.download = filename;
              document.body.appendChild(a);
              a.click();
              setTimeout(function() {
                  document.body.removeChild(a);
                  window.URL.revokeObjectURL(url);
              }, 0);
          }
      });    
      
      $("#run").click(e => {
      	runGenerator($("#dataFileUrl").val());
      });
    
    }

};
