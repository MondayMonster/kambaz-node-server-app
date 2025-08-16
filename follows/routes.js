import * as dao from './dao.js';

function followsRoutes(app){
    const CreateUserFollow = async (req, res) => {
        const follower = req.session['currentUser']._id;
        const following = req.params['followed']
        const follows = await dao.userFollowsUser(follower, following);
        res.json(follows);
    }
    const deleteUserFollow = async (req, res) => {
        const follower = req.session['currentUser']._id;
        const following = req.params['followed']
        const status = await dao.userUnfollowsUser(follower, following);
        res.json(status);
    }
    const findUsersFollowed = async (req, res) => {
        const followed = req.params['followed']
        const followers = await dao.findFollowersForUser(followed);
        res.json(followers);
    }
    const findUsersFollowing = async (req, res) => {
        const followers = req.params['following']
        const followed = await dao.findFollowingOfUser(followers);
        res.json(followed);
    }

    app.post('/api/users/:followed/follow', CreateUserFollow);
    app.delete('/api/users/:followed/unfollow', deleteUserFollow);
    app.get('/api/users/:followed/followers', findUsersFollowed);
    app.get('/api/users/:following/following', findUsersFollowing);
}

export default followsRoutes;