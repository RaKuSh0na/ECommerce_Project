using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs;

public class UserRegistrationDto
{
    [StringLength(50, MinimumLength = 3)]
    public required string Username { get; set; }
    [EmailAddress]
    public required string Email { get; set; }  
    [StringLength(100, MinimumLength = 6)]
    public required string Password { get; set; }
}
