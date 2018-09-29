// Config file
// Taken from: https://stackoverflow.com/a/22365674

var config = {
    development: {
        database: {
            URI: 'mongodb://User_RW:XbSuKfTvrtSeLIKQ@cluster0-shard-00-00-j32o2.mongodb.net:27017,cluster0-shard-00-01-j32o2.mongodb.net:27017,cluster0-shard-00-02-j32o2.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
        }
    },
    production: {
        database: {
            URI: 'mongodb://User_RW:XbSuKfTvrtSeLIKQ@cluster0-shard-00-00-j32o2.mongodb.net:27017,cluster0-shard-00-01-j32o2.mongodb.net:27017,cluster0-shard-00-02-j32o2.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
        }
    }
};
module.exports = config;