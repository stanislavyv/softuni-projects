namespace _02.LegionSystem
{
    using _02.LegionSystem.Models;
    using _02.LegionSystem.Interfaces;
    using System.Collections.Generic;

    public class BinarySearchTree
    {
        public BinarySearchTree(IEnemy value = null, BinarySearchTree left = null, BinarySearchTree right = null)
        {
            this.Value = value;
            this.LeftChild = left;
            this.RightChild = right;

            if (value != null) { this.Count++; }
            if (left != null) { this.Count++; }
            if (right != null) { this.Count++; }
        }

        public IEnemy Value { get; set; }
        public BinarySearchTree LeftChild { get; set; }
        public BinarySearchTree RightChild { get; set; }
        public int Count { get; private set; }

        public void Insert(IEnemy toInsert)
        {
            var source = this.InsertDFS(toInsert, this);

            if (source == null) { return; }

            // Set root if tree is empty
            if (this.Value == null)
            {
                this.Value = source.Value;
                this.Count++;
                return;
            }

            var newNode = new BinarySearchTree(toInsert);

            if (this.IsLesser(toInsert, source.Value))
            {
                source.LeftChild = newNode;
            }

            if (this.IsGreater(toInsert, source.Value))
            {
                source.RightChild = newNode;
            }
        }
        public IEnemy SearchAttackSpeed(int attackSpeed)
        {
            return this.SearchAttackSpeedDFS(attackSpeed, this);
        }
        public bool Contains(IEnemy enemy)
        {
            return this.ContainsDFS(enemy, this);
        }
        public IEnemy GetFastest()
        {
            var fastestSource = this.GetFastestSource();

            // if count is 0 then the tree is empty and this.Value is null
            // if count is 1 then the tree has only one element the root, which would hold the biggest value
            // if fastesttSource is null, this means that 
            // there are no right children and the root holds the biggest value
            if (this.Count <= 1 || fastestSource == null)
            {
                return this.Value;
            }

            return fastestSource
                .RightChild
                .Value;
        }
        public IEnemy GetSlowest()
        {
            var slowestSource = this.GetSlowestSource();

            // if count is 0 then the tree is empty and this.Value is null
            // if count is 1 then the tree has only one element the root, which would hold the smallest value
            // if slowestSource is null, this means that 
            // there are no left children and the root holds the smallest value
            if (this.Count <= 1 || slowestSource == null)
            {
                return this.Value;
            }

            return slowestSource
                .LeftChild
                .Value;
        }
        public IEnemy RemoveFastest()
        {
            IEnemy fastest;

            if (this.Count == 0) { return null; }

            var fastestSource = this.GetFastestSource();

            if (this.Count == 1)
            {
                fastest = this.Value;
                this.Value = null;
                this.Count = 0;
                return fastest;
            }

            // If we remove the root and there are no right children, it 
            // means that the root's left child is the new root
            if (fastestSource == null)
            {
                fastest = this.Value;
                this.Value = this.LeftChild.Value;
                this.Count--;
                return fastest;
            }

            fastest = fastestSource.RightChild.Value;

            this.Count -= (fastestSource.Count - 1);
            fastestSource.RightChild = null;

            return fastest;
        }
        public IEnemy RemoveSlowest()
        {
            IEnemy slowest;

            if (this.Count == 0) { return null; }

            var slowestSource = this.GetSlowestSource();

            if (this.Count == 1)
            {
                slowest = this.Value;
                this.Value = null;
                this.Count = 0;
                return slowest;
            }

            // If we remove the root and there are no left children, it 
            // means that the root's right child is the new root
            if (slowestSource == null)
            {
                slowest = this.Value;
                this.Value = this.RightChild.Value;
                this.Count--;
                return slowest;
            }

            slowest = slowestSource.LeftChild.Value;

            this.Count -= (slowestSource.Count - 1);
            slowestSource.LeftChild = null;

            return slowest;
        }
        public IEnemy[] OrderByHealthDescending()
        {
            var arr = this.ToArray();
            return this.SortByHealth(arr);
        }
        public List<IEnemy> GetFaster(int attackSpeed)
        {
            var list = new List<IEnemy>();
            this.GetAllBySpeedDFS("fastest", attackSpeed, this, list);
            return list;
        }
        public List<IEnemy> GetSlower(int attackSpeed)
        {
            var list = new List<IEnemy>();
            this.GetAllBySpeedDFS("slowest", attackSpeed, this, list);
            return list;
        }

        private bool IsLesser(IEnemy first, IEnemy second)
        {
            return first.CompareTo(second) < 0;
        }
        private bool IsGreater(IEnemy first, IEnemy second)
        {
            return first.CompareTo(second) > 0;
        }
        /// <summary>
        /// Returns the source of element toInsert
        /// </summary>
        /// <param name="toInsert"></param>
        /// <param name="curr"></param>
        /// <param name="prev"></param>
        private BinarySearchTree InsertDFS(IEnemy toInsert, BinarySearchTree curr, BinarySearchTree prev = null)
        {
            if (curr == null)
            {
                return prev;
            }

            if (curr.Value == null && prev == null)
            {
                var node = new BinarySearchTree(toInsert);
                return node;
            }

            curr.Count++;

            if (this.IsLesser(toInsert, curr.Value))
            {
                return this.InsertDFS(toInsert, curr.LeftChild, curr);
            }

            if (this.IsGreater(toInsert, curr.Value))
            {
                return this.InsertDFS(toInsert, curr.RightChild, curr);
            }

            return null;
        }
        private IEnemy SearchAttackSpeedDFS(int attackSpeed, BinarySearchTree currNode)
        {
            var currEnemy = currNode.Value;

            if (currNode != null)
            {
                if (currEnemy.AttackSpeed == attackSpeed)
                {
                    // It didn't let me convert currEnemy back to IEnemy??????????????
                    return currEnemy;
                }

                if (attackSpeed < currEnemy.AttackSpeed)
                {
                    return this.SearchAttackSpeedDFS(attackSpeed, currNode.LeftChild);
                }

                if (attackSpeed > currEnemy.AttackSpeed)
                {
                    return this.SearchAttackSpeedDFS(attackSpeed, currNode.RightChild);
                }
            }

            return null;
        }
        private bool ContainsDFS(IEnemy toSearch, BinarySearchTree curr)
        {
            if (curr == null) { return false; }

            if (toSearch.Equals(curr.Value)) { return true; }

            if (this.IsLesser(toSearch, curr.Value))
            {
                return this.ContainsDFS(toSearch, curr.LeftChild);
            }

            if (this.IsGreater(toSearch, curr.Value))
            {
                return this.ContainsDFS(toSearch, curr.RightChild);
            }

            return false;
        }
        /// <summary>
        /// Returns the source of the slowest/ fastest enemy
        /// </summary>
        /// <param name="curr"></param>
        /// <param name="prev"></param>
        /// <returns></returns>
        private BinarySearchTree GetBySpeedDFS(string type, BinarySearchTree curr, BinarySearchTree prev = null)
        {
            // 0 if the tree is empty (curr would be null)
            // 1 if the tree has only one element (the root)
            // 2 if we reached the source of the last element - either the fastest or the slowest
            if (curr == null || curr.Count <= 2)
            {
                return curr;
            }

            if (type == "slowest")
            {
                return this.GetBySpeedDFS("slowest", curr.LeftChild, curr);
            }

            if (type == "fastest")
            {
                return this.GetBySpeedDFS("fastest", curr.RightChild, curr);
            }

            return null;
        }
        private BinarySearchTree GetFastestSource()
        {
            return this.GetBySpeedDFS("fastest", this);
        }
        private BinarySearchTree GetSlowestSource()
        {
            return this.GetBySpeedDFS("slowest", this);
        }
        private void TraverseInOrder(BinarySearchTree curr, IEnemy[] array, ref int cnt)
        {
            if (curr == null) { return; }

            this.TraverseInOrder(curr.LeftChild, array, ref cnt);
            array[cnt++] = curr.Value;
            this.TraverseInOrder(curr.RightChild, array, ref cnt);
        }
        private IEnemy[] ToArray()
        {
            var arr = new IEnemy[this.Count];
            var cnt = 0;
            this.TraverseInOrder(this, arr, ref cnt);

            return arr;
        }
        private IEnemy[] SortByHealth(IEnemy[] arr)
        {
            return MergeSort.Sort(arr);
        }
        private void GetAllBySpeedDFS(string type, int attackSpeed, BinarySearchTree curr, List<IEnemy> list)
        {
            if (curr == null) { return; }

            this.GetAllBySpeedDFS(type, attackSpeed, curr.LeftChild, list);

            if (type == "slowest" && curr.Value.AttackSpeed < attackSpeed)
            {
                list.Add(curr.Value);
            }

            if (type == "fastest" && curr.Value.AttackSpeed > attackSpeed)
            {
                list.Add(curr.Value);
            }

            this.GetAllBySpeedDFS(type, attackSpeed, curr.RightChild, list);
        }
    }
}
