// // Hardcoded users for simulation
// export const MOCK_USERS = [
//     { username: 'admin', password: '123', role: 'manager', name: 'Ms. Manager' },
//     { username: 'emp1', password: '123', role: 'employee', name: 'John Builder' },
//     { username: 'cust1', password: '123', role: 'customer', name: 'Acme Corp' }
// ];

// export const loginUser = (username, password) => {
//     const user = MOCK_USERS.find(u => u.username === username && u.password === password);
//     if (user) {
//         // In a real app, you'd get a token here. We'll just save the user object.
//         const sessionUser = { ...user };
//         delete sessionUser.password; // Don't save password in session
//         localStorage.setItem('construction_session', JSON.stringify(sessionUser));
//         return sessionUser;
//     }
//     return null;
// };

// export const logoutUser = () => {
//     localStorage.removeItem('construction_session');
// };

// export const getSession = () => {
//     return JSON.parse(localStorage.getItem('construction_session'));
// };