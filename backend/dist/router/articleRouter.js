import express from 'express';
import { postArticle, getArticles, getArticleById, updateArticle, deleteArticle } from '../controllers/articleController.js';
import protect from '../middleware/protectionMiddleware.js';
const articleRouter = express.Router();
articleRouter.get('/', getArticles);
articleRouter.post('/', protect, postArticle);
articleRouter.get('/:id', getArticleById);
articleRouter.put('/:id', protect, updateArticle);
articleRouter.delete('/:id', protect, deleteArticle);
export default articleRouter;
//# sourceMappingURL=articleRouter.js.map