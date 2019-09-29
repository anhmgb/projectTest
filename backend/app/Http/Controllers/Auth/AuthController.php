<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\User;

class AuthController extends Controller
{

    private $user;
    const TIME_TO_LIVE = 1440;

    public function __construct(User $user){
        $this->user = $user;
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $email = $credentials['email'];
        $password = $credentials['password'];

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6|max:20'
        ]);

        if($validator->fails()) {
            return response()->json([
                'error' => $validator->messages()->first()
            ], 400);
        }

        $user = User::where('email', '=', $email)->first();

        if (!$user) {
            $response = [
              'error' => 'User doesnt exist'
            ];
            return response()->json($response, 400);
        }

        if (!Hash::check($password, $user->password)) {
            $response = [
              'error' => 'Password incorrect'
            ];
            return response()->json($response, 400);
        }

        if ($token = Auth::guard()->attempt($credentials)) {
            return response()->json([
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => Auth::guard()->factory()->getTTL() * 60
            ]);
        }

        return response()->json([
            'error' => 'Something when wrong'
        ], 400);
    }

    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|max:20',
            'name' => 'required|min:6|max:50'
        ]);

        if($validator->fails()) {
            return response()->json([
                'error' => $validator->messages()->first()
            ], 400);
        }

        $user = $this->user->create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password'))
        ]);

        return response()->json([
            'status'=> 200,
            'message'=> 'User created successfully',
            'data'=>$user
        ]);
    }

    public function me(Request $request)
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}