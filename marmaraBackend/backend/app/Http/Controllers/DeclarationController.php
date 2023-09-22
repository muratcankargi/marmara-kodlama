<?php

namespace App\Http\Controllers;

use App\Models\Declaration;
use App\Models\Tag;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DeclarationController extends Controller
{
    public function createDeclaration(Request $request)
    {
        //visibility admin kontrolünde olabilir
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:200',
            'description' => 'required|string|max:2000',
            'tags' => 'required|array',
            'type' => 'required',
            'image_source' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response([
                'message' => [
                    'status' => false,
                    'fails' => $validator->messages()->all()
                ]]);
        } else {
            foreach ($request->tags as $tag) {
                if (!Tag::where('name', $tag)->first()) {
                    //eğer tag yoksa oluşturulabilir
                    //Tag::create('name',$tag);
                    return response([
                        'message' => [
                            'status' => false,
                            'tag' => $tag,
                        ]]);
                }
            }

            $UserController = new UserController();
            $result = $UserController->authenticate($request);

            $user = json_decode(json_encode($result), true)['original']['message']['user'];
            if ($user) {
                Declaration::create(['user_id' => $user['id'],
                    'title' => $request->title,
                    'description' => $request->description,
                    'tags' => json_encode($request->tags),
                    'visibility' => boolval($request->visibility),
                    'type' => $request->type,
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

    public function getDeclaration()
    {
        $declarations = json_decode(Declaration::all());
        foreach ($declarations as $declaration) {
            $user = json_decode(User::where(['id' => $declaration->user_id])->first());

            $declaration->created_at = Carbon::parse($declaration->created_at)->format('d/m/Y');
            $declaration->updated_at = Carbon::parse($declaration->updated_at)->format('d/m/Y');
            $declaration->tags = json_decode($declaration->tags);
            $declaration->user = $user->name . ' ' . $user->surname;
        }
        return response([
            'message' => $declarations
        ]);
    }

    public function updateDeclaration(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:200',
                'description' => 'required|string|max:2000',
                'tags' => 'required|array',
                'image_source' => 'nullable|string',
                'visibility' => 'required|boolean', // Eğer visibility güncellenecekse
            ]);

            if ($validator->fails()) {
                return response([
                    'message' => [
                        'status' => false,
                        'fails' => $validator->messages()->all()
                    ]]);
            }

            $UserController = new UserController();
            $result = $UserController->authenticate($request);

            $user = json_decode(json_encode($result), true)['original']['message']['user'];
            if (!$user) {
                return response([
                    'message' => [
                        'status' => 'notAuthenticated'
                    ]]);
            }

            $declaration = Declaration::find($id);

            if (!$declaration) {
                throw new \Exception('Declaration not found.');
            }

            foreach ($request->tags as $tag) {
                if (!Tag::where('name', $tag)->first()) {
                    //eğer tag yoksa oluşturulabilir
                    //Tag::create('name',$tag);
                    return response([
                        'message' => [
                            'status' => false,
                            'tag' => $tag,
                        ]]);
                }
            }

            $declaration->title = $request->title;
            $declaration->description = $request->description;
            $declaration->tags = json_encode($request->tags);
            $declaration->image_source = $request->image_source;
            $declaration->visibility = boolval($request->visibility);
            $declaration->type = $request->type;
            $declaration->save();

            return response([
                'message' => [
                    'status' => true
                ]
            ]);
        } catch (\Exception $e) {
            return response([
                'message' => [
                    'status' => 'error',
                    'error_message' => $e->getMessage()
                ]
            ]);
        }
    }

    public function deleteDeclaration($id)
    {
        try {
            $declaration = Declaration::findOrFail($id);
            $declaration->delete();

            return response(['message' => 'İlan başarıyla silindi.']);
        } catch (\Exception $e) {
            return response([
                'message' => 'İlan silinemedi.',
                'error' => $e->getMessage()]);
        }
    }
}
