function logout() {
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}