<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index() 
    {
        // Fetches every row from the 'products' table
        $products = Product::paginate(10);

        // Return them as a JSON array
        return response()->json([
            'total_count' => $products->count(),
            'products' => $products
          ], 200);
    }    

    public function store(Request $request)
    {
        // 1. Validate the incoming data
        $validated = $request->validate([
            'name' => 'required|string',
            'stock_quantity' => 'required|integer',
            'price' => 'required|numeric',
            'category' => 'required|string',
        ]);

        // 2. Create the product in the DB
        $product = Product::create($validated);

        // 3. Return a JSON response
        return response()->json([
            'message' => 'Product added to DMart successfully!',
            'data' => $product
        ], 201);
    }

    public function show(Product $product) {
        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            'message' => 'Product moved to trash (Soft Deleted).'
        ], 200);
    }
}
?>