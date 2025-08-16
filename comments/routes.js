import * as dao from './dao.js';

function commentRoutes(app){
    const createComment = async (req, res) => {
        const userId = req.session['currentUser']._id;
        const movieId = req.params['movieId'];
        const movietitle = req.params['movietitle'];
        const comment = req.params['comment'];
        const rating = req.params['rating'];
        const newComment = await dao.createComment(userId, movieId, movietitle, comment, rating);
        res.json(newComment);
    }
    const findCommentsForMovie = async (req, res) => {
        const movieId = req.params['movieId'];
        const comments = await dao.findCommentsForMovie(movieId);
        res.json(comments);
    }
    const findCommentsForUser = async (req, res) => {
        const userId = req.params['userId'];
        const comments = await dao.findCommentsForUser(userId);
        res.json(comments);
    }
    const deleteComment = async (req, res) => {
        const userID = req.session['currentUser']._id;
        const commentId = req.params['commentId'];
        const status = await dao.deleteComment(userID, commentId);
        res.json(status);
    }
    const updateComment = async (req, res) => {
        const commentId = req.params['commentId'];
        const comment = req.params['comment'];
        const rating = req.params['rating'];
        const status = await dao.updateComment(commentId, comment, rating);
        res.json(status);
    }

    app.post('/api/movies/:movieId/:movietitle/comments/:userId/:comment/:rating', createComment);
    app.get('/api/movies/:movieId/comments', findCommentsForMovie);
    app.get('/api/users/:userId/comment', findCommentsForUser);
    app.delete('/api/users/:userId/:commentId', deleteComment);
    app.put('/api/comment/:commentId/:comment', updateComment);
}

export default commentRoutes;