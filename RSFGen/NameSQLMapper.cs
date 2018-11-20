using RestApp.Entities.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApp.Mappers
{
    // @TODO: If you are writing this second or third time, you surely need a generator based on swagger right now.
    public class {{EntityName}}SqlMapper : ISqlMapper<{{EntityName}}DTO>
    {
        public string ClassName = nameof({{EntityName}}DTO);
        public string EntityName { get; set; }

        public {{EntityName}}SqlMapper()
        {
            this.EntityName = ClassName.Substring(0, ClassName.Length - 3);
        }

        /// <summary>
        /// This one needs to be updated if you are changing your model
        /// </summary>
        /// <param name="v"></param>
        /// <returns></returns>
        SQLProvider<{{EntityName}}DTO> GetSQLProvider({{EntityName}}DTO v)
        {
            var provider = new SQLProvider<{{EntityName}}DTO>(v, v.Id, EntityName);
            {{Columns}}
            if(v.Active.HasValue) provider.AddColumn("Active", (v.Active.Value ? 1:0).ToString(), string.Empty);
            return provider;
        }

        public string GetCreateFieldsSql({{EntityName}}DTO v)
        {
            var sqlProvider = GetSQLProvider(v) ;
            return sqlProvider.GetCreateFieldsSql();
        }
        public string GetUpdateFieldsSql({{EntityName}}DTO v)
        {
            var sqlProvider = GetSQLProvider(v);
            return sqlProvider.GetUpdateFieldsSql();
        }
        public string GetSearchCriteriaFieldsSql({{EntityName}}DTO v)
        {
            var sqlProvider = GetSQLProvider(v);
            return sqlProvider.GetSearchCriteriaSql();
        }
    }
}
