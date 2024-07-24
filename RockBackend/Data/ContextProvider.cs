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
            var connectionString = "Data Source=c:/dbs/rocke-me.db;Version=3;";
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
            .ToTable("Event")
            .Property(e => e.Id)
            .ValueGeneratedOnAdd();
        modelBuilder.Entity<Band>()
            .ToTable("Band")
            .Property(e => e.Id)
            .ValueGeneratedOnAdd();
        modelBuilder.Entity<Image>()
            .ToTable("Image")
            .Property(e => e.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<EventBand>()
            .ToTable("EventBand")
            .Property(e => e.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<Event>()
            .HasOne(t => t.Image)
            .WithOne(t => t.Event)
            .HasForeignKey<Image>(t => t.EventId);

        modelBuilder.Entity<Event>()
            .HasMany(t => t.EventBands)
            .WithOne(t => t.Event)
            .HasForeignKey(t => t.EventId);

        modelBuilder.Entity<Band>()
            .HasMany(t => t.EventBands)
            .WithOne(t => t.Band)
            .HasForeignKey(t => t.BandId);

        modelBuilder.Entity<EventBand>()
            .HasOne(t => t.Event)
            .WithMany(t => t.EventBands)
            .HasForeignKey(t => t.EventId);

        modelBuilder.Entity<EventBand>()
            .HasOne(t => t.Band)
            .WithMany(t => t.EventBands)
            .HasForeignKey(t => t.BandId);

        base.OnModelCreating(modelBuilder);
    }


}
