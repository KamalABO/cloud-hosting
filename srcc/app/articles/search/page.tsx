/** @format */

import { GetArticlesBasedOnSearch } from "@/apiCalls/articleApiCall";
import { Article } from "@prisma/client";
import ArticleItem from "@/components/articles/ArticleItem";
interface SearchArticlePageProps {
  searchParams: { searchText: string };
}

const SearchArticlePage = async ({
  searchParams: { searchText },
}: SearchArticlePageProps) => {
  const articles: Article[] = await GetArticlesBasedOnSearch(searchText);

  return (
    <section className="fix-height container m-auto px-5">
      {articles.length === 0 ? (
        <h2 className="text-gray-800 text-2xl font-bold p-5">
          No articles found for &quot;
          <span className="text-red-500 mx-1">{searchText}</span> &quot;
        </h2>
      ) : (
        <>
          {" "}
          <h1 className="text-2xl font-bold mb-2 mt-7 text-gray-800">
            Articles based on
            <span className="ms-1 text-green-700 text-3xl font-bold">
              {searchText}
            </span>
          </h1>
          <div className="flex items-center justify-center flex-wrap gap-7">
            {articles.map((article) => (
              <ArticleItem key={article.id} article={article} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default SearchArticlePage;
