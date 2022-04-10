namespace Composite.Models
{
    using System;
    using System.Collections.Generic;

    using Composite.Contracts;

    internal class CompositeGift : BaseGift, IGiftOperations
    {
        private List<BaseGift> gifts;
        
        public CompositeGift(string name, int price)
            : base(name, price)
        {
            this.gifts = new List<BaseGift>();
        }

        public void Add(BaseGift gift)
        {
            this.gifts.Add(gift);
        }

        public void Remove(BaseGift gift)
        {
            this.gifts.Remove(gift);
        }

        public override decimal CalculateTotalPrice()
        {
            var total = 0M;

            Console.WriteLine($"{this.name} contains the following products with prices:");

            foreach (var gift in this.gifts)
            {
                total += gift.CalculateTotalPrice();
            }

            return total;
        }
    }
}
