<?php

namespace App\Http\Middleware;

use App\Http\Controllers\UserController;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class auth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = new UserController();
        $result = $user->authenticate($request);

        if($result->original['status']){
            return $next($request);

        }else{
            return response([
                "status" => false,
                'message' => "notAuthenticated",
                "data" => []
            ], 401);
        }
    }
}
