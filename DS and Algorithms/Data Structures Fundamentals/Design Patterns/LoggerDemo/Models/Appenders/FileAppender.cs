namespace LoggerDemo.Models.Appenders
{
    using System;

    using LoggerDemo.Models.Contracts;
    using LoggerDemo.Models.Files;

    internal class FileAppender : Appender
    {
        private IFile file;

        public FileAppender(ILayout layout)
            :base(layout)
        {
            this.file = new LogFile();
        }

        public override void Append(IError error)
        {
            if (error.Level >= this.MinLevel)
            {
                var toAppend = String.Format(this.Layout.Format, error.DateTime, error.Level, error.Message);

                this.file.Write(toAppend);

                this.MessagesAppended++;
            }
        }

        public override string ToString()
        {
            return base.ToString() + $", File Size: {this.file.Size}";
        }
    }
}
