using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using wallet_api.models;

namespace wallet_api.controllers
{
  [ApiController]
  [Route("api")]
  public class UserController : ControllerBase
  {
    private readonly WalletContext _context;

    public UserController(WalletContext context)
    {
      _context = context;
    }

    public class LoginJSON
    {
      public string cpf { get; set; }
    }


    [HttpGet]
    [Route("users")]
    public async Task<ActionResult<IEnumerable<User>>> getAllUsers()
    {
      return await _context.Users.ToListAsync();
    }

    [HttpPost]
    [Route("user")]
    public async Task<ActionResult<User>> createUser(User user)
    {
      _context.Users.Add(user);
      await _context.SaveChangesAsync();
      return Created("users", user);
    }

    [HttpPost]
    [Route("login")]
    public async Task<ActionResult<IEnumerable<User>>> login([FromBody] LoginJSON body)
    {
      var cpf = body.cpf;
      var users = from u in _context.Users
                  select u;
      if (!String.IsNullOrEmpty(cpf))
      {
        users = users.Where(s => s.cpf!.Contains(cpf));
      }
      return await users.ToListAsync();
    }
  }
}