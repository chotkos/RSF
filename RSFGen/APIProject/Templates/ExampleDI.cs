
            //{{EntityName}}
            //Repositories  
            services.AddScoped<I{{EntityName}}Repository, {{EntityName}}Repository>();
            //Mappers 
            services.AddScoped(typeof(ISqlMapper<{{EntityName}}DTO>), typeof({{EntityName}}SqlMapper));