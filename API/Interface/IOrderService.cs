using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Interface;

public interface IOrderService
{
    Task<OrderDto?> CreateOrderAsync(CreateOrderDto createOrderDto, int userId);

    decimal DeliveryCharge { get; } // Delivery charge for the order
}
