using RockBackend.Domain.Primitives;
namespace RockBackend.Domain;

public class Band
{
    public Name BandaNome { get; }
    private Band() { }
    public Band(string bandaNome)
    {
        BandaNome = new Name(bandaNome);
    }
}
