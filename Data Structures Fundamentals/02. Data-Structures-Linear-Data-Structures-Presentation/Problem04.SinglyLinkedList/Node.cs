﻿namespace Problem04.SinglyLinkedList
{
    public class Node<T>
    {
        public T Value { get; set; }
        public Node<T> Next { get; set; }

        public Node(T value)
        {
            this.Value = value;
            this.Next = null;
        }
    }
}