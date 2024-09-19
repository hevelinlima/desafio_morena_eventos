<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request) 
    {
        //Validando os dados
        $data = $request->only('name', 'email', 'password'); 
        $validator = Validator::make($data, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6|max:50'
        ]);

        //Envia mensagem de falha caso a requisisção seja inválida
        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 200);
        }

        //Cria nova usuário
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        return response()->json([
            'succes' => true,
            'message' => 'Usuário criado com sucesso',
            'data' => $user
        ], Response::HTTP_OK);
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|string|min:6|max:50'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 400);
        }

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Login inválido.'
                ], 401);
            }
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Não foi possível criar token.'
            ], 500);
        }

        return response()->json(['success' => true])
            ->cookie('token', $token, 60, null, null, true, true);
    }


    public function logout(Request $request)
    {
        $validator = Validator::make($request->only('token'), [
            'token' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 400);
        }

        try {
            // Pega o token do cabeçalho Authorization
            $token = JWTAuth::parseToken();
    
            // Invalida o token
            JWTAuth::invalidate($token);


    
            return response()->json([
            'success' => true,
            'message' => 'Usuário deslogado com sucesso.'
            ])->withCookie(cookie()->forget('token'));
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Falha ao deslogar, tente novamente.'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function get_user(Request $request) 
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Usuário não encontrado.'
                ], 404); // Não encontrado
            }
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Token inválido ou expirado.'
            ], 401); // Não autorizado
        }
    
        // Retorna o usuário autenticado
        return response()->json([
            'success' => true,
            'user' => [
                'name' => $user->name,
                'email' => $user->email, 
            ]
        ]);
    }

}
