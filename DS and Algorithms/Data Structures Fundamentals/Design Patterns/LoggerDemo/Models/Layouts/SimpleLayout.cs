namespace LoggerDemo.Models.Layouts
{
    using LoggerDemo.Models.Contracts;

    internal class SimpleLayout : Layout
    {
        public SimpleLayout()
        {
        }

        // dateTime - level - message
        protected override string GetFormat()
        {
            return "{0} - {1} - {2}";
        }
    }
}
