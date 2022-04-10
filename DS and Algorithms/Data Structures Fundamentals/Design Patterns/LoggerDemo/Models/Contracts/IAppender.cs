namespace LoggerDemo.Models.Contracts
{
    using LoggerDemo.Enumerations;

    internal interface IAppender
    {
        public ILayout Layout { get; }
        public ReportLevel MinLevel { get; set; }
        public uint MessagesAppended { get; }

        void Append(IError error);
    }
}
