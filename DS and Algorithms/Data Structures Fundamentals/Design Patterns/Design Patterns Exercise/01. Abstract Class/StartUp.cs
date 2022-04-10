namespace Prototype
{
    using Prototype.Models;
    using Prototype.Prototypes.Models;

    public class StartUp
    {
        static void Main(string[] args)
        {
            var menu = new SandwichMenu();

            menu["BLT"] = new Sandwich("Wheat", "Bacon", "Cheddar", "Lettuce, Tomato");
            menu["PB&J"] = new Sandwich("White", "", "", "Peanut butter, Jelly");
            menu["Turkey"] = new Sandwich("Rye", "Turkey", "Emmentaller", "Lettuce, Onions, Tomato");

            var s1 = menu["BLT"].Clone() as Sandwich;
            var s2 = menu["PB&J"].Clone() as Sandwich;
            var s3 = menu["Turkey"].Clone() as Sandwich;
        }
    }
}
