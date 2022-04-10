namespace LoggerDemo.Models.Files
{
    using System.IO;
    using System.Linq;

    using LoggerDemo.Models.Contracts;

    internal class LogFile : IFile
    {
        private static readonly string directoryPath = @"../../../";
        private static readonly string filePath = directoryPath + "log.txt";

        public LogFile()
        {
            var fs = new FileStream(filePath, FileMode.Create);
            fs.Close();
        }

        public ulong Size => this.GetSize();

        private ulong GetSize()
        {
            using (var reader = new StreamReader(filePath))
            {
                return (ulong)reader.ReadToEnd()
                       .ToCharArray()
                       .Where(ch => char.IsLetter(ch))
                       .Sum(ch => ch);
            }
        }

        public void Write(string content)
        {
            using var writer = new StreamWriter(filePath, true);
            writer.WriteLine(content);
        }
    }
}
