using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApp.Entities.Dto
{

    // If you are changing anything here remember to update AirlineSqlMapper.GetSQLProvider
    public class {{EntityName}}DTO
    {
        public int? Id { get; set; }
        {{Properties}}
    }
}
