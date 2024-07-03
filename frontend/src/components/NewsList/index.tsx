import {
  useEffect,
  useState
} from 'react';
import {
  useAppSelector,
  useAppDispatch
} from '../../hooks'
import {
  selectToken,
} from '../../states/auth/authSlice'
import {
  selectUserId,
} from '../../states/auth/userIdSlice'
import {
  setArticle,
  unsetArticle
} from '../../states/article/articleSlice'

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { IArticle } from '../../shared/interfaces'

import NewsForm from '../NewsForm';

import './NewsListStyle.scss';

export default function NewsList() {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(selectUserId)
  const token = useAppSelector(selectToken)
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);


  useEffect(() => {
    // Fetch articles from the backend
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/articles`);
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        console.log(data);
        setArticles(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (articleId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/articles/${articleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete article');
      }

      setArticles((prevArticles) => prevArticles.filter((article) => article._id !== articleId));
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleEdit = (article: IArticle) => {
    dispatch(setArticle(article));
    setIsEditOpen(true);
  };

  const abortEdit = () => {
    dispatch(unsetArticle());
    setIsEditOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1>News Articles</h1>
      {isEditOpen && (
        <div className='edit_form_overlay'>
          <div className='edit_form_popup'>
            <button onClick={() => abortEdit()}>Abort edit</button>
            <NewsForm mode="edit" />
          </div>
        </div>
      )}
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <h1>{article.title}</h1>
            {article.content.length > 400 ? (
              <>
                <ReactMarkdown children={`${article.content.slice(0, 400)}...`} remarkPlugins={[remarkGfm]} />
                <button>Read entire article</button>
              </>
            ) : (
              <ReactMarkdown children={article.content} remarkPlugins={[remarkGfm]} />
            )}
            <small>Author: {article.author.name}</small>
            <small>Published: {new Date(article.createdAt).toLocaleString()}</small>
            {article.author._id === userId && (
              <div>
                <button onClick={() => handleEdit(article)}>Edit</button>
                <button onClick={() => handleDelete(article._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
