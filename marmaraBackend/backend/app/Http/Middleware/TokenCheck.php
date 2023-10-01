<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TokenCheck
{
    public function handle(Request $request, Closure $next): Response
    {
        if(!auth()->check()){
            return response([
                "status" => false,
                "message" => "Yetkilendirme başarısız.",
                "data" => [],
            ], 401);
        }
        return $next($request);
    }
}
