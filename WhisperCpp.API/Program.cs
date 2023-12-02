using WhisperCpp.API.Services;

var builder = WebApplication.CreateBuilder(args);

var clientOriginUrl = builder.Configuration["ClientOriginUrl"];

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

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("defaultPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();