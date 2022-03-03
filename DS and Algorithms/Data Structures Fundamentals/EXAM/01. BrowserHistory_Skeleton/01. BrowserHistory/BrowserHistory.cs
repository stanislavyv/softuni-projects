namespace _01._BrowserHistory
{
    using System;
    using System.Collections.Generic;
    using _01._BrowserHistory.Interfaces;

    public class BrowserHistory : IHistory
    {
        private DoublyLinkedList<ILink> list;

        public BrowserHistory()
        {
            this.list = new DoublyLinkedList<ILink>();
        }

        public int Size => this.list.Count;

        // O(n)
        public void Clear()
        {
            this.list.Clear();
        }
        // O(n)
        public bool Contains(ILink link)
        {
            return this.list.Contains(link);
        }
        // O(1)
        public ILink DeleteFirst()
        {
            return this.list.RemoveLast();
        }
        // O(1)
        public ILink DeleteLast()
        {
            return this.list.RemoveFirst();
        }
        // O(n)
        public ILink GetByUrl(string url)
        {
            return this.list.FirstOrDefault(el => el.Url == url);
        }
        // O(1)
        public ILink LastVisited()
        {
            return this.list.GetFirst();
        }
        // O(1)
        public void Open(ILink link)
        {
            this.list.AddFirst(link);
        }
        public int RemoveLinks(string url)
        {
            return this.list.RemoveWhere(el => el.Url.ToLower().Contains(url.ToLower()));
        }
        public ILink[] ToArray()
        {
            return this.list.ToArray();
        }
        public List<ILink> ToList()
        {
            return this.list.ToList();
        }
        public string ViewHistory()
        {
            return this.list.ToString();
        }
    }
}
