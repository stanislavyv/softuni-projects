namespace _01.Inventory
{
    using _01.Inventory.Interfaces;
    using _01.Inventory.Models;
    using System;
    using System.Collections;
    using System.Collections.Generic;

    public class Inventory : IHolder
    {
        private List<IWeapon> inventory;

        public Inventory()
        {
            this.inventory = new List<IWeapon>();
        }

        public int Capacity => this.inventory.Count;

        public void Add(IWeapon weapon)
        {
            this.inventory.Add(weapon);
        }
        public void Clear()
        {
            this.inventory.Clear();
        }
        public bool Contains(IWeapon weapon)
        {
            return this.inventory.Contains(weapon);
        }
        public void EmptyArsenal(Category category)
        {
            this.inventory.RemoveAll(w => w.Category == category);
        }
        public bool Fire(IWeapon weapon, int ammunition)
        {
            IWeapon searched = null;
            for (int i = 0; i < this.Capacity; i++)
            {
                var curr = this.inventory[i];
                if (curr.Equals(weapon))
                {
                    searched = curr;
                    break;
                }
            }

            if (searched != null)
            {
                if (searched.Ammunition >= ammunition)
                {
                    searched.Ammunition -= ammunition;
                    return true;
                }
                return false;
            }

            throw new InvalidOperationException("Weapon does not exist in inventory!");
        }
        public IWeapon GetById(int id)
        {
            for (int i = 0; i < this.Capacity; i++)
            {
                var curr = this.inventory[i];
                if (curr.Id == id)
                {
                    return curr;
                }
            }

            return null;
        }
        public IEnumerator GetEnumerator()
            => this.inventory.GetEnumerator();
        public int Refill(IWeapon weapon, int ammunition)
        {
            IWeapon searched = null;
            for (int i = 0; i < this.Capacity; i++)
            {
                var curr = this.inventory[i];
                if (curr.Equals(weapon))
                {
                    searched = curr;
                    break;
                }
            }

            if (searched != null)
            {
                if (searched.Ammunition + ammunition <= searched.MaxCapacity)
                {
                    searched.Ammunition += ammunition;
                }
                else
                {
                    searched.Ammunition = searched.MaxCapacity;
                }

                return searched.Ammunition;
            }

            throw new InvalidOperationException("Weapon does not exist in inventory!");
        }
        public IWeapon RemoveById(int id)
        {
            for (int i = 0; i < this.Capacity; i++)
            {
                var curr = this.inventory[i];
                if (curr.Id == id)
                {
                    this.inventory.RemoveAt(i);
                    return curr;
                }
            }

            throw new InvalidOperationException("Weapon does not exist in inventory!");
        }
        public int RemoveHeavy()
        {
            return this.inventory.RemoveAll(w => w.Category == Category.Heavy);
        }
        public List<IWeapon> RetrieveAll()
        {
            return new List<IWeapon>(inventory);
        }
        public List<IWeapon> RetriveInRange(Category lower, Category upper)
        {
            return this.inventory.FindAll(w => lower <= w.Category && w.Category <= upper);
        }
        public void Swap(IWeapon firstWeapon, IWeapon secondWeapon)
        {
            var firstIndex = this.inventory.IndexOf(firstWeapon);
            var secondIndex = this.inventory.IndexOf(secondWeapon);

            this.inventory[firstIndex] = secondWeapon;
            this.inventory[secondIndex] = firstWeapon;
        }
    }
}
