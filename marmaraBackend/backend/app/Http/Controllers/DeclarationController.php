<?php

namespace App\Http\Controllers;

use App\Models\Declaration;
use App\Models\Tag;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
                "status" => false,
                'message' => $validator->messages()->all(),
                "data" => []
            ], 400);
        } else {
            foreach ($request->tags as $tag) {
                if (!Tag::where('name', $tag)->first()) {
                    return response([
                        "status" => false,
                        'message' => $tag . " not found",
                        "data" => []
                    ], 400);
                }
            }

            $UserController = new UserController();
            $result = $UserController->authenticate($request);

            $user = json_decode(json_encode($result), true)['original']['data']['user'];
            if ($user) {
                $declaration = Declaration::create(['user_id' => $user['id'],
                    'title' => $request->title,
                    'description' => $request->description,
                    'tags' => json_encode($request->tags),
                    'visibility' => boolval($request->visibility),
                    'type' => $request->type,
                    'image_source' => $request->image_source,
                ]);

                return response([
                    "status" => true,
                    'message' => "declaration create successfull",
                    "data" => $declaration
                ], 200);
            } else {
                return response([
                    "status" => false,
                    'message' => 'notAuthenticated',
                    "data" => []
                ], 401);
            }
        }
    }

    public function getDeclarations()
    {
        $declarations = DB::select("SELECT * FROM declarations");

        foreach ($declarations as $declaration) {
            $user = json_decode(User::where(['id' => $declaration->user_id])->first());

            $declaration->created_at = Carbon::parse($declaration->created_at)->format('d/m/Y');
            $declaration->updated_at = Carbon::parse($declaration->updated_at)->format('d/m/Y');
            $declaration->tags = json_decode($declaration->tags);
            $declaration->user = $user->name . ' ' . $user->surname;
        }
        return response([
            "status" => true,
            'message' => "declarations founds",
            "data" => $declarations
        ], 200);
    }

    public function getDeclaration($id)
    {
        $declaration = json_decode(Declaration::where('id', $id)->first());


        if ($declaration) {
            $user = json_decode(User::where(['id' => $declaration->user_id])->first());

            $declaration->created_at = Carbon::parse($declaration->created_at)->format('d/m/Y');
            $declaration->updated_at = Carbon::parse($declaration->updated_at)->format('d/m/Y');
            $declaration->tags = json_decode($declaration->tags);
            $declaration->user = $user->name . ' ' . $user->surname;

            return response([
                'status' => true,
                'message' => 'declaration found',
                'data' => $declaration
            ], 200);
        } else {
            return response([
                'status' => false,
                'message' => 'declaration not found',
                'data' => []
            ], 400);
        }

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
                    "status" => false,
                    'message' => $validator->messages()->all(),
                    "data" => []
                ], 400);
            }

            $UserController = new UserController();
            $result = $UserController->authenticate($request);

            $user = json_decode(json_encode($result), true)['original']['data']['user'];
            if (!$user) {
                return response([
                    "status" => false,
                    'message' => "notAuthenticated",
                    "data" => []
                ], 401);
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
                        "status" => false,
                        'message' => $tag . " not found",
                        "data" => []
                    ], 400);
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
                "status" => true,
                'message' => "declaration update successfull",
                "data" => []
            ], 200);
        } catch (\Exception $e) {
            return response([
                "status" => false,
                'message' => $e->getMessage(),
                "data" => []
            ], 400);
        }
    }

    public function deleteDeclaration($id)
    {
        try {
            $declaration = Declaration::findOrFail($id);
            $declaration->delete();

            return response([
                "status" => true,
                'message' => "declaration deleted",
                "data" => $declaration
            ], 200);
        } catch (\Exception $e) {
            return response([
                "status" => false,
                'message' => $e->getMessage(),
                "data" => []
            ], 400);
        }
    }

    public function changeDeclarationVisibility($id)
    {
        try {
            $declaration = Declaration::where('id', $id)->update([
                'visibility' => false,
            ]);
            if ($declaration) {
                return response([
                    "status" => true,
                    'message' => "declaration deleted",
                    "data" => []
                ], 200);
            } else {
                return response([
                    "status" => true,
                    'message' => "declaration not found",
                    "data" => []
                ], 200);
            }
        } catch (\Exception $e) {
            return response([
                "status" => false,
                'message' => $e->getMessage(),
                "data" => []
            ], 400);
        }
    }

    public function sortedByDate(Request $request)
    {
        try {
            if ($request->sort == 'asc') {
                $declarations = json_decode(Declaration::query()->orderBy('created_at', 'asc')->get());
            } else if ($request->sort == 'desc') {
                $declarations = json_decode(Declaration::query()->orderBy('created_at', 'desc')->get());
            } else {
                return response([
                    "status" => true,
                    'message' => "declarations not found",
                    "data" => []
                ], 400);
            }
            if ($declarations) {
                foreach ($declarations as $declaration) {
                    $user = json_decode(User::where(['id' => $declaration->user_id])->first());

                    $declaration->created_at = Carbon::parse($declaration->created_at)->format('d/m/Y');
                    $declaration->updated_at = Carbon::parse($declaration->updated_at)->format('d/m/Y');
                    $declaration->tags = json_decode($declaration->tags);
                    $declaration->user = $user->name . ' ' . $user->surname;
                }

                return response([
                    "status" => true,
                    'message' => "declarations sorted " . $request->sort,
                    "data" => $declarations
                ], 200);
            } else {
                return response([
                    "status" => true,
                    'message' => "declarations not found",
                    "data" => $declarations
                ], 400);
            }
        } catch (\Exception $e) {
            return response([
                "status" => false,
                'message' => $e->getMessage(),
                "data" => []
            ], 400);
        }
    }

    public function sortedByTag(Request $request)
    {
        $data = json_decode($request->tag);

        try {
            $declarations = Declaration::all();
            $filteredDeclarations = [];

            foreach ($declarations as $declaration) {
                $tags = json_decode($declaration->tags);
                $result = array_intersect($data, $tags);
                if (count($result) == count($data)) {
                    $filteredDeclarations[] = $declaration;
                }
            }
            if ($filteredDeclarations) {
                return response([
                    "status" => true,
                    'message' => "declarations founds",
                    "data" => $filteredDeclarations
                ], 200);
            } else {
                return response([
                    "status" => false,
                    'message' => "no declaration",
                    "data" => []
                ], 400);
            }
        } catch (\Exception $e) {
            return response([
                "status" => false,
                'message' => $e->getMessage(),
                "data" => []
            ], 400);
        }
    }

    public function sortedByWord(Request $request)
    {
        $word = $request->word;
        try {
            $declarations = json_decode(Declaration::where('title', 'LIKE', '%' . $word . '%')
                ->orWhere('description', 'LIKE', '%' . $word . '%')
                ->get());
            if ($declarations) {
                foreach ($declarations as $declaration) {
                    $user = json_decode(User::where(['id' => $declaration->user_id])->first());

                    $declaration->created_at = Carbon::parse($declaration->created_at)->format('d/m/Y');
                    $declaration->updated_at = Carbon::parse($declaration->updated_at)->format('d/m/Y');
                    $declaration->tags = json_decode($declaration->tags);
                    $declaration->user = $user->name . ' ' . $user->surname;
                }
                return response([
                    "status" => true,
                    'message' => 'declarations founds',
                    "data" => $declarations
                ], 200);
            } else {
                return response([
                    "status" => false,
                    'message' => "declarations not found",
                    "data" => []
                ], 400);
            }
        } catch (\Exception $e) {
            return response([
                "status" => false,
                'message' => $e->getMessage(),
                "data" => []
            ], 400);
        }
    }

    public function sortedByDateBetween(Request $request)
    {
        try {
            $declarations = json_decode(Declaration::whereBetween('created_at', [$request->start_date, $request->end_date])->get());

            if ($declarations) {
                foreach ($declarations as $declaration) {
                    $user = json_decode(User::where(['id' => $declaration->user_id])->first());

                    $declaration->created_at = Carbon::parse($declaration->created_at)->format('d/m/Y');
                    $declaration->updated_at = Carbon::parse($declaration->updated_at)->format('d/m/Y');
                    $declaration->tags = json_decode($declaration->tags);
                    $declaration->user = $user->name . ' ' . $user->surname;
                }
                return response([
                    "status" => true,
                    'message' => 'declarations founds',
                    "data" => $declarations
                ], 200);
            } else {
                return response([
                    "status" => false,
                    'message' => "declarations not found",
                    "data" => []
                ], 400);
            }
        } catch (\Exception $e) {
            return response([
                "status" => false,
                'message' => $e->getMessage(),
                "data" => []
            ], 400);
        }
    }

    public function sharedLastDay(Request $request)
    {
        $request->start_date = Carbon::now()->subDay()->format('Y-m-d');
        $request->end_date = Carbon::now()->addDay()->format('Y-m-d');

        return $this->sortedByDateBetween($request);
    }

    public function sharedLastWeek(Request $request)
    {
        $request->start_date = Carbon::now()->subWeek()->format('Y-m-d');
        $request->end_date = Carbon::now()->addDay()->format('Y-m-d');

        return $this->sortedByDateBetween($request);
    }

    public function sharedLastMonth(Request $request)
    {
        $request->start_date = Carbon::now()->subMonth()->format('Y-m-d');
        $request->end_date = Carbon::now()->addDay()->format('Y-m-d');

        return $this->sortedByDateBetween($request);
    }

    public function filter(Request $request)
    {
        $quickSort = $request->quickSort;
        $sort = $request->sort;
        //asc:eskiden yeniye
        //desc:yeniden eskiye
        $startDate = $request->startDate;
        $endDate = $request->endDate;

        try {


            if ($sort != "") {
                if ($quickSort != "") {
                    $declarations = DB::select("SELECT * FROM declarations
                    WHERE DATE(created_at)
                    BETWEEN CURDATE() - INTERVAL 1 $quickSort AND CURDATE()
                    ORDER BY created_at $sort");

                } else if ($startDate != "" && $endDate != "") {
                    $declarations = DB::select("SELECT * FROM declarations
                 WHERE created_at BETWEEN ? AND ?
                 ORDER BY created_at $sort",[$startDate,$endDate]);
                } else {
                    $declarations = DB::select("SELECT * FROM declarations
                    ORDER BY created_at $sort");
                }

            } else if ($startDate != "" && $endDate != "") {
                $declarations = DB::select("SELECT * FROM declarations
                 WHERE created_at BETWEEN ? AND ?",[$startDate,$endDate]);
            } else if ($quickSort != "") {

                $declarations = DB::select("SELECT * FROM declarations
                    WHERE DATE(created_at)
                    BETWEEN CURDATE() - INTERVAL 1 $quickSort AND CURDATE()");
            }

            foreach ($declarations as $declaration) {
                $user = json_decode(User::where(['id' => $declaration->user_id])->first());

                $declaration->created_at = Carbon::parse($declaration->created_at)->format('d/m/Y');
                $declaration->updated_at = Carbon::parse($declaration->updated_at)->format('d/m/Y');
                $declaration->tags = json_decode($declaration->tags);
                $declaration->user = $user->name . ' ' . $user->surname;

            }
            return response([
                "status" => true,
                'message' => "declarations founds",
                "data" => $declarations,
            ], 200);

        } catch (\Exception $e) {
            return response([
                "status" => false,
                'message' => $e->getMessage(),
                "data" => []
            ], 400);
        }

    }
}
