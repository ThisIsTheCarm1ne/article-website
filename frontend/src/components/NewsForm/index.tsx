import {
  useState,
  ChangeEvent,
  useEffect
} from "react"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import './NewsFormStyle.scss';

import {
  useAppSelector,
} from '../../hooks'
import {
  selectToken
} from '../../states/auth/authSlice'
import {
  selectArticle
} from "../../states/article/articleSlice";

interface IForm {
  mode?: string;
}

export default function NewsForm({
  mode='post'
}: IForm) {
  const token = useAppSelector(selectToken);
  const article = useAppSelector(selectArticle);
  const [markdown, setMarkdown] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (mode === 'edit') {
      setTitle(article.title);
      setMarkdown(article.content);
    }
  }, [mode, article]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  const handleUpdate = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/articles/${article._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        title: title,
        content: markdown
      })
    });

    if (response.ok) {
      alert('Article updated successfully!');
    } else {
      alert('Failed to update article.');
    }
  };

  const handleSubmit = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        title: title,
        content: markdown
      })
    });

    if (response.ok) {
      alert('Article submitted successfully!');
    } else {
      alert('Failed to submit article.');
    }
  };

  return (
    <>
      <div className="form">
        <div className="top_part">
          <div className="input_fields">
            <input 
              value={title}
              onChange={handleTitleChange}
              placeholder="Title of your article"
            />
            <textarea
              value={markdown}
              onChange={handleInputChange}
              placeholder="Write your article here..."
              className="markdown-input"
            />
          </div>
          <div className="markdown_preview">
            <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
          </div>
        </div>
        {mode === 'edit' ? (
          <button onClick={() => handleUpdate()}>Edit</button>
        ) : (
          <button onClick={() => handleSubmit()}>Post</button>
        )}
      </div>
    </>
  )
}
