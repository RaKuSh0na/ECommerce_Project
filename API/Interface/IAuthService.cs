using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Interface;

public interface IAuthService
{

    Task<LoginResponseDto?> RegisterAsync(UserRegistrationDto registrationDto);
    Task<LoginResponseDto?> LoginAsync(UserLoginDto loginDto);

}
