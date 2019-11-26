<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;
class Book extends Model
{
    use SearchableTrait;
    protected $searchable = [
        'columns' => [
            'books.isbn' => 1,
            'books.title' => 2,
            'books.date_of_publication' => 3,
            'categories.name' => 4,
            'authors.name' => 5
            ],
        'joins' => [
            'categories' => ['books.category_id', 'categories.id'],
            'authors' => ['books.author_id', 'authors.id'],
            ],
        ];
    protected $fillable = ['isbn', 'title', 'date_of_publication', 'category_id', 'author_id'];
    public function photo()
    {
        return $this->morphOne(Image::class, 'subject');
    }
    public function author()
    {
        return $this->belongsTo(Author::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
