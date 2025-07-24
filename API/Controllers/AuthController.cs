using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Interface;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AuthController(IAuthService _authService) : BaseApiController
{

    // POST: api/Auth/register
    [HttpPost("register")]
    public async Task<ActionResult<LoginResponseDto>> Register(UserRegistrationDto registrationDto)
    {
        var response = await _authService.RegisterAsync(registrationDto);

        if (response == null)
        {
            // This could mean username/email already exists or other registration failure
            return BadRequest(new { message = "Registration failed. Username or email might already be taken." });
        }

        // If registration is successful, return the LoginResponseDto (which includes the JWT token)
        return Ok(response); // Returns 200 OK with token and user info
    }

    // POST: api/Auth/login
    [HttpPost("login")] // Handles HTTP POST requests to /api/auth/login
    public async Task<ActionResult<LoginResponseDto>> Login(UserLoginDto loginDto)
    {
        var response = await _authService.LoginAsync(loginDto);

        if (response == null)
        {
            return Unauthorized(new { message = "Invalid username or password." }); // Returns 401 Unauthorized
        }

        // If login is successful, return the LoginResponseDto (which includes the JWT token)
        return Ok(response); // Returns 200 OK with token and user info
    }
}
