using Microsoft.AspNetCore.Http; 
using RestApp.Entities.Dto; 
using RestApp.Repositories.Interfaces;
using System; 
using Microsoft.Extensions.DependencyInjection;

namespace RestApp.Repositories
{
    public class {{EntityName}}Repository : BaseRepository<{{EntityName}}DTO>, I{{EntityName}}Repository
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public {{EntityName}}Repository(IServiceProvider serviceProvider) 
            :base(serviceProvider)
        {
            this.EntityName = "{{EntityName}}";
            httpContextAccessor = serviceProvider.GetService<IHttpContextAccessor>(); 
        }

    }
}
