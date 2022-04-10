namespace Template
{
    using Template.Models;

    public class StartUp
    {
        static void Main(string[] args)
        {
            var sourdough = new SourDough();
            var twelveGrain = new TwelveGrain();

            sourdough.Make();
            twelveGrain.Make();
        }
    }
}
