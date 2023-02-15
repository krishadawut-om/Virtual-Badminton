using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using virtual_badminton.DTOs;
using virtual_badminton.Models;

namespace virtual_badminton.Services;

    public class UsersService
    {
        private readonly IMongoCollection<UsersModel> _users;
        private readonly IConfiguration iconfiguration;

        public UsersService(IOptions<DatabaseSettings> options, IConfiguration iconfiguration)
        {
            this.iconfiguration = iconfiguration;

            var mongoClient = new MongoClient(options.Value.ConnectionString);

            _users = mongoClient
                .GetDatabase(options.Value.DatabaseName)
                .GetCollection<UsersModel>(options.Value.UsersCollectionName);
        }

        public static String HashSha256(String? value)
        {
            StringBuilder Sb = new StringBuilder();

            using (SHA256 hash = SHA256Managed.Create())
            {
                Encoding enc = Encoding.UTF8;
                Byte[] result = hash.ComputeHash(enc.GetBytes(value));

                foreach (Byte b in result)
                    Sb.Append(b.ToString("x2"));
            }

            return Sb.ToString();
        }

        public async Task<List<UsersModel>> GetAllAsync()
        {
            var result = await _users.Find(_ => true)
            .ToListAsync();
            return result;
        }

        public async Task<UsersModel> CreateAsync(UserDto user)
        {
            var userModel = new UsersModel { Username = user.Username, Password = HashSha256(user.password), CreateAt = DateTime.Now };
            await _users.InsertOneAsync(userModel);
            return userModel;
        }

        public async Task<UsersModel> GetByUsernameAsync(String username)
        {
            var result = await _users.Find(e => e.Username == username).FirstOrDefaultAsync();
            return result;
        }

        public async Task<Boolean> CheckExistAsync(String? Username)
        {
            var result = await _users.Find(e => e.Username == Username).FirstOrDefaultAsync();
            return result != null;
        }

        public async Task<String> DeleteAsync(String Id)
        {
            var result = await _users.DeleteOneAsync(e => e.Id == Id);
            return Id;
        }

        public async Task<AuthenticationDto?> AuthenticateAsync(UserDto Data)
        {
            UsersModel? UsersRecords = await GetByUsernameAsync(Data.Username);
            var crypt = new SHA256Managed();
            string hash = String.Empty;
            byte[] crypto = crypt.ComputeHash(Encoding.ASCII.GetBytes(Data.password));
            foreach (byte theByte in crypto)
            {
                hash += theByte.ToString("x2");
            }
            if (!(UsersRecords != null && UsersRecords.Username?.ToLower() == Data.Username.ToLower() && UsersRecords.Password == hash))
            {
                return null;
            }
            // Else we generate JSON Web Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.UTF8.GetBytes(iconfiguration["JWT:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
              {
                    new Claim(ClaimTypes.UserData, UsersRecords.Id??"")
              }),
                Expires = DateTime.UtcNow.AddDays(365),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var result = new AuthenticationDto
            {
                Token = tokenHandler.WriteToken(token),
                Id = UsersRecords.Id,
                Username = UsersRecords.Username,
                CreateAt = UsersRecords.CreateAt
            };
            return result;
        }
}


