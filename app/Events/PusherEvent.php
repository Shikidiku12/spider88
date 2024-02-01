<?php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PusherEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $access_token;
    public $channel_name;
    public $event_name;


    public function __construct($channel_name,$event_name,$access_token)
    {
        $this->channel_name = $channel_name;
        $this->event_name = $event_name;
        $this->access_token = $access_token;
    }

    public function broadcastAs()
    {
        return $this->event_name;
    }

    public function broadcastOn()
    {
        return new Channel($this->channel_name);
    }
}
