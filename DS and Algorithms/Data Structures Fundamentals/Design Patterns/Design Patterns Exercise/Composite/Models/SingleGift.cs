namespace Composite.Models
{
    using System;

    internal class SingleGift : BaseGift
    {
        public SingleGift(string name, decimal price) 
            : base(name, price)
        {
        }

        public override decimal CalculateTotalPrice()
        {
            Console.WriteLine($"{this.name} with price {price}");

            return this.price;
        }
    }
}
