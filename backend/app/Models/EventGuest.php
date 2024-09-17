<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventGuest extends Base
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['user_id', 'event_id'];

    protected $table = 'eventguests';

    public function user() 
    {
        return $this->belongsTo(User::class);
    }

    public function event(){
        return $this->belongsTo(Events::class, 'event_id');
    }
}
