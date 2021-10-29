exports.getUsername = function () {
    const usernameString = sessionStorage.getItem('token');
    const username = JSON.parse(usernameString);
    return username?.username
}
