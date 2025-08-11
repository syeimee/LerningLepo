'use client'
import BodyWrapper from "@/components/BodyWrapper"
import { PAGE_META } from "@/constants/common/meta"
import { QiitaArticleProps, QiitaItem} from "@/types/qiita"
import { useEffect, useState } from "react"

const Blog = () => {
    const [articles, setArticles] = useState<QiitaItem[]>([]);

    const setData = (articlesData: QiitaArticleProps[] | undefined): void => {
        if (!articlesData) {
            setArticles([]);
        } else {
            const Data: QiitaItem[] = articlesData.map((data) => {
                return {
                    comments_count: data.comments_count,
                    created_at: data.created_at,
                    id: data.id,
                    likes_count: data.likes_count,
                    private: data.private,
                    reactions_count: data.reactions_count,
                    stocks_count: data.stocks_count,
                    tags: data.tags,
                    title: data.title,
                    updated_at: data.updated_at,
                    url: data.url,
                    page_views_count: data.page_views_count,
                    user: {
                        id: data.user.id,
                        profile_image_url: data.user.profile_image_url
                    }
                }
            });
            setArticles(Data);
        }
    }
    useEffect(() => {
        fetch('/api/qiita')
          .then(res => res.json())
          .then(setData)
          .catch(console.error);
      }, []);

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 font-sans text-gray-900">
            <BodyWrapper>

                <h1 className="font-lato text-2xl font-bold text-center mt-6 mb-6">
                    {PAGE_META.qiita.title}.
                </h1>

                {articles.map(article => (
                    <article
                        key={article.id}
                        className="mb-8 border border-gray-200 rounded-md hover:shadow-md transition-shadow duration-200 bg-white"
                    >
                        <header className="flex items-center px-4 py-2">
                            <a href={`https://qiita.com/syeimee`} className="flex items-center space-x-3">
                                <img
                                    src={article.user.profile_image_url}
                                    alt={article.user.id}
                                    className="w-10 h-10 rounded-full border border-gray-300"
                                    loading="lazy"
                                />
                            </a>
                            <div>
                                <div className="ml-2 font-semibold text-gray-800 text-sm">
                                    @{article.user.id}
                                </div>
                                <time
                                    dateTime={article.created_at}
                                    className="ml-2 text-xs text-gray-500"
                                >
                                    {new Date(article.created_at).toLocaleDateString("ja-JP", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </time>
                            </div>
                        </header>

                        <h2 className="ml-16 pr-4 pb-2 text-l font-semibold hover:text-blue-600 transition-color">
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                {article.title}
                            </a>
                        </h2>

                        <footer className="ml-16  pb-2">
                            <ul className="flex flex-wrap gap-2">
                                {article.tags.map(tag => (
                                    <li key={tag.name}>
                                        <div
                                            className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded"
                                        >
                                            {tag.name}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </footer>
                    </article>
                ))}
            </BodyWrapper>

        </div>
    )
}

export default Blog;