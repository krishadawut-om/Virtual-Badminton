using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace virtual_badminton.Models
{
    public class GameModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("userId")]
        public string? UserId { get; set; }

        [BsonElement("userScore")]
        public int? UserScore { get; set; }

        [BsonElement("opponentScore")]
        public int? OpponentScore { get; set; }

        [BsonElement("totalPlayingTime")]
        public double? TotalPlayingTime { get; set; }

        [BsonElement("shots")]
        public Shots? Shots { get; set; }

        [BsonElement("createAt")]
        [BsonDateTimeOptions]
        public DateTime CreateAt { get; set; }
    }


    public class Shots
    {
        [BsonElement("clear")]
        public int? Clear { get; set; }

        [BsonElement("drop")]
        public int? Drop { get; set; }

        [BsonElement("drive")]
        public int? Drive { get; set; }

        [BsonElement("smash")]
        public int? Smash { get; set; }
    }
}

