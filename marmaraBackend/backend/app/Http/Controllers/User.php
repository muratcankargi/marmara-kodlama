<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\Declaration;
use App\Models\PersonalAccessToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Mockery\Exception;

class User extends Controller
{

    public function isStudent(Request $request)
    {
        $data = ($request->all());

        $personalId = $data['TCKimlikNo'];
        $fatherName = $data['BabaAdi'];
        $birthDate = $data['DogumTarihi'];

        $formatControl = preg_match('/^\d{4}-\d{2}-\d{2}$/', $birthDate);

        if ($personalId != "" && $fatherName != "" && $formatControl) {
            try {
                $response = $this->doCurl(json_encode($data), 'POST');


                if ($response->OgrenciNo) {

                    $userControl = \App\Models\User::where(['student_number' => $response->OgrenciNo])->first();

                    if ($userControl) {
                        return response([
                            'message' => 'alreadySaved'
                        ]);
                    }

                    $user = \App\Models\User::create([
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
                        'message' => $token
                    ]);

                } else {

                    return response([
                        'message' => false
                    ]);

                }
            } catch (\Exception $e) {
                return response([
                    'message' => false
                ]);
            }
        } else {
            return response([
                'message' => false
            ]);
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
                'message' => false
            ]);
        }
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $userId = $user->getAttributes()['id'];
        $token = md5(time() . rand(0, 999999));

        $userRecord = PersonalAccessToken::where(['user_id' => $userId])->first();

        if ($userRecord) {
            PersonalAccessToken::where(['user_id' => $userId])->update(['token' => $token]);
        }


        return response([
            'message' => $token]);
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
                'message' => false,
                'error' => $error
            ]);
        }

        $data = $request->all();

        $hasToken = PersonalAccessToken::where(['token' => $data['token']])->first();

        if ($hasToken) {
            \App\Models\User::where(['id' => $hasToken->user_id])->update([
                'email' => $data['email'],
                'password' => bcrypt($data['password'])
            ]);

            PersonalAccessToken::where(['user_id' => $hasToken->user_id])->update([
                'abilities' => 'user'
            ]);

            $user = \App\Models\User::where(['id' => $hasToken->user_id])->first();

            return response([
                'message' => [
                    'user' => $user,
                    'abilities' => 'user',
                    'token' => $hasToken->token
                ],
            ]);

        } else {
            return response([
                'message' => false,
            ]);
        }


    }

    public function authenticate(Request $request)
    {
        $token = $request->all()['token'];
        $tokenControl = PersonalAccessToken::where(['token' => $token])->first();


        if ($tokenControl) {
            $tokenControl['counter'] += 1;
            PersonalAccessToken::where(['token' => $token])->update(['counter' => $tokenControl['counter']]);

            $user = \App\Models\User::where(['id' => $tokenControl['id']])->first();
            return response([
                'message' => ['user' => $user,
                    'abilities' => $tokenControl['abilities'],
                    'token' => $tokenControl['token'],
                    'counter' => $tokenControl['counter'],]
            ]);
        } else {

            return response([
                'message' => [
                    'user' => false,
                ]]);
        }
    }

    public function createDeclaration(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:200',
            'description' => 'required|string|max:2000',
            'tags' => 'required|string',
            'image_source' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response([
                'message' => [
                    'status' => false,
                    'fails' => $validator->messages()->all()
                ]]);
        } else {

            $result = $this->authenticate($request);
            $user = json_decode(json_encode($result), true)['original']['message']['user'];
            if ($user) {
                Declaration::create(['user_id' => $user['id'],
                    'title' => $request->title,
                    'description' => $request->description,
                    'tags' => $request->tags,
                    'visibility' => boolval($request->visibility),
                    'image_source' => $request->image_source,
                ]);

                return response([
                    'message' => [
                        'status' => true
                    ]]);
            } else {
                return response([
                    'message' => [
                        'status' => 'notAuthenticated'
                    ]]);
            }
        }
    }
}
