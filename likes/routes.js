import * as dao from './dao.js';

function likesRoutes(app){
    const findAllLikes = async (req, res) => {
        const likes = await dao.findAllLikes();
        res.json(likes);
    };
    const CreateUserLike = async (req, res) => {
        const { userID, movieID, movieTitle } = req.params;
        const like = await dao.CreateUserLike(userID, movieID, movieTitle);
        res.json(like);
    }
    const deleteUserLike = async (req, res) => {
        const { userID, movieID } = req.params;
        const status = await dao.deleteUserLike(userID, movieID);
        res.json(status);
    }
    const findUsersLikeMovies = async (req, res) => {
        const { movieID } = req.params;
        const likes = await dao.findUsersLikeMovies(movieID);
        res.json(likes);
    }
    const findMoviesLikedByUser = async (req, res) => {
        const { userID } = req.params;
        const movies = await dao.findMoviesLikedByUser(userID);
        res.json(movies);
    }

    app.get('/api/likes', findAllLikes);
    app.post('/api/users/:userID/likes/:movieID/:movieTitle', CreateUserLike);
    app.delete('/api/users/:userID/likes/:movieID', deleteUserLike);
    app.get('/api/likes/:movieID/users', findUsersLikeMovies);
    app.get('/api/users/:userID/likes', findMoviesLikedByUser);
}

export default likesRoutes;