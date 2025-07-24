using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class OrdersController(IOrderService _orderService) : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<OrderDto>> CreateOrder(CreateOrderDto createOrderDto)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim))
        {
            return Unauthorized("User not authenticated.");
        }

        if (!int.TryParse(userIdClaim, out int userId))
        {
            return BadRequest("Invalid User ID format in token.");
        }

        var createdOrder = await _orderService.CreateOrderAsync(createOrderDto, userId);

        if (createdOrder == null)
        {
            return BadRequest("Failed to create order.");
        }

        return CreatedAtAction(nameof(CreateOrder), new { id = createdOrder.Id }, createdOrder);


    }
}
