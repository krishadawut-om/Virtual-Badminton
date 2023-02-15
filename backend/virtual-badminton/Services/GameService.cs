using System;
using System.Collections.Generic;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using virtual_badminton.DTOs;
using virtual_badminton.Models;

namespace virtual_badminton.Services
{
    public class GameService
    {

        private readonly IMongoCollection<GameModel> _games;
        private readonly IMongoCollection<UsersModel> _users;
        private readonly IConfiguration iconfiguration;

        public GameService(IOptions<DatabaseSettings> options, IConfiguration iconfiguration)
        {
            this.iconfiguration = iconfiguration;

            var mongoClient = new MongoClient(options.Value.ConnectionString);

            _games = mongoClient
                .GetDatabase(options.Value.DatabaseName)
                .GetCollection<GameModel>(options.Value.GamesCollectionName);

            _users = mongoClient
                .GetDatabase(options.Value.DatabaseName)
                .GetCollection<UsersModel>(options.Value.UsersCollectionName);
        }

        public async Task<List<GameModel>> GetAllAsync()
        {
            var result = await _games.Find(_ => true).ToListAsync();
            return result;
        }

        public async Task<GameModel> GetByIdAsync(String Id)
        {
            var result = await _games.Find(e => e.Id == Id).FirstOrDefaultAsync();
            return result;
        }

        public double? GetTodayTotalPlayedTime(String UserId)
        {
            var result = _games.AsQueryable().Where(e => ( e.UserId == UserId && e.CreateAt >= DateTime.UtcNow.Date)).Sum(e => e.TotalPlayingTime);
            return result;
        }

        public Task<List<GameModel>> GetUserGameHistories(String UserId)
        {
            var result = _games.Find(e => e.UserId == UserId).ToListAsync();
            return result;
        }

        public List<LeaderboardDto> GetUsersLeaderboard()
        {
            var result = _users.Find(e=>true).ToList().AsQueryable()
                .Join(_games.AsQueryable(), a => a.Id, b => b.UserId, (a, b) => new { UserId = a.Id, UserScore = b.UserScore, OpponentScore = b.OpponentScore, Username = a.Username})
                .GroupBy(e => e.UserId, (Key,Group) => new LeaderboardDto
                {
                    TotalWinningGames = Group.Sum(e => e.UserScore > e.OpponentScore ? 1 : 0),
                    Id = Group.First().UserId,
                    Username = Group.First().Username
                })
                .OrderByDescending(e => e.TotalWinningGames).Take(10).ToList();
            return result;
        }

        public async Task<GameModel> CreateAsync(GameDto game)
        {
            var gameModel = new GameModel
            {
                TotalPlayingTime = game.TotalPlayingTime,
                OpponentScore = game.OpponentScore,
                Shots = game.Shots,
                UserId = game.UserId,
                UserScore = game.UserScore,
                CreateAt = DateTime.Now
            };
            await _games.InsertOneAsync(gameModel);
            return gameModel;
        }

        public async Task<String> DeleteAsync(String Id)
        {
            var result = await _games.DeleteOneAsync(e => e.Id == Id);
            return Id;
        }
    }
}

