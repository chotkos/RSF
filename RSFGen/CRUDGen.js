var runGenerator = function (fileUrl) {
    $.getJSON(fileUrl, function (json) {
        console.log("JSON Data received ", json);
        let paths = {};

        Object.keys(json.definitions)
            .forEach(e => {
                console.log(`key=${e}  value=${json.definitions[e]}`);

                if (typeof json.paths["/" + e] === 'undefined') {
                    // the variable is defined    
                    json.paths["/" + e] = {};
                }

                json.paths["/" + e] = $.extend(json.paths["/" + e], getGetByIdObject(e));
                json.paths["/" + e] = $.extend(json.paths["/" + e], getCreateObject(e));
                json.paths["/" + e] = $.extend(json.paths["/" + e], getUpdateObject(e));
                json.paths["/" + e] = $.extend(json.paths["/" + e], getRemoveObject(e));

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

        $("#sql-create").click(e => {
            generateSQLTables(document.data.definitions);
        });

        $("#dto").click(e => {
            e.currentTarget.select();
            document.execCommand('copy');
        });
        $("#controller").click(e => {
            e.currentTarget.select();
            document.execCommand('copy');
        });
        $("#mapper").click(e => {
            e.currentTarget.select();
            document.execCommand('copy');
        });
        $("#repository").click(e => {
            e.currentTarget.select();
            document.execCommand('copy');
        });
        $("#irepository").click(e => {
            e.currentTarget.select();
            document.execCommand('copy');
        });


        var getAsFile = function(filename, data){
            var type = "text/plain";
            var file = new Blob([data], {
                type: type
            });
            if (window.navigator.msSaveOrOpenBlob) // IE10+
                window.navigator.msSaveOrOpenBlob(file, filename);
            else { // Others
                var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                setTimeout(function () {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 0);
            }
        };

        $("#download").click(e => {
            getAsFile("withPaths.json",$("#json-result").val());
        });

        $("#dto-download").click(e => {
            var entity = $('#model-select').val();
            getAsFile(entity+"DTO.cs",$("#dto").val());
        });
        $("#irepository-download").click(e => {
            var entity = $('#model-select').val();
            getAsFile("I"+entity+"Repository.cs",$("#irepository").val());
        });
        $("#repository-download").click(e => {
            var entity = $('#model-select').val();
            getAsFile(entity+"Repository.cs",$("#repository").val());
        });        
        $("#controller-download").click(e => {
            var entity = $('#model-select').val();
            getAsFile(entity+"Controller.cs",$("#controller").val());
        });
        $("#mapper-download").click(e => {
            var entity = $('#model-select').val();
            getAsFile(entity+"SQLMapper.cs",$("#mapper").val());
        });

         


        $("#run").click(e => {
            runGenerator($("#dataFileUrl").val());
        });
        $("#run-model").click(e => {
            generateDTO();
            generateMap();
            generateController();
            generateRepository();
            generateIRepository();
        });
    }

};