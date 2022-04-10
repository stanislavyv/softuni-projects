namespace CommandPattern.Commands.Models
{
    using CommandPattern.Models;
    using CommandPattern.Enumerations;
    using CommandPattern.Commands.Contracts;

    internal class ProductCommand : ICommand
    {
        private readonly Product product;
        private readonly PriceAction priceAction;
        private readonly int amount;

        public ProductCommand(Product product, PriceAction priceAction, int amount)
        {
            this.product = product;
            this.priceAction = priceAction;
            this.amount = amount;
        }

        public void ExecuteAction()
        {
            if (this.priceAction == PriceAction.Increase)
            {
                this.product.IncreasePrice(this.amount);
            }
            else
            {
                this.product.DecreasePirce(this.amount);
            }
        }
    }
}
