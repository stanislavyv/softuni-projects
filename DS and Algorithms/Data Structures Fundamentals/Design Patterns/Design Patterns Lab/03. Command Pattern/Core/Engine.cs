namespace CommandPattern.Core
{
    using CommandPattern.Commands.Contracts;

    internal class Engine
    {
        public Engine()
        {
        }

        public void Execute(PriceModifier pm, ICommand command)
        {
            pm.SetCommand(command);
            pm.Invoke();
        }
    }
}
