// File: ECommerce/API/ECommerceBackend/Entities/Order.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities // Corrected namespace
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } // Order ID (int)

        // Foreign key to User
        public int UserId { get; set; } // The ID of the user who placed the order
        public User User { get; set; } = default!; // Navigation property

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        [Required]
        [MaxLength(255)]
        public string ShippingAddress { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string City { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string ZipCode { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string PaymentMethod { get; set; } = string.Empty; // e.g., "Credit Card", "PayPal"

        [Column(TypeName = "decimal(18,2)")] // Ensure correct decimal precision for currency
        public decimal TotalAmount { get; set; }

        public string Status { get; set; } = "Pending"; // e.g., Pending, Processing, Shipped, Delivered, Cancelled

        // Navigation property for order items
        public ICollection<OrderItem> OrderItems { get; set; } = [];
    }
}
