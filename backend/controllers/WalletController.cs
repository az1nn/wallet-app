using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using wallet_api.models;

namespace wallet_api.controllers
{
  [ApiController]
  [Route("api")]
  public class WalletController : ControllerBase
  {
    private readonly WalletContext _context;

    public WalletController(WalletContext context)
    {
      _context = context;
    }

    [HttpGet]
    [Route("wallets")]
    public async Task<ActionResult<IEnumerable<Wallet>>> getAllWallets()
    {
      return await _context.Wallets.ToListAsync();
    }

    [HttpPost]
    [Route("wallet")]
    public async Task<ActionResult<User>> createWallet(Wallet wallet)
    {
      _context.Wallets.Add(wallet);
      await _context.SaveChangesAsync();
      return Created("wallet", wallet);
    }
  }
}