using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interface;

namespace API.Services;

public class ProductService(IProductRepository _productRepository) : IProductService
{
    public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
    {
        // This call returns IEnumerable<API.Entities.Product>
        var products = await _productRepository.GetAllProductsAsync();

        // This correctly maps to IEnumerable<API.DTOs.ProductDto>
        return products.Select(p => new ProductDto
        {
            Id = p.Id,
            Name = p.Name,
            Description = p.Description,
            Price = p.Price,
            ImageUrl = p.ImageUrl
        });
    }

    public async Task<ProductDto?> GetProductByIdAsync(int id)
    {
        var product = await _productRepository.GetProductByIdAsync(id);
        if (product == null)
        {
            return null;
        }
        // Map entity to DTO
        return new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            ImageUrl = product.ImageUrl
        };
    }


    public async Task<ProductDto?> CreateProductAsync(ProductCreateDto productCreateDto)
    {
        var product = new Product
        {
            Name = productCreateDto.Name,
            Description = productCreateDto.Description,
            Price = productCreateDto.Price,
            ImageUrl = productCreateDto.ImageUrl,
            Stock = productCreateDto.Stock
        };

        var createdProduct = await _productRepository.AddProductAsync(product);
        if (createdProduct == null)
        {
            return null;
        }

        return new ProductDto
        {
            Id = createdProduct.Id,
            Name = createdProduct.Name,
            Description = createdProduct.Description, // Corrected typo here
            Price = createdProduct.Price,
            ImageUrl = createdProduct.ImageUrl
        };
    }

    // NEW: Update an existing product from ProductUpdateDto
    public async Task<ProductDto?> UpdateProductAsync(ProductUpdateDto productUpdateDto)
    {
        var product = new Product
        {
            Id = productUpdateDto.Id,
            Name = productUpdateDto.Name,
            Description = productUpdateDto.Description,
            Price = productUpdateDto.Price,
            ImageUrl = productUpdateDto.ImageUrl,
            Stock = productUpdateDto.Stock
        };

        var updatedProduct = await _productRepository.UpdateProductAsync(product);
        if (updatedProduct == null)
        {
            return null; // Product not found
        }

        return new ProductDto
        {
            Id = updatedProduct.Id,
            Name = updatedProduct.Name,
            Description = updatedProduct.Description,
            Price = updatedProduct.Price,
            ImageUrl = updatedProduct.ImageUrl
        };
    }

    // NEW: Delete a product by ID
    public async Task<bool> DeleteProductAsync(int id)
    {
        return await _productRepository.DeleteProductAsync(id);
    }
}

