using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using virtual_badminton.Models;

namespace virtual_badminton.DTOs
{
    public class GameDto
    {
        public string? UserId { get; set; }

        public int? UserScore { get; set; }

        public int? OpponentScore { get; set; }

        public double? TotalPlayingTime { get; set; }

        public Shots? Shots { get; set; }
    }
}

