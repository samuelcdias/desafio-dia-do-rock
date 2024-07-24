namespace RockBackend.Data
{
    public class EventBand
    {
        public int EventId  { get; set; }
        public int BandId  { get; set; }

        public virtual Event Event { get; set; }
        public virtual Band Band { get; set; }
    }
}
