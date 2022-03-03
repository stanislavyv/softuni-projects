namespace _02.DOM
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using _02.DOM.Interfaces;
    using _02.DOM.Models;

    public class DocumentObjectModel : IDocument
    {
        public DocumentObjectModel(IHtmlElement root)
        {
            this.Root = root;
        }
        public DocumentObjectModel()
        {
            var head = new HtmlElement(ElementType.Head);
            var body = new HtmlElement(ElementType.Body);
            var html = new HtmlElement(ElementType.Html, head, body);
            var document = new HtmlElement(ElementType.Document, html);

            this.Root = document;
        }

        public IHtmlElement Root { get; private set; }

        public IHtmlElement GetElementByType(ElementType type)
        {
            return this.FindBFS(el => el.Type == type);
        }
        public List<IHtmlElement> GetElementsByType(ElementType type)
        {
            return this.FindManyDFS(el => el.Type == type);
        }
        public bool Contains(IHtmlElement htmlElement)
        {
            var toFind = this.FindDFS(el => el.Equals(htmlElement));

            return toFind != null ?
                true : false;
        }
        public void InsertFirst(IHtmlElement parent, IHtmlElement child)
        {
            var parentEl = this.FindDFS(el => el.Equals(parent));
            this.EnsureExists(parentEl);

            parentEl.InsertFirst(child);
        }
        public void InsertLast(IHtmlElement parent, IHtmlElement child)
        {
            var parentEl = this.FindDFS(el => el.Equals(parent));
            this.EnsureExists(parentEl);

            parentEl.InsertLast(child);
        }
        public void Remove(IHtmlElement htmlElement)
        {
            if (this.Root.Equals(htmlElement))
            {
                this.Root = null;
                return;
            }

            Predicate<IHtmlElement> predicate = el => el.Equals(htmlElement);
            var result = this.FindChildWithIndexBFS(predicate);

            if (result != null)
            {
                var index = (int)result[1];
                var parent = htmlElement.Parent; // (IHtmlElement)result[0].Parent;

                htmlElement.Parent = null;
                parent.Children.RemoveAt(index);
            }
        }
        // Not the most optimal solution...
        public void RemoveAll(ElementType elementType)
        {
            var resultList = this.FindManyChildrenWithIndexesBFS(el => el.Type == elementType);

            if (resultList != null)
            {
                foreach (var list in resultList)
                {
                    var child = (IHtmlElement)list[0];
                    var index = (int)list[1];
                    var parent = child.Parent;

                    // if element is root
                    if (parent == null)
                    {
                        this.Root = null;
                        return;
                    }

                    child.Parent = null;
                    parent.Children.RemoveAt(index);
                }
            }
        }
        public bool AddAttribute(string attrKey, string attrValue, IHtmlElement htmlElement)
        {
            var element = this.FindDFS(el => el.Equals(htmlElement));
            this.EnsureExists(element);

            if (element.Attributes.ContainsKey(attrKey))
            {
                return false;
            }

            element.Attributes[attrKey] = attrValue;
            return true;
        }
        public bool RemoveAttribute(string attrKey, IHtmlElement htmlElement)
        {
            var element = this.FindDFS(el => el.Equals(htmlElement));
            this.EnsureExists(element);

            if (!element.Attributes.ContainsKey(attrKey))
            {
                return false;
            }

            element.Attributes.Remove(attrKey);
            return true;
        }
        public IHtmlElement GetElementById(string idValue)
        {
            var element = this.FindBFS(el => el.Attributes.ContainsValue(idValue));
            return element;
        }

        public override string ToString()
        {
            var sb = new StringBuilder();
            this.ToStringDFS(sb, this.Root, 0);
            return sb.ToString();
        }

        private IHtmlElement FindBFS(Predicate<IHtmlElement> predicate)
        {
            if (this.Root == null) { return null; }

            var queue = new Queue<IHtmlElement>();
            queue.Enqueue(this.Root);

            while (queue.Count > 0)
            {
                var curr = queue.Dequeue();

                if (predicate(curr))
                {
                    return curr;
                }

                foreach (var child in curr.Children)
                {
                    queue.Enqueue(child);
                }
            }

            return null;
        }
        private IHtmlElement FindDFS(Predicate<IHtmlElement> predicate)
        {
            if (this.Root == null) { return null; }

            var stack = new Stack<IHtmlElement>();
            stack.Push(this.Root);

            while (stack.Count > 0)
            {
                var curr = stack.Pop();

                if (predicate(curr))
                {
                    return curr;
                }

                foreach (var child in curr.Children)
                {
                    stack.Push(child);
                }
            }

            return null;
        }
        /// <summary>
        /// list[0] child, list[1] child's index
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        private List<object> FindChildWithIndexBFS(Predicate<IHtmlElement> predicate)
        {
            if (this.Root == null) { return null; }

            var queue = new Queue<IHtmlElement>();
            queue.Enqueue(this.Root);

            var parent = this.Root;
            var index = 0;

            while (queue.Count > 0)
            {
                var curr = queue.Dequeue();

                if (index == parent.Children.Count)
                {
                    index = 0;
                    parent = curr.Parent;
                }

                if (predicate(curr))
                {
                    var output = new List<object>();
                    output.Add(curr);
                    output.Add(index);

                    return output;
                }

                index++;

                foreach (var child in curr.Children)
                {
                    queue.Enqueue(child);
                }
            }

            return null;
        }
        /// <summary>
        /// mainList<secondaryList<object>> -> secondaryList[0] - child, secondaryList[1] child's index
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        private List<List<object>> FindManyChildrenWithIndexesBFS(Predicate<IHtmlElement> predicate)
        {
            if (this.Root == null) { return null; }

            var queue = new Queue<IHtmlElement>();
            queue.Enqueue(this.Root);

            var output = new List<List<object>>();

            var parent = this.Root;
            var index = 0;

            while (queue.Count > 0)
            {
                var curr = queue.Dequeue();

                if (index == parent.Children.Count)
                {
                    index = 0;
                    parent = curr.Parent;
                }

                if (predicate(curr))
                {
                    var currList = new List<object>();
                    currList.Add(curr);
                    currList.Add(index);

                    output.Add(currList);
                }

                index++;

                foreach (var child in curr.Children)
                {
                    queue.Enqueue(child);
                }
            }

            return output;
        }
        /// <summary>
        /// list[0] - parent, list[1] - child, list[2] index
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        // Useful solution but I couldn't make it work
        //private List<object> FindParentDFS(
        //    Predicate<IHtmlElement> predicate,
        //    IHtmlElement parent,
        //    int index = 0)
        //{
        //    foreach (var child in parent.Children)
        //    {
        //        if (predicate(child))
        //        {
        //            var output = new List<object>(3);
        //            output.Add(parent);
        //            output.Add(child);
        //            output.Add(index);

        //            return output;
        //        }

        //        index++;

        //        return this.FindParentDFS(predicate, child, 0);
        //    }

        //    return null;
        //}
        private List<IHtmlElement> FindManyDFS(Predicate<IHtmlElement> predicate)
        {
            if (this.Root == null) { return null; }

            var result = new List<IHtmlElement>();
            var stack = new Stack<IHtmlElement>();
            stack.Push(this.Root);

            while (stack.Count > 0)
            {
                var curr = stack.Pop();

                if (predicate(curr))
                {
                    result.Add(curr);
                }

                foreach (var child in curr.Children)
                {
                    stack.Push(child);
                }
            }

            return result;
        }
        private void EnsureExists(IHtmlElement element)
        {
            if (element == null) { throw new InvalidOperationException(); }
        }
        private void ToStringDFS(StringBuilder sb, IHtmlElement curr, int spaces)
        {
            sb.AppendLine($"{new string(' ', spaces)}{curr.Type}");

            foreach (var child in curr.Children)
            {
                this.ToStringDFS(sb, child, spaces + 2);
            }
        }
    }
}
