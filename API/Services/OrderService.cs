using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interface;

namespace API.Services;

public class OrderService(DataContext _context, IProductRepository _prodcutRepository,
                          IOrderRepository _orderRepository, IUserRepository _userRepository) : IOrderService
{
    public decimal DeliveryCharge => 50.0m; // or whatever your charge logic is

    public async Task<OrderDto?> CreateOrderAsync(CreateOrderDto createOrderDto, int userId)
    {
        //verify user exists
        var user = await _userRepository.GetUserByIdAsync(userId);
        if (user == null)
        {
            Console.WriteLine($"Order creation failed: User with ID {userId} not found.");
            return null; // User not found
        }
        // 2. Validate order items and calculate total based on current product prices
        var orderItems = new List<OrderItem>();
        decimal subTotal = 0;

        foreach (var item in createOrderDto.OrderItems)
        {
            var product = await _prodcutRepository.GetProductByIdAsync(item.ProductId);
            if (product == null)
            {
                Console.WriteLine($"Order creation failed: Product with ID {item.ProductId} not found.");
                return null; // Product not found
            }
            if (item.Quantity <= 0)
            {
                Console.WriteLine($"Order creation failed: Invalid quantity {item.Quantity} for product ID {item.ProductId}.");
                return null; // Invalid quantity
            }
            if (product.Stock < item.Quantity)
            {
                Console.WriteLine($"Order creation failed: Insufficient stock for product ID {item.ProductId}. Available: {product.Stock}, Requested: {item.Quantity}.");
                return null; // Insufficient stock
            }

            orderItems.Add(new OrderItem
            {
                ProductId = item.ProductId,
                Quantity = item.Quantity,
                UnitPrice = product.Price // Use current product price
            });

            // Calculate total price for the item
            subTotal += product.Price * item.Quantity;
        }
        // 3. Total amount calculation
        decimal totalAmount = subTotal + DeliveryCharge;

        // 4. Create the order
        var order = new Order
        {
            UserId = userId,
            OrderDate = DateTime.UtcNow,
            ShippingAddress = createOrderDto.ShippingAddress,
            City = createOrderDto.City,
            ZipCode = createOrderDto.ZipCode,
            PaymentMethod = "Cash on Delivery", // Assuming a default payment method
            TotalAmount = totalAmount,
            Status = "Pending", // Initial status
            OrderItems = orderItems
        };

        // 5. Save the order to the database
        var createdOrder = await _orderRepository.AddOrderAsync(order);

        // 6. Update product stock
        foreach (var item in createOrderDto.OrderItems)
        {
            var product = await _prodcutRepository.GetProductByIdAsync(item.ProductId);
            if (product != null)
            {
                product.Stock -= item.Quantity; // Deduct the ordered quantity from stock
                await _context.SaveChangesAsync(); // Save changes to update stock
            }
        }

        // 7. Return the created order as OrderDTO
        return new OrderDto
        {
            Id = createdOrder.Id,
            UserId = createdOrder.UserId,
            OrderDate = createdOrder.OrderDate,
            ShippingAddress = createdOrder.ShippingAddress,
            City = createdOrder.City,
            ZipCode = createdOrder.ZipCode,
            PaymentMethod = createdOrder.PaymentMethod,
            TotalAmount = createdOrder.TotalAmount,
            Status = createdOrder.Status,
            OrderItems = [.. createdOrder.OrderItems.Select(oi => new OrderItemDto
            {
                ProductId = oi.ProductId,
                Quantity = oi.Quantity,
            
            })]
        };
    }
}


