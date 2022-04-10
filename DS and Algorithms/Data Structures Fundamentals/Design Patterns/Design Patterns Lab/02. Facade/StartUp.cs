namespace Facade
{
    using System;

    using Facade.Builders;

    public class StartUp
    {
        static void Main(string[] args)
        {
            var car = new CarBuilderFacade()
                .Info
                    .WithType("BMW")
                    .WitColor("Black")
                    .WithNumberOfDoors(5)
                .Built
                    .InCity("Leipzig ")
                    .AtAddress("Some address 254")
                .Build();

            Console.WriteLine(car);
        }
    }
}
