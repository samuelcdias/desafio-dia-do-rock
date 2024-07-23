namespace RockBackend.Domain.Primitives
{
    public class Address
    {
        private Name Name { get;}
        private Address() { }
        public Address(string name)
        {
            Name = new Name(name);
        }
    }
}
