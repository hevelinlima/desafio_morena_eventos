<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Events extends Base
{
    use HasFactory;

    protected $fillable = ['owner_id', 'name', 'description', 'address', 'complement', 'zipcode', 'number', 'city', 'state', 'starts_at', 'ends_at', 'max_sucscription', 'is_active'];

    public function owner() 
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
    public function guests()
    {
        return $this->hasMany(EventGuest::class);
    }
}
