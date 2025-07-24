using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs;


public class CreateOrderDto
{
    [Required]
    public List<OrderItemDto> OrderItems { get; set; } = new List<OrderItemDto>();

    [Required]
    [MaxLength(255)]
    public string ShippingAddress { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string City { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    public string ZipCode { get; set; } = string.Empty;

    // PaymentMethod is NOT included here as it's fixed to "CashOnDelivery" on the backend
    // TotalAmount is NOT included here as it's calculated on the backend
}

