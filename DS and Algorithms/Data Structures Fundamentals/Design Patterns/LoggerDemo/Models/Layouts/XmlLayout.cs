namespace LoggerDemo.Models.Layouts
{
    using System.Text;
    using LoggerDemo.Models.Contracts;

    internal class XmlLayout : Layout
    {
        public XmlLayout()
        {
        }

        protected override string GetFormat()
        {
            var sb = new StringBuilder();

            sb.AppendLine("<log>")
                .AppendLine("\t<date>{0}</date>")
                .AppendLine("\t<level>{1}</level>")
                .AppendLine("\t<message>{2}</message>")
            .AppendLine("</log>");

            return sb.ToString().TrimEnd();
        }
    }
}
