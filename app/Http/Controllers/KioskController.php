<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class KioskController extends Controller
{
    public function getPlayerBalance(string $player_name): JsonResponse
    {
        $end_point_url = env('KIOSK_URL', '127.0.0.1');
        $end_point_path = 'player/info/playername';
        $end_point_entity_key = env('KIOSK_ENTITY_KEY', null);

        $end_point = "$end_point_url/$end_point_path/$player_name";

        $my_cert_path = env('KIOSK_CERT_PATH', null);
        $my_cert_key_path = env('KIOSK_CERT_KEY_PATH', null);
        $passphrase = env('KIOSK_PASSPHRASE', null);

        $headers = [
            'X_ENTITY_KEY' => $end_point_entity_key
        ];

        $certificate = [
            'cert' => [$my_cert_path, $passphrase],
            'ssl_key' => $my_cert_key_path,
        ];

        $response = Http::withHeaders($headers)->withOptions($certificate)->post($end_point, []);

        return response()->json([
            'balance' => $response->json()['result']['BALANCE']
        ]);
    }
}
