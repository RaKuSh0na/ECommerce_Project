using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Interface;

public interface IProductService
{
    Task<IEnumerable<ProductDto>> GetAllProductsAsync(); // <-- CRITICAL: Returns a collection of Product DTOs
    Task<ProductDto?> GetProductByIdAsync(int id);

    Task<ProductDto?> CreateProductAsync(ProductCreateDto productCreateDto);
    Task<ProductDto?> UpdateProductAsync(ProductUpdateDto productUpdateDto);
    Task<bool> DeleteProductAsync(int id);
}
