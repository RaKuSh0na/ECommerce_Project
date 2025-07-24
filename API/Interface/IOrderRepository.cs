using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interface;

public interface IOrderRepository
{
    Task<Order> AddOrderAsync(Order order); // Method to add an order asynchronously
}

