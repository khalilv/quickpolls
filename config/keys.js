const password = 'INSERT PASSWORD HERE'
const username = 'INSERT USERNAME HERE'
module.exports = {
    MongoURI : 'mongodb+srv://' + username + ':' + password + '@quickpollscluster.ixufn.mongodb.net/quickpollsdb?retryWrites=true&w=majority'
}