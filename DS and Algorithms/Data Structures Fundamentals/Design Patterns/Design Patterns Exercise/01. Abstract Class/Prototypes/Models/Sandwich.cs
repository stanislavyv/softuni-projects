namespace Prototype.Prototypes.Models
{
    using System;

    internal class Sandwich : SandwichPrototype
    {
        public string Bread { get; private set; }
        public string Meat { get; private set; }
        public string Cheese { get; private set; }
        public string Veggies { get; private set; }

        public Sandwich(string bread, string meat, string cheese, string veggies)
        {
            this.Bread = bread;
            this.Meat = meat;
            this.Cheese = cheese;
            this.Veggies = veggies;
        }

        public override SandwichPrototype Clone()
        {
            var ingredientList = GetIngredientList();
            Console.WriteLine($"Cloning sandwich with ingredients: {ingredientList}");

            return MemberwiseClone() as SandwichPrototype;
        }

        private string GetIngredientList()
        {
            return $"{this.Bread}, {this.Meat}, {this.Cheese}, {this.Veggies}";
        }
    }
}
