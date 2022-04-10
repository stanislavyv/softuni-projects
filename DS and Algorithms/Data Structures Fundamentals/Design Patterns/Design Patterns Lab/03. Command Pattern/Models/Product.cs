namespace CommandPattern.Models
{
    using System;

    internal class Product
    { // Receiver class
        public string Name { get; set; }
        public int Price { get; set; }

        public Product(string name, int price)
        {
            this.Name = name;
            this.Price = price;
        }

        public void IncreasePrice(int amount)
        {
            Price += amount;
            Console.WriteLine($"The price for the {this.Name} has been increased by {amount}$.");
        }
        public void DecreasePirce(int amount)
        {
            if (amount < this.Price)
            {
                Price -= amount;
                Console.WriteLine($"The price for the {this.Name} has been decreased by {amount}$.");
            }
        }

        public override string ToString()
        {
            return $"Current price for the {this.Name} product is {this.Price}$.";
        }
    }
}
