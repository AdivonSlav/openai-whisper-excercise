using Microsoft.AspNetCore.Mvc;
using WhisperCpp.API.Models;
using WhisperCpp.API.Services;

namespace WhisperCpp.API.Controllers;

[ApiController]
[Route("whisper")]
public class WhisperCppController
{
    private IWhisperService WhisperService { get; set; }

    public WhisperCppController(IWhisperService whisperService)
    {
        WhisperService = whisperService;
    }

    [HttpPost("transcribe")]
    public async Task<ActionResult<TranscriptionDto>> Transcribe(IFormFile file)
    {
        return await WhisperService.Transcribe(file);
    }
}