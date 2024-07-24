namespace RockBackend.Data
{
    public class Image
    {
        public int Id { get; set; }
        public int EventId { get; set; }
        public string Url { get; set; }

        public virtual Event Event { get; set; }
    }
}
