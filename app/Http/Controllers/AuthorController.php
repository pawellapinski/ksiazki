<?php

namespace App\Http\Controllers;
use App\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function index()
    {
        return response()->json(Author::orderBy(request('column') ? request('column') : 'updated_at', request('direction') ? request('direction') : 'desc')->search(request('search'))->paginate());
    }

    public function search()
    {
        return response()->json(Author::search(request('search'))->paginate());
    }

    public function store(Request $request)
    {
        $input = $request->validate([
            'name' => 'required',
        ]);
        $author = new Author;
        $author->name = $input['name'];
        $author->save();
        return response()->json($author);
    }

    public function show(Author $author)
    {
        return response()->json($author);
    }

    public function update(Request $request, Author $author)
    {
        $input = $request->validate([
            'name' => 'required',
        ]);
        $author->name = $input['name'];
        $author->save();
        return response()->json($author);
    }

    public function destroy(Author $author)
    {
        return response()->json($author->delete());
    }
}
