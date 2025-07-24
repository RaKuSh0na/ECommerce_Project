using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities;

public class Product
{
    public int Id { get; set; }
    [MaxLength(100)]
    public required string Name { get; set; }
    [MaxLength(1000)]
    public required string Description { get; set; }

    public required decimal Price { get; set; }
    [MaxLength(255)]
    public required string ImageUrl { get; set; }

    public int Stock { get; set; }

}
