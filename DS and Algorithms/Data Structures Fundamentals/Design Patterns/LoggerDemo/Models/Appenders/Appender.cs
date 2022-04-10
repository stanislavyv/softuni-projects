namespace LoggerDemo.Models.Appenders
{
    using LoggerDemo.Enumerations;
    using LoggerDemo.Models.Contracts;

    internal abstract class Appender : IAppender
    {
        private Appender()
        {
            this.MinLevel = ReportLevel.INFO;
        }

        protected Appender(ILayout layout)
            : this()
        {
            this.Layout = layout;
        }

        public ReportLevel MinLevel { get; set; }
        public ILayout Layout { get; private set; }
        public uint MessagesAppended { get; protected set; }

        public abstract void Append(IError error);

        public override string ToString()
        {
            return $"Appender type: {this.GetType().Name}, Layout type: {this.Layout.GetType().Name}, Report level: {this.MinLevel}, Messages appended: {this.MessagesAppended}";
        }
    }
}
