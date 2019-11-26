<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;
class Author extends Model
{
    use SearchableTrait;
    protected $searchable = [
        'columns' => [
            'authors.name' => 1,
            ]
        ];
    protected $fillable = ['name'];
}
