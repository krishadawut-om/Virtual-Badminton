using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using virtual_badminton.DTOs;
using virtual_badminton.Models;
using virtual_badminton.Services;

namespace virtual_badminton.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{

    private readonly UsersService _usersService;

    public UsersController(UsersService UsersService)
    {
        this._usersService = UsersService;
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var Result = await _usersService.GetAllAsync();
        return Ok(Result);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] UserDto user)
    {
        var CheckExist = await _usersService.CheckExistAsync(user.Username);
        if (CheckExist) {
            return BadRequest();
        }
        var Result = await _usersService.CreateAsync(user);
        return Created("",Result);
    }

    [HttpDelete("{Id}")]
    public async Task<IActionResult> Delete([FromRoute] String Id)
    {
        var Result = await _usersService.DeleteAsync(Id);
        return Ok(Result);
    }

    [HttpGet("Authenticate")]
    public async Task<IActionResult> Authenticate([FromQuery] UserDto data)
    {
        var CheckExist = await _usersService.CheckExistAsync(data.Username);
        if (!CheckExist)
        {
            return Unauthorized();
        }
        var Result = await _usersService.AuthenticateAsync(data);
        return Result!=null?Ok(Result):BadRequest();
    }
}



