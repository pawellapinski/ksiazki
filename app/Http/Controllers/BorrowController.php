<?php

namespace App\Http\Controllers;
use App\Borrow;
use Illuminate\Http\Request;

class BorrowController extends Controller
{
    public function index()
    {
        return response()->json(Borrow::orderBy(request('column') ? request('column') : 'updated_at', request('direction') ? request('direction') : 'desc')
            ->search(request('search'))
            ->with('book', 'user')
            ->paginate());
    }
    public function store(Request $request)
    {
        $input = $request->validate([
            'book_id' => 'required|exists:books,id',
            'user_id' => 'required|exists:users,id',
            'date_issued' => 'required',
            'date_due_for_return' => 'required',
        ]);
        $borrow = new Borrow;
        $borrow->book_id = $input['book_id'];
        $borrow->user_id = $input['user_id'];
        $borrow->date_issued = $input['date_issued'];
        $borrow->date_due_for_return = $input['date_due_for_return'];
        $borrow->save();
        return response()->json($borrow);
    }
    public function show(Borrow $borrow)
    {
        return response()->json(Borrow::whereId($borrow->id)->with('book', 'user')->first());
    }
    public function update(Request $request, Borrow $borrow)
    {
        $input = $request->validate([
            'book_id' => 'required|exists:books,id',
            'user_id' => 'required|exists:users,id',
            'date_issued' => 'required',
            'date_due_for_return' => 'required',
        ]);
        $borrow->book_id = $input['book_id'];
        $borrow->user_id = $input['user_id'];
        $borrow->date_issued = $input['date_issued'];
        $borrow->date_due_for_return = $input['date_due_for_return'];
        $borrow->save();
        return response()->json($borrow);
    }
    public function destroy(Borrow $borrow)
    {
        return response()->json($borrow->delete());
    }
}
