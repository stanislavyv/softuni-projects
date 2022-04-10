namespace Template.Models
{
    using System;

    internal class SourDough : Bread
    {
        public SourDough()
        {
        }

        public override void Bake()
        {
            Console.WriteLine("Baking the sour dough bread. (20 minutes)");
        }

        public override void MixIngredients()
        {
            Console.WriteLine("Gathering ingredients for sour dough bread");
        }
    }
}
