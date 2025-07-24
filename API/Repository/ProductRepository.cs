using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interface;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class ProductRepository(DataContext _context) : IProductRepository
{

    public async Task<IEnumerable<Product>> GetAllProductsAsync()
    {
        return await _context.Products.ToListAsync();
    }

    public async Task<Product?> GetProductByIdAsync(int id) // ID is int
    {
        return await _context.Products.FindAsync(id);
    }

    // NEW: Adds a new product to the database
    public async Task<Product> AddProductAsync(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return product;
    }

    // NEW: Updates an existing product in the database
    public async Task<Product?> UpdateProductAsync(Product product)
    {
        var existingProduct = await _context.Products.FindAsync(product.Id);
        if (existingProduct == null)
        {
            return null; // Product not found
        }

        // Update properties
        _context.Entry(existingProduct).CurrentValues.SetValues(product);
        await _context.SaveChangesAsync();
        return existingProduct;
    }

    // NEW: Deletes a product from the database by ID
    public async Task<bool> DeleteProductAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            return false; // Product not found
        }

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return true;
    }

    // NEW: Checks if a product exists by ID
    public async Task<bool> ProductExists(int id)
    {
        return await _context.Products.AnyAsync(e => e.Id == id);
    }
}


