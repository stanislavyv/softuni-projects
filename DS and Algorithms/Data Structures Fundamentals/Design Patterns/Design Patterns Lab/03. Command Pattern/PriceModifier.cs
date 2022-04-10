namespace CommandPattern
{
    using System.Collections.Generic;

    using CommandPattern.Commands.Contracts;

    internal class PriceModifier
    { // Invoker class
        private readonly List<ICommand> commands;
        private ICommand command;

        public PriceModifier()
        {
            this.commands = new List<ICommand>();
        }

        public void SetCommand(ICommand command) => this.command = command;

        public void Invoke()
        {
            this.commands.Add(this.command);
            this.command.ExecuteAction();
        }
    }
}
