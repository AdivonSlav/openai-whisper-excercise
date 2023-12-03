# .NET 6 Runtime on Ubuntu 22.04
FROM mcr.microsoft.com/dotnet/aspnet:6.0-jammy-amd64 AS base
WORKDIR /app
EXPOSE 80

ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+80
ENV WHISPER_API_HttpsRedirect=false

# Build stage with .NET 6 SDK on Ubuntu 22.04
FROM mcr.microsoft.com/dotnet/sdk:6.0-jammy-amd64 AS build
WORKDIR /src
COPY . .
RUN dotnet restore "WhisperCpp.API.csproj"
RUN dotnet build "WhisperCpp.API.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "WhisperCpp.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Final stage
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT [ "dotnet", "WhisperCpp.API.dll" ]


