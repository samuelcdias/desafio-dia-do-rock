namespace RockBackend.Data;

public class Band
{
    public int Id { get; set; }
    public string Nome { get; set; }

    public virtual ICollection<EventBand> EventBands { get; set; }
}
