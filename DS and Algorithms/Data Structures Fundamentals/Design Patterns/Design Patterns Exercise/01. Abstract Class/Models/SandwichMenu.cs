namespace Prototype.Models
{
    using System.Collections.Generic;

    using Prototypes;

    internal class SandwichMenu
    {
        private Dictionary<string, SandwichPrototype> sandwiches;

        public SandwichMenu()
        {
            this.sandwiches = new Dictionary<string, SandwichPrototype>();
        }

        public SandwichPrototype this[string name]
        {
            get => this.sandwiches[name];
            set => this.sandwiches[name] = value;
        }
    }
}
