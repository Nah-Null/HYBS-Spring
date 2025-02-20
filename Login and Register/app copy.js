async function open_member() {

    window.location.href = "https://nah-null.github.io/HYBS-Spring/Login%20and%20Register/mumber.html";



    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
    
    alert(localStorage.getItem('email'));

    try {
        const response = await fetch(`http://localhost:4000/users/getByEmail?email=${localStorage.getItem('email')}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        document.getElementById('name').innerText = data.name;
        document.getElementById('email').innerText = data.email;
        alert(data.name);
        alert(data.email);
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

// ฟังก์ชันสำหรับออกจากระบบ
function logout() {
    localStorage.removeItem('email');

    const memberForm = document.getElementById('Mumber-Form');
    const loginForm = document.getElementById('login-form');

    memberForm.classList.add('d-none');
    loginForm.classList.remove('d-none');

    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
}