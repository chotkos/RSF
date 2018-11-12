function getGetByIdObject(entityName) {
    return {
        "get": {
            "summary": entityName + " - Get by ID",
            "description": "Returns a single element",
            "operationId": "get" + entityName + "ById",
            "produces": [
                //"application/xml",
                "application/json"
            ],
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "description": "ID of " + entityName + " to return",
                    "required": true,
                    "type": "integer",
                    "format": "int64"
                }
            ],
            "responses": {
                "200": {
                    "description": "Successfully returned requested element by Id",
                    "schema": {
                        "$ref": "#/definitions/" + entityName
                    }
                },
                "404": {
                    "description": "Element not found"
                },
                "500":{
                    "description": "Internal server error"
                }
            }, 
            "tags": [entityName],
            "basePath": "/v2",
            "host": "azureapipoc.azure-api.net"
        }
    };
}

function getRemoveObject(entityName) {
    return {
        "delete": {
            "summary": entityName + " - Remove by ID",
            "description": "Removes a single element",
            "operationId": "remove" + entityName + "ById",
            "produces": [
                //"application/xml",
                "application/json"
            ],
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "description": "ID of " + entityName + " to return",
                    "required": true,
                    "type": "integer",
                    "format": "int64"
                }
            ],
            "responses": {
                "200": {
                    "description": "Successfully removed requested element"
                },
                "404": {
                    "description": "Element not found"
                },
                "500": {
                    "description": "Internal server error"
                }
            }, 
            "tags": [entityName],
            "basePath": "/v2",
            "host": "azureapipoc.azure-api.net"
        }
    };
}

function getCreateObject(entityName) {
    return {
        "post": {
            "summary": entityName + " - Create",
            "description": "Creates a single element",
            "operationId": "create" + entityName,
            "produces": [
                //"application/xml",
                "application/json"
            ],
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "description": "DTO of new " + entityName,
                    "required": true,
                    "schema": {
                        "$ref": "#/definitions/" + entityName
                    }
                }
            ],
            "responses": {
                "200": {"description": "Successfully created requested element"},
                "500": {
                    "description": "Internal server error"
                }
            }, 
            "tags": [entityName],
            "basePath": "/v2",
            "host": "azureapipoc.azure-api.net"
        }
    };
}

function getUpdateObject(entityName) {
    return {
        "put": {
            "summary": entityName + " - Update",
            "description": "Updates a single element",
            "operationId": "update" + entityName,
            "produces": [
                //"application/xml",
                "application/json"
            ],
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "description": "DTO of updated " + entityName,
                    "required": true,
                    "schema": {
                        "$ref": "#/definitions/" + entityName
                    }
                }
            ],
            "responses": {
                "200": {"description": "Successfully updated requested element"},
                "404": {
                    "description": "Element not found"
                },
                "500": {
                    "description": "Internal server error"
                }
            },
            "tags": [entityName],            
            "basePath": "/v2",
            "host": "azureapipoc.azure-api.net"
        }
    };
}


function getSearchObject(entityName) {
    return {
        "get": {
            "summary": entityName + " - Search by search criteria",
            "description": "Searches for elements",
            "operationId": "search" + entityName,
            "produces": [
                //"application/xml",
                "application/json"
            ],
            "responses": {
                "200": {
                    "description": "Successfully searched requested element"
                },
                "404": {
                    "description": "Element not found"
                },
                "500": {
                    "description": "Internal server error"
                }
            },
            "tags": [entityName],            
            "basePath": "/v2",
            "host": "azureapipoc.azure-api.net"
        }
    };
}
