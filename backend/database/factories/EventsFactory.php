<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Events>
 */
class EventsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = \App\Models\User::first();

        return [
            'owner_id' => $user->id, 
            'uuid_code' => Str::uuid(),
            'name' => $this->faker->sentence(3), 
            'description' => $this->faker->paragraph(), 
            'address' => $this->faker->streetAddress(), 
            'complement' => $this->faker->secondaryAddress(), 
            'zipcode' => $this->faker->postcode(), 
            'number' => $this->faker->buildingNumber(), 
            'city' => $this->faker->city(), 
            'state' => $this->faker->stateAbbr(), 
            'starts_at' => $this->faker->dateTimeBetween('now', '+1 week'), 
            'ends_at' => $this->faker->dateTimeBetween('+3 week', '+4 weeks'), 
            'max_subscription' => $this->faker->numberBetween(10, 100), 
            'is_active' => $this->faker->boolean(),
        ];
    }
}
