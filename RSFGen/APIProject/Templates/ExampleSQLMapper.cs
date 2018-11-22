using RestApp.Entities.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApp.Mappers
{
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
            return provider;
        }
         

        public KeyValuePair<string, DynamicParameters> GetCreateFieldsCmd({{EntityName}}DTO v)//@TODO: finish this on every sql and every mapper
        {
            var sqlProvider = GetSQLProvider(v);
            return sqlProvider.GetCreateFieldsCmd(); 
        }

        public KeyValuePair<string, DynamicParameters> GetUpdateFieldsCmd({{EntityName}}DTO v)
        {
            var sqlProvider = GetSQLProvider(v);
            return sqlProvider.GetUpdateFieldsCmd();
        }

        public KeyValuePair<string, DynamicParameters> GetSearchCriteriaFieldsCmd({{EntityName}}DTO v)
        {
            var sqlProvider = GetSQLProvider(v);
            return sqlProvider.GetSearchCriteriaCmd();
        } 
    }
}
