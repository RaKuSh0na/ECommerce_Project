using API.Entities; // Corrected namespace
using Microsoft.EntityFrameworkCore;

namespace API.Data // Corrected namespace
{
    public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
    {

        // Existing DbSets
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }

        // NEW: Add DbSets for Order and OrderItem
        public DbSet<Order> Orders { get; set; } = default!; // Initialize to avoid null warnings
        public DbSet<OrderItem> OrderItems { get; set; } = default!; // Initialize to avoid null warnings

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure relationships
            // One User can have many Orders
            modelBuilder.Entity<User>()
                .HasMany(u => u.Orders)
                .WithOne(o => o.User)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Cascade); // If a user is deleted, their orders are also deleted

            // One Order can have many OrderItems
            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderItems)
                .WithOne(oi => oi.Order)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade); // If an order is deleted, its items are also deleted

            // Each OrderItem refers to one Product
            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Product)
                .WithMany() // Product can be part of many order items, but OrderItem doesn't define a collection on Product
                .HasForeignKey(oi => oi.ProductId)
                .OnDelete(DeleteBehavior.Restrict); // Prevent deleting a product if it's part of an order item

            // Seed Products (ensure IDs are int and match your current data if any)
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Gaming Headset", Description = "High-fidelity gaming headset with surround sound.", Price = 79.99m, ImageUrl = "https://placehold.co/400x300/3f3f3f/ffffff?text=Headset", Stock = 100 },
                new Product { Id = 2, Name = "Mechanical Keyboard", Description = "RGB mechanical keyboard with tactile switches.", Price = 129.99m, ImageUrl = "https://placehold.co/400x300/3f3f3f/ffffff?text=Keyboard", Stock = 75 },
                new Product { Id = 3, Name = "Wireless Mouse", Description = "Ergonomic wireless mouse with customizable DPI.", Price = 49.99m, ImageUrl = "https://placehold.co/400x300/3f3f3f/ffffff?text=Mouse", Stock = 120 },
                new Product { Id = 4, Name = "Curved Gaming Monitor", Description = "27-inch curved gaming monitor with 144Hz refresh rate. Immerse yourself in stunning visuals and smooth gameplay.", Price = 299.99m, ImageUrl = "https://placehold.co/400x300/3f3f3f/ffffff?text=Monitor", Stock = 50 },
                new Product { Id = 5, Name = "Webcam 1080p", Description = "Full HD 1080p webcam with autofocus. Perfect for streaming, video calls, and online meetings.", Price = 59.99m, ImageUrl = "https://placehold.co/400x300/3f3f3f/ffffff?text=Webcam", Stock = 200 },
                new Product { Id = 6, Name = "Gaming Chair", Description = "Ergonomic gaming chair with lumbar support. Designed for long gaming sessions, providing maximum comfort and adjustability.", Price = 199.99m, ImageUrl = "https://placehold.co/400x300/3f3f3f/ffffff?text=Chair", Stock = 60 },
                new Product { Id = 7, Name = "External SSD 1TB", Description = "Portable 1TB SSD for blazing-fast data transfer. Ideal for games and content creators needing extra storage and speed.", Price = 99.99m, ImageUrl = "https://placehold.co/400x300/3f3f3f/ffffff?text=SSD", Stock = 90 }
            );
        }
    }
}
