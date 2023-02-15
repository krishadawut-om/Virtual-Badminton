using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace virtual_badminton.DTOs
{
    public class AuthenticationDto
    {
        public string? Id { get; set; }

        public string? Username { get; set; }

        public DateTime? CreateAt { get; set; }

        public string? Token { get; set; }

    }
}

