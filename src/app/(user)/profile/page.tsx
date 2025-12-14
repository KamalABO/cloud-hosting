import React from 'react'
import prisma from '@/utils/db'
import { cookies } from 'next/headers'
import { verifyTokenForPage } from '@/utils/verifyToken'
import Link from 'next/link'

export default async function ProfilePage() {
  const cookieStore = cookies()
  const token = cookieStore.get('jwtToken')?.value
  const payload = token ? verifyTokenForPage(token) : null

  if (!payload) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4">
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">غير مسجل الدخول</h2>
          <p className="text-sm text-gray-600 mb-4">الرجاء تسجيل الدخول لعرض الصفحة الشخصية.</p>
          <Link href="/(user)/login" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">تسجيل الدخول</Link>
        </div>
      </div>
    )
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      comments: {
        select: {
          id: true,
          text: true,
          createdAt: true,
          article: { select: { id: true, title: true } }
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4">
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold">المستخدم غير موجود</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">الملف الشخصي</h3>
            <p className="text-gray-700"><span className="font-medium">الاسم:</span> {user.username}</p>
            <p className="text-gray-700"><span className="font-medium">البريد الإلكتروني:</span> {user.email}</p>
            <p className="text-gray-500 text-sm mt-3">انضم بتاريخ: {new Date(user.createdAt).toLocaleString('ar-EG')}</p>
            <div className="mt-4">
              <Link href="/(user)/profile/edit" className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded mr-2">تعديل الملف</Link>
              <Link href="/" className="inline-block text-blue-600">العودة للصفحة الرئيسية</Link>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">التعليقات التي قمت بكتابتها ({user.comments.length})</h3>
            {user.comments.length === 0 ? (
              <p className="text-gray-600">لم تكتب أي تعليقات بعد.</p>
            ) : (
              <ul className="space-y-4">
                {user.comments.map((c) => (
                  <li key={c.id} className="border rounded p-4">
                    <p className="text-gray-800">{c.text}</p>
                    <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                      <span>على المقال: <Link href={`/articles/${c.article.id}`} className="text-blue-600">{c.article.title}</Link></span>
                      <span>{new Date(c.createdAt).toLocaleString('ar-EG')}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}