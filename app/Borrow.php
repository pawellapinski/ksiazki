<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;
class Borrow extends Model
{
    use SearchableTrait;
    protected $searchable = [
        'columns' => [
            'borrows.date_issued' => 4,
            'borrows.date_due_for_return' => 2,
            'borrows.date_return' => 3,
            'books.title' => 1,
            'users.name' => 5
            ],
        'joins' => [
            'books' => ['borrows.book_id', 'books.id'],
            'users' => ['borrows.user_id', 'users.id'],
            ],
        ];
    protected $fillable = ['date_issued', 'date_due_for_return', 'date_return', 'book_id', 'user_id'];
    public function book()
    {
        return $this->belongsTo(Book::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
