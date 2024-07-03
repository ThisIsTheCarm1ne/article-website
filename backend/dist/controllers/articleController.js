import asyncHandler from 'express-async-handler';
import Article from '../schemas/articleSchema.js';
// Post an article
export const postArticle = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    const article = await Article.create({
        title,
        content,
        author: req.user._id,
    });
    res.status(201).json(article);
});
// Get all articles
export const getArticles = asyncHandler(async (req, res) => {
    const articles = await Article.find().populate('author', 'name');
    console.log(articles);
    res.status(200).json(articles);
});
// Get single article
export const getArticleById = asyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id).populate('author', 'name email');
    if (article) {
        res.status(200).json(article);
    }
    else {
        res.status(404);
        throw new Error('Article not found');
    }
});
// Update an article
export const updateArticle = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    const article = await Article.findById(req.params.id);
    if (article) {
        if (article.author.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to update this article');
        }
        article.title = title || article.title;
        article.content = content || article.content;
        const updatedArticle = await article.save();
        res.status(200).json(updatedArticle);
    }
    else {
        res.status(404);
        throw new Error('Article not found');
    }
});
// Delete an article
export const deleteArticle = asyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id);
    if (article) {
        if (article.author.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to delete this article');
        }
        await Article.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Article removed' });
    }
    else {
        res.status(404);
        throw new Error('Article not found');
    }
});
//# sourceMappingURL=articleController.js.map