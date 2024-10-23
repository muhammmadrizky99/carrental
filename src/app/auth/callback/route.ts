// import { PrismaClient } from '@prisma/client';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import jwt from 'jsonwebtoken';

// const prisma = new PrismaClient();
// const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// export const dynamic = 'force-dynamic';

// // Fungsi untuk membuat token JWT
// function createToken(userId: string) {
//   const payload = { userId: userId };
//   const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
//   return token;
// }

// // Handler untuk GET request
// export async function GET(request: NextRequest) {
//   const requestUrl = new URL(request.url);
//   const code = requestUrl.searchParams.get('code'); // Misalnya: kode ini dari permintaan login atau otentikasi lainnya

//   if (code) {
//     // Temukan pengguna dari kode autentikasi yang didapat (misal menggunakan JWT atau token lain yang sudah dibuat)
//     const user = await prisma.user.findUnique({
//       where: {
//         id: code, // Ganti dengan logika yang sesuai
//       },
//     });

//     if (user) {
//       // Buat token JWT jika pengguna valid
//       const token = createToken(user.id);

//       // Kirim token ke klien (misalnya disimpan di cookie atau sebagai respons header)
//       return NextResponse.json({ token });
//     } else {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }
//   }

//   // Redirect setelah autentikasi berhasil
//   return NextResponse.redirect(requestUrl.origin + '/verified');
// }
