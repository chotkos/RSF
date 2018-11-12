
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        // document ready
        $.getJSON("data.json", function (json) {
            console.log("JSON Data received ", json);
            let paths = {};

            Object.keys(json.definitions)
                .forEach(e => {
                    console.log(`key=${e}  value=${json.definitions[e]}`);

                    paths["/" + e + "/{id}"] = getGetByIdObject(e);
                    paths["/" + e + "/create"] = getCreateObject(e);
                    paths["/" + e + "/update"] = getUpdateObject(e);
                    paths["/" + e + "/remove/{id}"] = getRemoveObject(e);
                    paths["/" + e + "/"] = getSearchObject(e);

                });

            $('#path-result').val(JSON.stringify(paths));
            json.paths = paths;
            $('#json-result').val(JSON.stringify(json));
            console.log("Your new paths", paths);
            console.log("Your new JSON", json);


        });
    }

    $("#path-result").click(e => {
        e.currentTarget.select();
        document.execCommand('copy');
    });

    $("#json-result").click(e => {
        e.currentTarget.select();
        document.execCommand('copy');
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

};