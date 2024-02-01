<?php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PusherEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $token;
    public $event_name;


    public function __construct($event_name,$token)
    {
        $this->event_name = $event_name;
        $this->token = $token;
    }

    public function broadcastAs()
    {
        return $this->event_name;
    }

    public function broadcastOn()
    {
        return new Channel('pusher-channel');
    }
}
