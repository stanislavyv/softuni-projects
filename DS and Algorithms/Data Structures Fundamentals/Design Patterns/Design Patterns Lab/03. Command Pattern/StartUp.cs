namespace CommandPattern
{
    using System;

    using CommandPattern.Core;
    using CommandPattern.Models;
    using CommandPattern.Enumerations;
    using CommandPattern.Commands.Models;

    public class StartUp
    {
        static void Main(string[] args)
        {
            var modifier = new PriceModifier();
            var product = new Product("Phone", 500);

            var engine = new Engine();

            engine.Execute(modifier, new ProductCommand(product, PriceAction.Increase, 50));

            engine.Execute(modifier, new ProductCommand(product, PriceAction.Decrease, 25));

            Console.WriteLine(product);
        }
    }
}
