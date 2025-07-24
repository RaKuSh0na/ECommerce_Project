using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs;

public class ProductCreateDto
{


    [MaxLength(100, ErrorMessage = "Product name cannot exceed 100 characters.")]
    public required string Name { get; set; } = string.Empty;

    [MaxLength(1000, ErrorMessage = "Product description cannot exceed 1000 characters.")]
    public string Description { get; set; } = string.Empty;

   
    [Range(0.01, 1000000.00, ErrorMessage = "Price must be greater than 0.")]
    public required decimal Price { get; set; }

    [MaxLength(255, ErrorMessage = "Image URL cannot exceed 255 characters.")]
    public string ImageUrl { get; set; } = string.Empty;

    [Required(ErrorMessage = "Stock quantity is required.")]
    [Range(0, int.MaxValue, ErrorMessage = "Stock must be a non-negative number.")]
    public int Stock { get; set; }
}
