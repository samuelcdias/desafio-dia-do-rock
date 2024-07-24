using Microsoft.EntityFrameworkCore;

namespace RockBackend.Data;
public class AppDBContext : DbContext
{
    public AppDBContext()
    {
    }
    public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
    {
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            var connectionString = "Data Source=rocke-me.db";
            optionsBuilder.UseSqlite(connectionString);
        }
        base.OnConfiguring(optionsBuilder);
    }
    public DbSet<Band> Bandas { get; set; }
    public DbSet<Event> Eventos { get; set; }
    public DbSet<EventBand> EventBands { get; set; }
    public DbSet<Image> Imagens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Event>()
            .HasOne(t => t.Imagem)
            .WithOne(t => t.Event);

        modelBuilder.Entity<Event>()
            .HasMany(t => t.EventBands)
            .WithOne(t => t.Event);

        modelBuilder.Entity<Band>()
            .HasMany(t => t.EventBands)
            .WithOne(t => t.Band);

        modelBuilder.Entity<EventBand>()
            .HasOne(t => t.Event)
            .WithMany(t => t.EventBands);

        modelBuilder.Entity<EventBand>()
            .HasOne(t => t.Band)
            .WithMany(t => t.EventBands);


        base.OnModelCreating(modelBuilder);
    }


}
