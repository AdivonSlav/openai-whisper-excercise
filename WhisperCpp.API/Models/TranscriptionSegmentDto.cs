namespace WhisperCpp.API.Models;

public class TranscriptionSegmentDto
{
    public TimeSpan Start { get; set; }
    public TimeSpan End { get; set; }
    public string Text { get; set; }
}