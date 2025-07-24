using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs;

public class ProductUpdateDto
{
    [Range(1, int.MaxValue, ErrorMessage = "Invalid Product ID.")]
    public int Id { get; set; } // Product ID to identify the product to update

    [MaxLength(100, ErrorMessage = "Product name cannot exceed 100 characters.")]
    public string Name { get; set; } = string.Empty;

    [MaxLength(1000, ErrorMessage = "Product description cannot exceed 1000 characters.")]
    public string Description { get; set; } = string.Empty;


    [Range(0.01, 1000000.00, ErrorMessage = "Price must be greater than 0.")]
    public decimal Price { get; set; }

    [MaxLength(255, ErrorMessage = "Image URL cannot exceed 255 characters.")]
    public string ImageUrl { get; set; } = string.Empty;


    [Range(0, int.MaxValue, ErrorMessage = "Stock must be a non-negative number.")]
    public required int Stock { get; set; }
}
