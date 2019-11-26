<?php

namespace App\Http\Controllers;
use App\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json(Category::orderBy(request('column') ? request('column') : 'updated_at', request('direction') ? request('direction') : 'desc')->search(request('search'))->paginate());
    }

    public function search()
    {
        return response()->json(Category::search(request('search'))->paginate());
    }

    public function store(Request $request)
    {
        $input = $request->validate([
            'name' => 'required',
        ]);
        $category = new Category;
        $category->name = $input['name'];
        $category->save();
        return response()->json($category);
    }

    public function show(Category $category)
    {
        return response()->json($category);
    }

    public function update(Request $request, Category $category)
    {
        $input = $request->validate([
            'name' => 'required',
        ]);
        $category->name = $input['name'];
        $category->save();
        return response()->json($category);
    }

    public function destroy(Category $category)
    {
        return response()->json($category->delete());
    }
}
