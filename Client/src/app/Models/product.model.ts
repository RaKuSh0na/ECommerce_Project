// This interface defines the structure for a Product object
// It should match the ProductDto from your backend API
export interface Product {
    id: number; // Matches C# ProductDto.Id
    name: string;
    description: string;
    price: number;
    imageUrl: string; // Matches C# ImageUrl
    stock: number; // Matches C# Stock
    // Note: 'stock' is not included here as it's typically an internal backend detail
}
