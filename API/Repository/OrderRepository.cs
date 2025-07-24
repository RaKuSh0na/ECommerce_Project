using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Interface;

namespace API.Repository;

public class OrderRepository(DataContext _context): IOrderRepository
{
    public async Task<Order> AddOrderAsync(Order order)
    {
        // Add the order to the database
        await _context.Orders.AddAsync(order);
        await _context.SaveChangesAsync();
        return order; // Return the added order
    }    
}
