<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;
class Category extends Model
{
    use SearchableTrait;
    protected $searchable = [
        'columns' => [
            'categories.name' => 1,
            ]
        ];
    protected $fillable = ['name'];
}
