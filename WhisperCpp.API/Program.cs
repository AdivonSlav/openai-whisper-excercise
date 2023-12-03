using WhisperCpp.API.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddEnvironmentVariables(prefix: "WHISPER_API_");

var clientOriginUrl = builder.Configuration["ClientOriginUrl"];
var httpRedirect = builder.Configuration["HttpsRedirect"];
var swaggerEnabled = builder.Configuration["Swagger:Enabled"];

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "defaultPolicy", policy =>
    {
        policy.WithOrigins(clientOriginUrl).AllowAnyHeader().AllowAnyMethod();
    });
});
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<IWhisperService, WhisperService>();

var app = builder.Build();
var logger = app.Services.GetService<ILogger<Program>>();

if (logger == null)
{
    return 1;
}

if (bool.TryParse(swaggerEnabled, out var shouldEnableSwagger))
{
    if (shouldEnableSwagger)
    {
        app.UseSwagger();
        app.UseSwaggerUI();
        logger.LogInformation("Enabling Swagger");
    }
}

if (bool.TryParse(httpRedirect, out var shouldRedirect))
{
    if (shouldRedirect)
    {
        app.UseHttpsRedirection();
        logger.LogInformation("Enabling HTTPS redirection");
    }
}

app.UseCors("defaultPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();

return 0;