<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TagController extends Controller
{
    public function createTag(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:tags|max:100',
        ]);

        if ($validator->fails()) {
            return response([
                "status" => false,
                'message' => $validator->messages()->all(),
                "data" => [],
            ], 400);
        } else {
            try {


                $tag = Tag::create(['name' => $request->name]);

                if ($tag) {
                    return response([
                        "status" => true,
                        'message' => "tag created",
                        "data" => [],
                    ], 200);
                }
            } catch (\Exception $e) {
                return response([
                    "status" => false,
                    'message' => $e->getMessage(),
                    "data" => [],
                ], 400);
            }
        }
    }

    public function getTags()
    {
        try {
            $tags = json_decode(Tag::all());
            foreach ($tags as $tag) {
                $tag->created_at = Carbon::parse($tag->created_at)->format('d/m/Y');
                $tag->updated_at = Carbon::parse($tag->updated_at)->format('d/m/Y');
            }
            return response([
                "status" => true,
                'message' => "tags get success",
                "data" => $tags,
            ], 200);
        } catch (\Exception $e) {
            return response([
                "status" => false,
                'message' => $e->getMessage(),
                "data" => [],
            ], 400);
        }
    }

    public function updateTag(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|unique:tags|string|max:100',
            ]);

            if ($validator->fails()) {
                return response([
                    "status" => false,
                    'message' => $validator->messages()->all(),
                    "data" => [],
                ], 400);
            }

            $UserController = new UserController();
            $result = $UserController->authenticate($request);

            $user = json_decode(json_encode($result), true)['original']['data']['user'];
            if (!$user) {
                return response([
                    "status" => false,
                    'message' => "Unauthenticated",
                    "data" => [],
                ], 401);

            }

            $tag = Tag::find($id);

            if (!$tag) {
                return response([
                    "status" => false,
                    'message' => "noTag",
                    "data" => [],
                ], 400);
            }

            $tag->name = $request->name;
            $tag->save();

            return response([
                "status" => true,
                'message' => "tag updated",
                "data" => [],
            ], 200);
        } catch (\Exception $e) {
            return response([
                "status" => false,
                'message' => $e->getMessage(),
                "data" => [],
            ], 400);
        }
    }

    public function deleteTag($id)
    {
        try {
            $tag = Tag::findOrFail($id);
            $tag->delete();

            return response([
                "status" => true,
                'message' => "tag deleted",
                "data" => [],
            ], 200);
        } catch (\Exception $e) {
            return response([
                "status" => false,
                'message' => $e->getMessage(),
                "data" => [],
            ], 400);
        }
    }

}
