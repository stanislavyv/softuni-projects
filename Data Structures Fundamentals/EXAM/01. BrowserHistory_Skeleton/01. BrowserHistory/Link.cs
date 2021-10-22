namespace _01._BrowserHistory
{
    using _01._BrowserHistory.Interfaces;

    public class Link : ILink
    {
        public Link(string url, int loadingTime)
        {
            this.Url = url;
            this.LoadingTime = loadingTime;
        }

        public string Url { get; set; }
        public int LoadingTime { get; set; }

        public override bool Equals(object obj)
        {
            if (obj is ILink)
            {
                var other = (ILink)obj;

                if (other.Url == this.Url &&
                    other.LoadingTime == this.LoadingTime)
                {
                    return true;
                }
            }

            return false;
        }

        public int CompareTo(ILink other)
        {
            throw new System.NotImplementedException();
        }

        public override string ToString()
        {
            return $"-- {this.Url} {this.LoadingTime}s";
        }
    }
}
