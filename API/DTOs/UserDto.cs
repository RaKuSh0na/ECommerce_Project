using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs;

public class UserDto
{
    public required string Username { get; set; }
    public required string Email { get; set; }
    public required string Role { get; set; } 
}
