using System;

namespace wallet_api.models

{
  public class User
  {
    public int Id { get; set; }
    public string fullName { get; set; }
    public string cpf { get; set; }
    public DateOnly dateOfBirth { get; set; }
  }
}