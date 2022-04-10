namespace LoggerDemo.Models.Contracts
{
    internal interface IFile
    {
        public ulong Size { get; }
        void Write(string contents);
    }
}
