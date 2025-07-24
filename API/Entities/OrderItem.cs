using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities;

public class OrderItem
{
    [Key]
    public int Id { get; set; } // Order Item ID (int)

    // Foreign key to Order
    public int OrderId { get; set; }
    public Order Order { get; set; } = default!; // Navigation property

    // Foreign key to Product
    public int ProductId { get; set; } // The ID of the product ordered
    public Product Product { get; set; } = default!; // Navigation property

    public int Quantity { get; set; }

    [Column(TypeName = "decimal(18,2)")] // Price at the time of order
    public decimal UnitPrice { get; set; } // Price of the product when it was added to the order
}
