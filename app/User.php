<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
use Nicolaslopezj\Searchable\SearchableTrait;
class User extends Authenticatable
{
    use Notifiable,HasApiTokens, SearchableTrait;
    protected $searchable = [
        'columns' => [
            'users.name' => 1,
            'users.email' => 2
            ]
        ];
    public function subject()
    {
        return $this->morphOne(Image::class, 'subject');
    }
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
}
