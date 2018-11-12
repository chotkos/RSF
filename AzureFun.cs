#r "Newtonsoft.Json"

using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;

public async static Task<IActionResult> ProcessPost(HttpRequest req)
{
    //create element
    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
    dynamic data = JsonConvert.DeserializeObject(requestBody);
    //@Todo: implement
    return (ActionResult)new OkObjectResult("Success");
}
public async static Task<IActionResult> ProcessPut(HttpRequest req)
{
    //update element
    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
    dynamic data = JsonConvert.DeserializeObject(requestBody);
    //@Todo: implement
    return (ActionResult)new OkObjectResult("Success");
}
public async static Task<IActionResult> ProcessGet(HttpRequest req)
{
    if(req.Query["id"] != String.Empty ){
        //return element by id
        //@Todo: implement
        return (ActionResult)new OkObjectResult("Success");
    } else{
        //return element by searchCriteria
        string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
        dynamic data = JsonConvert.DeserializeObject(requestBody);
        //@Todo: implement
        return (ActionResult)new OkObjectResult("Success");
    }
}
public async static Task<IActionResult> ProcessDelete(HttpRequest req)
{
    if(req.Query["id"] != String.Empty){
        //delete element by id
        //@Todo: implement
        return (ActionResult)new OkObjectResult("Success");
    } else {
        //Throw an error
        return new BadRequestObjectResult("ID has not been added to query.");
    }
}





public static async Task<IActionResult> Run(HttpRequest req, ILogger log)
{
    log.LogInformation("C# HTTP trigger function processed a request.");

    //string name = req.Query["name"];
    //string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
    //dynamic data = JsonConvert.DeserializeObject(requestBody);
    
    
    switch(req.Method){
        case "POST":
            return await ProcessPost(req);     
        case "PUT":
            return await ProcessPut(req);
        case "GET":
            return await ProcessGet(req);
        case "DELETE":
            return await ProcessDelete(req);
        default:
            return new BadRequestObjectResult("ID has not been added to query.");
        break;
    }
     
 
}
