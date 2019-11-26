<?php

namespace App\Http\Controllers;
use App\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        return response()->json(Book::orderBy(request('column') ? request('column') : 'updated_at', request('direction') ? request('direction') : 'desc')
            ->search(request('search'))
            ->with( 'category', 'author')
            ->paginate());
    }

    public function search()
    {
        return response()->json(Book::search(request('search'))->paginate());
    }

    public function store(Request $request)
    {
        $input = $request->validate([
            'isbn' => 'required|unique:books,isbn',
            'title' => 'required',
            'date_of_publication' => 'required',
            'category_id' => 'required|exists:categories,id',
            'author_id' => 'required|exists:authors,id',
        ]);

        $book = new Book;
        $book->isbn = $input['isbn'];
        $book->title = $input['title'];
        $book->date_of_publication = $input['date_of_publication'];
        $book->category_id = $input['category_id'];
        $book->author_id = $input['author_id'];
        $book->save();
        if ($request->file('file')) {
            $input['file'] = $request->file('file');
            $name = time() . $input['file']->getClientOriginalName();
            $input['file']->move('upload', $name);
            $book->photo()->create(['url' => $name]);
        }

        return response()->json($book);
    }

    public function show(Book $book)
    {
        return response()->json(Book::whereId($book->id)->with('photo','category', 'author')->first());
    }
    public function upload(Request $request){
        dd($request->file('file'));
    }

    public function update(Request $request, Book $book)
    {
        $input = $request->validate([
            'isbn' => 'required|unique:books,isbn,' . $book->id,
            'title' => 'required',
            'date_of_publication' => 'required',
            'category_id' => 'required|exists:categories,id',
            'author_id' => 'required|exists:authors,id',
        ]);
        $book->isbn = $input['isbn'];
        $book->title = $input['title'];
        $book->date_of_publication = $input['date_of_publication'];
        $book->category_id = $input['category_id'];
        $book->author_id = $input['author_id'];
        $book->save();
        if ($request->file('file')) {

            $input['file'] = $request->file('file');
            $name = time() . $input['file']->getClientOriginalName();
            $input['file']->move('upload', $name);
            if($request->photo['url']) {
                if (file_exists(public_path() . '/upload/' . $request->photo['url'])) {
                    unlink(public_path() . '/upload/' . $request->photo['url']);
                }
                $book->photo()->update(['url' => $name]);
            }else{
                $book->photo()->create(['url' => $name]);

            }

        }

        return response()->json($book);
    }

    public function destroy(Book $book)
    {
        return response()->json($book->delete());
    }

}
