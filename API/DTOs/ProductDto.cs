using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs;

public class ProductDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }

    public required decimal Price { get; set; }
    public required string ImageUrl { get; set; }
    
    public int Stock { get; set; } // Added Stock property to match Product entity
}
