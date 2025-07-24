using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs;

 public class LoginResponseDto
    {
        public int UserId { get; set; }
        public required string Username { get; set; } 
        public required string Email { get; set; } 
        public required string Role { get; set; }// Include the user's role
        public required string Token { get; set; }  // The JWT token
    }
