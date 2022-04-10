namespace LoggerDemo.Models.Appenders
{
    using System;

    using LoggerDemo.Enumerations;
    using LoggerDemo.Models.Contracts;

    internal class ConsoleAppender : Appender
    {
        public ConsoleAppender(ILayout layout)
            : base(layout)
        {
        }

        public override void Append(IError error)
        {
            if (error.Level >= MinLevel)
            {
                Console.WriteLine(String.Format(this.Layout.Format, error.DateTime, error.Level, error.Message));

                this.MessagesAppended++;
            }
        }
    }
}
