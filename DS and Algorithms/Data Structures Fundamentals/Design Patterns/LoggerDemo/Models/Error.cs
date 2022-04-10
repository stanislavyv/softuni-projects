namespace LoggerDemo.Models
{
    using System;

    using LoggerDemo.Enumerations;
    using LoggerDemo.Models.Contracts;

    internal class Error : IError
    {
        public Error(ReportLevel level, DateTime dateTime, string message)
        {
            this.Level = level;
            this.DateTime = dateTime;
            this.Message = message;
        }

        public ReportLevel Level { get; private set; }

        public DateTime DateTime { get; private set; }

        public string Message { get; private set; }
    }
}
