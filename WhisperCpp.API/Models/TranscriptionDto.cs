namespace WhisperCpp.API.Models;

public class TranscriptionDto
{
    public List<TranscriptionSegmentDto> Segments { get; set; } = new List<TranscriptionSegmentDto>();
}