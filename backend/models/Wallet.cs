using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace wallet_api.models
{
  public class Wallet
  {
    public int Id { get; set; }
    public int userId { get; set; }
    public float balance { get; set; }
    public string bank { get; set; }
    public DateTime lastChange { get; set; }
  }
}