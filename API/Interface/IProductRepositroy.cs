using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interface;

public interface IProductRepository
{

    Task<IEnumerable<Product>> GetAllProductsAsync();
    Task<Product?> GetProductByIdAsync(int id); // ID is int


    Task<Product> AddProductAsync(Product product);  // add a new product and return it
    Task<Product?> UpdateProductAsync(Product product); // Returns updated product or null if not found
    Task<bool> DeleteProductAsync(int id); // Returns true if deleted, false if not found
    Task<bool> ProductExists(int id); // Helper to check if product exists

}
