using RockBackend.Domain.Primitives;
namespace RockBackend.Domain;

public class BandModel
{
    public Name BandaNome { get; }
    private BandModel() { }
    public BandModel(string bandaNome)
    {
        BandaNome = new Name(bandaNome);
    }
}
