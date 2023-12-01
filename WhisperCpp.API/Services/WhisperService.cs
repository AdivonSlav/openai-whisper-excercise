using Microsoft.AspNetCore.Mvc;
using Whisper.net;
using Whisper.net.Ggml;
using WhisperCpp.API.Models;

namespace WhisperCpp.API.Services;

public class WhisperService : IWhisperService
{
    private string _modelName = "ggml-base.en";

    private async Task<bool> DownloadModel()
    {
        if (File.Exists(_modelName)) return true;

        try
        {
            await using var modelStream = await WhisperGgmlDownloader.GetGgmlModelAsync(GgmlType.Base);
            await using var fileWriter = File.OpenWrite(_modelName);
            await modelStream.CopyToAsync(fileWriter);
        }
        catch (Exception e)
        {
            return false;
        }

        return true;
    }

    public async Task<ActionResult<TranscriptionDto>> Transcribe(IFormFile file)
    {
        if (!await DownloadModel())
        {
            return new NotFoundObjectResult("Could not download the requested machine model!");
        }
        
        using var whisperFactory = WhisperFactory.FromPath(_modelName);

        await using var processor = whisperFactory.CreateBuilder()
            .WithLanguage("auto")
            .Build();

        await using var fileStream = file.OpenReadStream();
        var transcription = new TranscriptionDto();
        
        await foreach(var result in processor.ProcessAsync(fileStream))
        {
            transcription.Segments.Add(new TranscriptionSegmentDto()
            {
                Start = result.Start,
                End = result.End,
                Text = result.Text
            });
        }

        return new OkObjectResult(transcription);
    }
}