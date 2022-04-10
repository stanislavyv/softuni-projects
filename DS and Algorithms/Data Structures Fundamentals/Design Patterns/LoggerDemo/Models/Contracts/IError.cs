namespace LoggerDemo.Models.Contracts
{
    using System;

    using LoggerDemo.Enumerations;

    internal interface IError
    {
        public ReportLevel Level { get; }
        public DateTime DateTime { get; }
        public string Message { get; }
    }
}
