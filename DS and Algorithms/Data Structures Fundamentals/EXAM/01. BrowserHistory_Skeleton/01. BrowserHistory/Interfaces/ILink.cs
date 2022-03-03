using System;

namespace _01._BrowserHistory.Interfaces
{
    public interface ILink : IComparable<ILink>
    {
        string Url { get; set; }

        int LoadingTime { get; set; }
    }
}
