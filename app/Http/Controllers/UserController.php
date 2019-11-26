<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::orderBy(request('column') ? request('column') : 'updated_at', request('direction') ? request('direction') : 'desc')
            ->search(request('search'))
            ->paginate());
    }
    public function search()
    {
        return response()->json(User::search(request('search'))->paginate());
    }
    public function store(Request $request)
    {
        $input = $this->validate($request, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'string|min:6',
            'password_confirmation' => 'same:password'
        ]);
        $user = new User;
        if (trim($request->password) == '') {
            $input = $request->except('password');
        } else {
            $input['password'] = bcrypt($request->password);
            $user->password = $input['password'];
        }
        $user->name = $input['name'];
        $user->email = $input['email'];
        $user->save();
        return response()->json($user, 201);
    }
    public function show(User $user)
    {
        return response()->json($user);
    }
    public function update(Request $request, User $user)
    {
        $input = $this->validate($request, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'string|min:6',
            'password_confirmation' => 'same:password'
        ]);
        if (trim($request->password) == '') {
            $input = $request->except('password');
        } else {
            $input['password'] = bcrypt($request->password);
            $user->password = $input['password'];
        }
        $user->name = $input['name'];
        $user->email = $input['email'];
        $user->save();
        return response()->json($user, 201);
    }
    public function destroy(User $user)
    {
        return response()->json($user->delete());
    }
}
