using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using RestApp.Repositories.Interfaces;
using RestApp.Entities.Dto;

namespace RestApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class {{EntityName}}Controller : ControllerBase
    {
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly I{{EntityName}}Repository repository;
        private readonly NLog.ILogger logger;

        public {{EntityName}}Controller(I{{EntityName}}Repository repository, NLog.ILogger logger)
        {
            this.repository = repository;
            this.logger = logger;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllAsync()
        {
            var items = await repository.GetAllAsync();
            if (items.Count() == 0)
                return base.NoContent();
            return Ok(items);
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] int? id, [FromBody] {{EntityName}}DTO filter)
        {
            if (id.HasValue)
            {
                var item = await repository.GetById(id.Value);
                if (item != null)
                {
                    return Ok(item);
                }
                else return NotFound();
            }
            else //if (filter.HasValue)
            {
                var results = await repository.Search(filter);
                if (results.Any())
                {
                    return Ok(results);
                }
                else return NotFound();
            }

        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] {{EntityName}}DTO value)
        {
            var response = await repository.Create(value);
            return Ok();

        }


        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody] {{EntityName}}DTO value)
        {
            var response = await repository.Update(value);
            return Ok();
        }


        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery] int id)
        {
            var response = await repository.Delete(id);
            return Ok();
        }
    }
}
