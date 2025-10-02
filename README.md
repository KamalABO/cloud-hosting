# Cloud Hosting Project

وصف المشروع:

مشروع استضافة سحابية هو تطبيق ويب مبني باستخدام Next.js يهدف إلى تقديم خدمات استضافة المواقع بشكل احترافي وسهل الاستخدام. يوفر النظام إمكانية تسجيل المستخدمين، إدارة المقالات والتعليقات، ولوحة تحكم للإدارة. يتميز بتصميم متجاوب، ويوفر أدوات بحث وتصفح متقدمة للمحتوى، مع حماية وأمان عبر نظام تسجيل الدخول وتوثيق المستخدمين. يستخدم المشروع Prisma لإدارة قاعدة البيانات وTailwind CSS لتنسيق الواجهة.

## Features

- User registration and login
- Profile management
- Article CRUD (Create, Read, Update, Delete)
- Comment system
- Admin dashboard for managing articles and comments
- Search and pagination for articles
- Responsive design

## Technologies Used

- Next.js
- TypeScript
- Prisma ORM
- PostgreSQL (or compatible database)
- Tailwind CSS

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/KamalABO/cloud-hosting.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file and add your database connection string and other secrets.

### 4. Run Prisma migrations

```bash
npx prisma migrate dev
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Folder Structure

- `src/app` - Application pages and API routes
- `src/components` - Reusable UI components
- `src/utils` - Utility functions and helpers
- `prisma` - Prisma schema and migrations
- `public` - Static assets

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

This project is licensed under the MIT License.
