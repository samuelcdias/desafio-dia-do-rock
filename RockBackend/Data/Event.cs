namespace RockBackend.Data
{
    public class Event
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Date { get; set; }
        public string Address { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }

        public virtual ICollection<Band> Bandas { get; set; }
        public virtual ICollection<EventBand> EventBands { get; set; }
        public virtual Image Image { get; set; }

    }
}
