/** @format */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";

/**
 * @method GET
 * @route http://localhost:3000/api/articles/search?searchText=value
 * @description search articles by title
 * @access public
 */
export async function GET(request: NextRequest) {
  try {
    const searchText = request.nextUrl.searchParams.get("searchText");
    let articles;
    if (searchText) {
      articles = await prisma.article.findMany({
        where: {
          title: {startsWith: searchText, mode: "insensitive" },
        },
      });
    } else {
      articles = await prisma.article.findMany({ take: 6 }); // Default to returning 6 articles if no search text is provided
    }
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Internal server error${error}` },
      { status: 500 }
    );
  }
}
