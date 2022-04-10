using Composite.Models;

namespace Composite.Contracts
{
    internal interface IGiftOperations
    {
        void Add(BaseGift gift);
        void Remove(BaseGift gift);
    }
}
