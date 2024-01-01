<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\PersonalAccessToken;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function isStudent(Request $request)
    {
        $data = ($request->all());

        $validator = Validator::make($request->all(), [
            'TCKimlikNo' => 'required',
            'BabaAdi' => 'required|string',
            'DogumTarihi' => 'required'
        ]);
        $formatControl = preg_match('/^\d{4}-\d{2}-\d{2}$/', $request->DogumTarihi);

        if ($validator->fails() || !$formatControl) {
            $error = $validator->messages()->all();
            return response([
                "status" => false,
                "message" => $error,
                "data" => []
            ]);
        }
        $personalId = $data['TCKimlikNo'];
        $fatherName = $data['BabaAdi'];
        $birthDate = $data['DogumTarihi'];


        if ($personalId != "" && $fatherName != "" && $formatControl) {
            try {
                $response = $this->doCurl(json_encode($data), 'POST');


                if ($response->OgrenciNo) {

                    $userControl = User::where(['student_number' => $response->OgrenciNo])->first();

                    if ($userControl) {
                        return response([
                            "status" => false,
                            'message' => "alreadySaved",
                            "data" => [],
                        ]);
                    }

                    $user = User::create([
                        'name' => $response->Ad,
                        'surname' => $response->Soyad,
                        'student_number' => $response->OgrenciNo,
                    ]);

                    $token = md5(time() . rand(0, 999999));

                    PersonalAccessToken::create([
                        'user_id' => $user->getAttributes()['id'],
                        'token' => $token,
                        'abilities' => 'almostUser',
                    ]);

                    return response([
                        "status" => true,
                        'message' => "Student registration successful.",
                        "data" => [
                            "token" => $token
                        ]
                    ], 200);

                } else {

                    return response([
                        "status" => false,
                        "message" => "Student not found",
                        "data" => []
                    ], 400);

                }
            } catch (\Exception $e) {
                return response([
                    "status" => false,
                    "message" => $e->getMessage(),
                    "data" => []
                ], 400);
            }
        } else {
            return response([
                "status" => false,
                'message' => "format wrong",
                "data" => []
            ], 400);
        }

    }

    public function doCurl($data, $request)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $_ENV['CURLOPT_URL'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => $request,
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => array(
                'Accept: application/json, text/javascript, */*; q=0.01',
                'Content-Type: application/json',
                'Cookie: ' . $_ENV['COOKIE'],
                'X-CSRF-TOKEN: ' . $_ENV['X_CSRF_TOKEN'],
            ),
        ));

        $response = json_decode(curl_exec($curl));

        curl_close($curl);

        return $response;
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        Validator::make($credentials, [
            'email' => 'required|email|exists:users,email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($credentials)) {

            return response([
                "status" => false,
                'message' => "Unauthenticated",
                "data" => []
            ], 401);
        }
        /** @var User $user */
        $user = Auth::user();
        $userId = $user->getAttributes()['id'];
        $token = md5(time() . rand(0, 999999));

        $userRecord = PersonalAccessToken::where(['user_id' => $userId])->first();

        if ($userRecord) {
            PersonalAccessToken::where(['user_id' => $userId])->update([
                'token' => $token,
                'expires_at' => Carbon::now()->addMonths(3)
            ]);
        }


        return response([
            "status" => true,
            "message" => "User login has been completed successfully.",
            'data' => [
                "token" => $token
            ]]);
    }

    public function saveUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
        ]);

        if ($validator->fails()) {
            $error = $validator->messages()->all();
            return response([
                'status' => false,
                "message" => $error,
                'data' => []
            ]);
        }

        $token = $request->bearerToken();
        $data = $request->all();

        $hasToken = PersonalAccessToken::where(['token' => $token])->first();

        User::where(['id' => $hasToken->user_id])->update([
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        PersonalAccessToken::where(['user_id' => $hasToken->user_id])->update([
            'abilities' => 'user',
            'expires_at' => Carbon::now()->addMonths(3)
        ]);

        $user = User::where(['id' => $hasToken->user_id])->first();

        return response([
            "status" => true,
            "message" => "User registration successful.",
            'data' => [
                'user' => $user,
                'abilities' => 'user',
                'token' => $hasToken->token
            ],

        ]);


    }

    public function authenticate(Request $request)
    {
        $token = $request->bearerToken();

        $tokenControl = PersonalAccessToken::where(['token' => $token])->first();


        if ($tokenControl) {
            $tokenControl['counter'] += 1;
            PersonalAccessToken::where(['token' => $token])->update(['counter' => $tokenControl['counter']]);

            $user = User::where(['id' => $tokenControl['id']])->first();
           // if($tokenControl->expires_at > Carbon::now()){
                return response([
                    "status" => true,
                    "message" => "User authentication successful.",
                    'data' => [
                        'user' => $user,
                        'abilities' => $tokenControl['abilities'],
                        'token' => $tokenControl['token'],
                        'counter' => $tokenControl['counter'],]
                ], 200);
           /* }else{
                return response([
                    "status" => false,
                    "message" => "The user has expired",
                    'data' => []
                ], 400);
            }*/

        } else {

            return response([
                "status" => false,
                'message' => "Unauthenticated",
                "data" => [],
            ], 401);
        }
    }

    public function updateUserEmail(Request $request)
    {
        $data = $request->all();
        $token = $request->bearerToken();

        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255|unique:users',
        ]);

        if ($validator->fails()) {
            $error = $validator->messages()->all();
            return response([
                'status' => false,
                "message" => $error,
                'data' => []
            ]);
        }

        $hasToken = PersonalAccessToken::where(['token' => $token])->first();

        User::where(['id' => $hasToken->user_id])->update([
            'email' => $data['email'],
        ]);

        $user = User::where(['id' => $hasToken->user_id])->first();

        return response([
            "status" => true,
            "message" => "User email update successful.",
            'data' => [
                'user' => $user,
            ],

        ]);
    }


}
