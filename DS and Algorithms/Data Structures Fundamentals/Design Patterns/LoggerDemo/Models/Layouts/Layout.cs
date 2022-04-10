using LoggerDemo.Models.Contracts;

namespace LoggerDemo.Models.Layouts
{
    internal abstract class Layout : ILayout
    {
        protected Layout()
        {

        }

        public string Format => this.GetFormat();

        protected abstract string GetFormat();
    }
}
