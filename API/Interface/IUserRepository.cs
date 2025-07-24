using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interface;

public interface IUserRepository
{


    Task<User?> GetUserByIdAsync(int id); // ID is int
    Task<User?> GetUserByUsernameAsync(string username);
    Task<User?> GetUserByEmailAsync(string email);
    Task AddUserAsync(User user);
}
