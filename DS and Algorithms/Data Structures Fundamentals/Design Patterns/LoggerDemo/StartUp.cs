namespace LoggerDemo
{
    using System;
    using LoggerDemo.Core;

    public class StartUp
    {
        static void Main(string[] args)
        {
            var numAppenders = int.Parse(Console.ReadLine());

            var controller = new Controller();
            controller.Run(numAppenders);
        }
    }
}
