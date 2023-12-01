using Microsoft.AspNetCore.Mvc;
using WhisperCpp.API.Models;

namespace WhisperCpp.API.Services;

public interface IWhisperService
{
    public Task<ActionResult<TranscriptionDto>> Transcribe(IFormFile file);
}