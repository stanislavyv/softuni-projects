namespace Template.Models
{
    using System;

    internal class TwelveGrain : Bread
    {
        public TwelveGrain()
        {
        }

        public override void Bake()
        {
            Console.WriteLine("Baking the 12-Grain bread. (25 minutes)");
        }

        public override void MixIngredients()
        {
            Console.WriteLine("Gathering Ingredients for 12-Grain bread.");
        }
    }
}
