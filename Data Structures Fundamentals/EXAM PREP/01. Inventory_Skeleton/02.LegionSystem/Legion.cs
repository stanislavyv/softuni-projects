namespace _02.LegionSystem
{
    using System;
    using System.Collections.Generic;
    using _02.LegionSystem.Interfaces;

    public class Legion : IArmy
    {
        private BinarySearchTree legion;

        public Legion()
        {
            this.legion = new BinarySearchTree();
        }

        public int Size => this.legion.Count;

        public bool Contains(IEnemy enemy)
        {
            return this.legion.Contains(enemy);
        }
        public void Create(IEnemy enemy)
        {
            this.legion.Insert(enemy);
        }
        public IEnemy GetByAttackSpeed(int speed)
        {
            return this.legion.SearchAttackSpeed(speed);
        }
        public List<IEnemy> GetFaster(int speed)
        {
            return this.legion.GetFaster(speed);
        }
        public IEnemy GetFastest()
        {
            this.EnsureNotEmpty();
            return this.legion.GetFastest();
        }
        public IEnemy[] GetOrderedByHealth()
        {
            return this.legion.OrderByHealthDescending();
        }
        public List<IEnemy> GetSlower(int speed)
        {
            return this.legion.GetSlower(speed);
        }
        public IEnemy GetSlowest()
        {
            this.EnsureNotEmpty();
            return this.legion.GetSlowest();
        }
        public void ShootFastest()
        {
            this.EnsureNotEmpty();
            this.legion.RemoveFastest();
        }
        public void ShootSlowest()
        {
            this.EnsureNotEmpty();
            this.legion.RemoveSlowest();
        }

        private void EnsureNotEmpty()
        {
            if (this.Size == 0)
            {
                throw new InvalidOperationException("Legion has no enemies!");
            }
        }
    }
}
