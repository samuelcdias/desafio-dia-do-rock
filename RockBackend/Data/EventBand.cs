using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RockBackend.Data
{
    public class EventBand
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int EventId  { get; set; }
        public int BandId  { get; set; }

        public virtual Event Event { get; set; }
        public virtual Band Band { get; set; }
    }
}
