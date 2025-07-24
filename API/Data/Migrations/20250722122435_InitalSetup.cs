using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitalSetup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false),
                    ImageUrl = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false),
                    Stock = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "BLOB", nullable: true),
                    PasswordSalt = table.Column<byte[]>(type: "BLOB", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Role = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "ImageUrl", "Name", "Price", "Stock" },
                values: new object[,]
                {
                    { 1, "High-fidelity gaming headset with surround sound. Immerse yourself in the game with crystal-clear audio and comfortable earcups. Features include noise-cancelling microphone and customizable RGB lighting.", "https://placehold.co/400x300/3f3f3f/ffffff?text=Headset", "Gaming Headset", 79.99m, 50 },
                    { 2, "RGB mechanical keyboard with tactile switches. Experience responsive and satisfying keystrokes. Built with durable materials and programmable macros for ultimate gaming performance.", "https://placehold.co/400x300/3f3f3f/ffffff?text=Keyboard", "Mechanical Keyboard", 129.99m, 30 },
                    { 3, "Ergonomic wireless mouse with customizable DPI. Enjoy lag-free gaming with precise tracking and a comfortable grip. Long-lasting battery life and multiple programmable buttons.", "https://placehold.co/400x300/3f3f3f/ffffff?text=Mouse", "Wireless Mouse", 49.99m, 100 },
                    { 4, "27-inch curved gaming monitor with 144Hz refresh rate. Immerse yourself in stunning visuals and smooth gameplay. High resolution and wide viewing angles for an expansive experience.", "https://placehold.co/400x300/3f3f3f/ffffff?text=Monitor", "Curved Gaming Monitor", 299.99m, 20 },
                    { 5, "Full HD 1080p webcam with autofocus. Perfect for streaming, video calls, and online meetings. Built-in microphone with noise reduction.", "https://placehold.co/400x300/3f3f3f/ffffff?text=Webcam", "Webcam 1080p", 59.99m, 75 },
                    { 6, "Ergonomic gaming chair with lumbar support. Designed for long gaming sessions, providing maximum comfort and adjustability. High-quality PU leather and robust construction.", "https://placehold.co/400x300/3f3f3f/ffffff?text=Chair", "Gaming Chair", 199.99m, 15 },
                    { 7, "Portable 1TB SSD for blazing-fast data transfer. Ideal for gamers and content creators needing extra storage and speed. Compact and durable design.", "https://placehold.co/400x300/3f3f3f/ffffff?text=SSD", "External SSD 1TB", 99.99m, 60 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
