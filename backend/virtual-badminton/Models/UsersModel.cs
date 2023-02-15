using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace virtual_badminton.Models
{
    [BsonIgnoreExtraElements]
    public class UsersModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("username")]
        public string? Username { get; set; }

        [BsonElement("password")]
        public string? Password { get; set; }

        [BsonElement("createAt")]
        public DateTime? CreateAt { get; set; }
    }
        
}

