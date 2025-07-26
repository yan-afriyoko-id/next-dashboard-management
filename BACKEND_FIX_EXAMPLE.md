# Backend Fix Example - Laravel Validation

## Problem
When updating a student, the unique validation for phone and NISN fails because it doesn't exclude the current student being updated.

## Solution

### 1. Complete Working Update Function

Here's the complete fixed version of your update function:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;
use App\Models\Siswa;

class SiswaController extends Controller
{
    public function update(Request $request, string $id): JsonResponse
    {
        try {
            $siswa = Siswa::find($id);

            if (!$siswa) {
                return response()->json([
                    'success' => false,
                    'message' => 'Siswa tidak ditemukan'
                ], 404);
            }

            // Validation rules with proper unique constraints
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'phone' => [
                    'required',
                    'string',
                    Rule::unique('phones', 'number_phone')->ignore($siswa->id, 'siswa_id')
                ],
                'nisns' => [
                    'required',
                    'string',
                    Rule::unique('nisns', 'nisns')->ignore($siswa->id, 'siswa_id')
                ],
                'hobbies' => 'required|array|min:1',
                'hobbies.*' => 'integer|exists:hobbies,id',
            ]);

            // Update student name
            $siswa->update(['name' => $validated['name']]);
            
            // Update phone - delete old and create new
            $siswa->phone()->delete();
            $siswa->phone()->create(['number_phone' => $validated['phone']]);

            // Update NISN - delete old and create new
            $siswa->nisns()->delete();
            $siswa->nisns()->create(['nisns' => $validated['nisns']]);
            
            // Update hobbies - detach old and attach new
            $siswa->hobbies()->detach();
            $siswa->hobbies()->attach($validated['hobbies']);

            return response()->json([
                'success' => true,
                'data' => $siswa->load(['phone', 'nisns', 'hobbies']),
                'message' => 'Siswa berhasil diperbarui'
            ], 200);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }
}
```

### 2. Alternative: Using Form Request Validation

Create a dedicated form request for better organization:

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSiswaRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $siswaId = $this->route('id'); // Assuming route parameter is 'id'
        
        return [
            'name' => 'required|string|max:255',
            'phone' => [
                'required',
                'string',
                Rule::unique('phones', 'number_phone')->ignore($siswaId, 'siswa_id')
            ],
            'nisns' => [
                'required',
                'string',
                Rule::unique('nisns', 'nisns')->ignore($siswaId, 'siswa_id')
            ],
            'hobbies' => 'required|array|min:1',
            'hobbies.*' => 'integer|exists:hobbies,id'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Nama siswa wajib diisi',
            'name.max' => 'Nama siswa maksimal 255 karakter',
            'phone.required' => 'Nomor telepon wajib diisi',
            'phone.unique' => 'Nomor telepon sudah digunakan oleh siswa lain',
            'nisns.required' => 'NISN wajib diisi',
            'nisns.unique' => 'NISN sudah digunakan oleh siswa lain',
            'hobbies.required' => 'Minimal satu hobi harus dipilih',
            'hobbies.min' => 'Minimal satu hobi harus dipilih',
            'hobbies.*.exists' => 'Hobi yang dipilih tidak valid'
        ];
    }
}
```

Then use it in your controller:

```php
public function update(UpdateSiswaRequest $request, string $id): JsonResponse
{
    try {
        $siswa = Siswa::find($id);

        if (!$siswa) {
            return response()->json([
                'success' => false,
                'message' => 'Siswa tidak ditemukan'
            ], 404);
        }

        $validated = $request->validated();

        // Update student name
        $siswa->update(['name' => $validated['name']]);
        
        // Update phone - delete old and create new
        $siswa->phone()->delete();
        $siswa->phone()->create(['number_phone' => $validated['phone']]);

        // Update NISN - delete old and create new
        $siswa->nisns()->delete();
        $siswa->nisns()->create(['nisns' => $validated['nisns']]);
        
        // Update hobbies - detach old and attach new
        $siswa->hobbies()->detach();
        $siswa->hobbies()->attach($validated['hobbies']);

        return response()->json([
            'success' => true,
            'data' => $siswa->load(['phone', 'nisns', 'hobbies']),
            'message' => 'Siswa berhasil diperbarui'
        ], 200);
        
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Terjadi kesalahan: ' . $e->getMessage()
        ], 500);
    }
}
```

### 3. Key Changes Made

1. **Added Rule::unique()->ignore()** for phone and NISN validation
2. **Added min:1** validation for hobbies array
3. **Improved error messages** in Indonesian
4. **Better error handling** structure

### 4. Testing the Fix

After implementing the fix, test with these scenarios:

1. **Update student with same phone/NISN** - Should work ✅
2. **Update student with different phone/NISN** - Should work ✅  
3. **Update student with phone/NISN from another student** - Should fail with clear error ✅
4. **Create new student with existing phone/NISN** - Should fail ✅

### 5. Database Migration Check

Make sure your database tables have the correct unique constraints:

```php
// For phones table
Schema::create('phones', function (Blueprint $table) {
    $table->id();
    $table->string('number_phone');
    $table->foreignId('siswa_id')->constrained()->onDelete('cascade');
    $table->timestamps();
    
    $table->unique('number_phone');
});

// For nisns table  
Schema::create('nisns', function (Blueprint $table) {
    $table->id();
    $table->string('nisns');
    $table->foreignId('siswa_id')->constrained()->onDelete('cascade');
    $table->timestamps();
    
    $table->unique('nisns');
});
```

## Summary

The key fix is using `Rule::unique()->ignore()` to exclude the current record from unique validation during updates. This allows students to keep their existing phone numbers and NISNs when updating other fields, while still preventing duplicates across different students. 