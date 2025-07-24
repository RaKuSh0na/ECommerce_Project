using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Interface;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProductsController(IProductService _iproductService) : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> GetAllProducts()
    {
        var products = await _iproductService.GetAllProductsAsync();
        return Ok(products); // Return 200 OK with the list of product DTOs
    }
    // GET: api/Products/{id}
    // This endpoint is also accessible by anyone
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> GetProduct(int id)
    {
        var product = await _iproductService.GetProductByIdAsync(id);

        if (product == null)
        {
            return NotFound(); // Returns a 404 Not Found if product is not found
        }

        return Ok(product); // Return 200 OK with the product DTO
    }

    // POST: api/Products
    // NEW: Allows only Admin users to create a new product
    [Authorize(Roles = "Admin")] // Restrict access to Admin role
    [HttpPost]
    public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] ProductCreateDto productCreateDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState); // Return validation errors
        }

        var createdProduct = await _iproductService.CreateProductAsync(productCreateDto);

        if (createdProduct == null)
        {
            // This might happen if there's a database error or a unique constraint violation
            return StatusCode(500, "Failed to create product.");
        }

        // Return 201 Created status with the location of the new resource
        return CreatedAtAction(nameof(GetProduct), new { id = createdProduct.Id }, createdProduct);
    }

    // PUT: api/Products/{id}
    // NEW: Allows only Admin users to update an existing product
    [Authorize(Roles = "Admin")] // Restrict access to Admin role
    [HttpPut("{id}")]
    public async Task<ActionResult<ProductDto>> UpdateProduct(int id, [FromBody] ProductUpdateDto productUpdateDto)
    {
        if (id != productUpdateDto.Id)
        {
            return BadRequest("Product ID in URL does not match ID in request body.");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState); // Return validation errors
        }

        var updatedProduct = await _iproductService.UpdateProductAsync(productUpdateDto);

        if (updatedProduct == null)
        {
            return NotFound($"Product with ID {id} not found.");
        }

        // Return 200 OK with the updated product
        return Ok(updatedProduct);
    }

    // DELETE: api/Products/{id}
    // NEW: Allows only Admin users to delete a product
    [Authorize(Roles = "Admin")] // Restrict access to Admin role
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        var isDeleted = await _iproductService.DeleteProductAsync(id);

        if (!isDeleted)
        {
            return NotFound($"Product with ID {id} not found.");
        }

        // Return 204 No Content for successful deletion
        return NoContent();
    }
}
