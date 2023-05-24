using Microsoft.EntityFrameworkCore;

namespace wallet_api.models
{
  public class WalletContext : DbContext
  {
    public WalletContext(DbContextOptions<WalletContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Wallet> Wallets { get; set; }
  }
}