using System.Text;
using API.DTOs;
using API.Entities;
using API.Interface;
using BCrypt.Net;

namespace API.Services;

public class AuthService(IUserRepository _userRepository, ITokenService _tokenService) : IAuthService
{
    public async Task<LoginResponseDto?> RegisterAsync(UserRegistrationDto registrationDto)
    {
        if (await _userRepository.GetUserByUsernameAsync(registrationDto.Username) != null)
            return null;

        if (await _userRepository.GetUserByEmailAsync(registrationDto.Email) != null)
            return null;

        string saltString = BCrypt.Net.BCrypt.GenerateSalt();
        string hashedPasswordString = BCrypt.Net.BCrypt.HashPassword(registrationDto.Password, saltString);

        var newUser = new User
        {
            Username = registrationDto.Username,
            Email = registrationDto.Email,
            PasswordHash = Encoding.UTF8.GetBytes(hashedPasswordString),
            PasswordSalt = Encoding.UTF8.GetBytes(saltString),
            Role = "User"
        };

        await _userRepository.AddUserAsync(newUser);

        return new LoginResponseDto
        {
            UserId = newUser.Id,
            Username = newUser.Username,
            Email = newUser.Email,
            Role = newUser.Role,
            Token = _tokenService.CreateToken(newUser)
        };
    }

    public async Task<LoginResponseDto?> LoginAsync(UserLoginDto loginDto)
    {
        var user = await _userRepository.GetUserByUsernameAsync(loginDto.Username);
        if (user == null || user.PasswordHash == null)
            return null;

        string storedHashString = Encoding.UTF8.GetString(user.PasswordHash);

        if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, storedHashString))
            return null;

        return new LoginResponseDto
        {
            UserId = user.Id,
            Username = user.Username,
            Email = user.Email,
            Role = user.Role,
            Token = _tokenService.CreateToken(user)
        };
    }
}
