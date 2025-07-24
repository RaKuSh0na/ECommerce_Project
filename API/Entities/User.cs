using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities;

public class User
{
    public int Id { get; set; }
    [MaxLength(50)]
    public required string Username { get; set; }
    [EmailAddress]
    [MaxLength(100)]
    public required string Email { get; set; }
    public byte[]? PasswordHash { get; set; }
    public byte[]? PasswordSalt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public required string Role { get; set; } = "User"; // Default role
    
    public ICollection<Order> Orders { get; set; } = []; // Navigation property for orders
}
