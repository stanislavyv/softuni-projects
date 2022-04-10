namespace LoggerDemo.Models
{
    using System.Collections.Generic;
    using System.Text;

    using LoggerDemo.Models.Contracts;

    internal class Logger
    {
        private ICollection<IAppender> appenders;

        public Logger(params IAppender[] appenders)
        {
            this.appenders = appenders;
        }

        public void Log(IError error)
        {
            foreach (var appender in this.appenders)
            {
                appender.Append(error);
            } 
        }

        public override string ToString()
        {
            var sb = new StringBuilder();

            sb.AppendLine("Logger info:");

            foreach (var appender in this.appenders)
            {
                sb.AppendLine(appender.ToString());
            }

            return sb.ToString().TrimEnd();
        }
    }
}
