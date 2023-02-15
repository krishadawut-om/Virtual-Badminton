using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using virtual_badminton.DTOs;
using virtual_badminton.Models;
using virtual_badminton.Services;

namespace virtual_badminton.Controllers;

[ApiController]
[Route("[controller]")]
public class GamesController : ControllerBase
{

    private readonly GameService _gamesService;

    public GamesController(GameService GamesService)
    {
        this._gamesService = GamesService;
    }

    //[Authorize]
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var Result = await _gamesService.GetAllAsync();
        return Ok(Result);
    }

    [HttpGet("{Id}")]
    public async Task<IActionResult> GetByIdAsync([FromRoute] String Id)
    {
        var Result = await _gamesService.GetByIdAsync(Id);
        return Ok(Result);
    }

    [HttpGet("{Id}/totalPlayingTime")]
    public IActionResult GetTodayTotalPlayedTime([FromRoute] String Id)
    {
        var Result = _gamesService.GetTodayTotalPlayedTime(Id);
        return Ok(Result );
    }

    [HttpGet("{Id}/gameHistories")]
    public async Task<IActionResult> GetUserGameHistoriesAsync([FromRoute] String Id)
    {
        var Result = await _gamesService.GetUserGameHistories(Id);
        return Ok(Result);
    }

    [HttpGet("leaderboard")]
    public IActionResult GetUsersLeaderboard()
    {
        var Result = _gamesService.GetUsersLeaderboard();
        return Ok(Result);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] GameDto game)
    {
        var Result = await _gamesService.CreateAsync(game);
        return Created("", Result);
    }

    [HttpDelete("{Id}")]
    public async Task<IActionResult> Delete([FromRoute] String Id)
    {
        var Result = await _gamesService.DeleteAsync(Id);
        return Ok(Result);
    }
}



