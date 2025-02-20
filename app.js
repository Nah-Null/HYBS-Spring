const successform = document.getElementById('Success');
const EENform = document.getElementById('Error-EN');
const EEform = document.getElementById('Error-E');
const ENform = document.getElementById('Error-N');
const successLform = document.getElementById('SuccessL');
const or = document.getElementById('or');
const XD = document.getElementById('XD');
const all = document.getElementById('all');




// ฟังก์ชันสลับระหว่างฟอร์ม Login และ Sign Up
function toggleForm() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    // สลับการแสดงผลของฟอร์ม Login และ Sign Up
    loginForm.classList.toggle('d-none');
    signupForm.classList.toggle('d-none');
}

// ฟังก์ชันเก็บข้อมูลจากฟอร์ม Sign Up และบันทึกลงใน MySQL
async function storeInputValues() {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    // ตรวจสอบว่ามีการกรอกข้อมูลทุกช่องหรือไม่
    if (!name || !email || !password) {
        all.classList.remove('d-none'); // แสดง Success Message
        setTimeout(() => {
        all.classList.add('d-none'); // ซ่อนหลังจาก 3 วินาที
        }, 3000);
        return;
    }

    console.log("🚀 Sending Data:", { name, email, password });

    try {
        // ตรวจสอบว่ามีผู้ใช้งานที่ใช้อีเมลนี้อยู่แล้วหรือไม่
        const ckmail = await fetch(`http://localhost:4000/users/getByEmail?email=${email}`);
        const ckname = await fetch(`http://localhost:4000/users/getByName?name=${name}`);
        if (ckmail.ok && ckname.ok) {
            const Datamail = await ckmail.json();
            const Dataname = await ckname.json();
            if (Datamail.email === email && Dataname.name === name) {
                EENform.classList.remove('d-none'); // แสดง Success Message
                setTimeout(() => {
                    EENform.classList.add('d-none'); // ซ่อนหลังจาก 3 วินาที
                }, 3000);
                return;
            }
        }

        const checkmail = await fetch(`http://localhost:4000/users/getByEmail?email=${email}`);
        if (checkmail.ok) {
            const Datamail = await checkmail.json();
            if (Datamail.email === email) {
                EEform.classList.remove('d-none'); // แสดง Success Message
                setTimeout(() => {
                    EEform.classList.add('d-none'); // ซ่อนหลังจาก 3 วินาที
                }, 3000);3000
                return;
            }
        }
        const checkname = await fetch(`http://localhost:4000/users/getByName?name=${name}`);
        if (checkname.ok) {
            const Dataname = await checkname.json();
            if (Dataname.name === name) {
                ENform.classList.remove('d-none'); // แสดง Success Message
                setTimeout(() => {
                    ENform.classList.add('d-none'); // ซ่อนหลังจาก 3 วินาที
                }, 3000);
                return;
            }
        }

        // เพิ่มผู้ใช้ใหม่ลงในฐานข้อมูล
        const response = await fetch("http://localhost:4000/users/adduser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        console.log("🔄 Response Status:", response.status);
        const data = await response.json();
        console.log("✅ Server Response:", data);

        if (response.ok) {
            successform.classList.remove('d-none'); // แสดง Success Message
            setTimeout(() => {
                successform.classList.add('d-none'); // ซ่อนหลังจาก 3 วินาที
            }, 3000);
            getUsers(); // เรียกใช้ฟังก์ชัน getUsers เพื่อดึงข้อมูลผู้ใช้ทั้งหมด
        } else {
            console.error("❌ Failed to add user:", data);
        }
    } catch (error) {
        console.error("⚠️ Fetch Error:", error);
    }

    toggleForm();
}

// ฟังก์ชันดึงข้อมูลผู้ใช้ทั้งหมด
async function getUsers() {
    try {
        const response = await fetch("http://localhost:4000/users/getallusers");
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        console.log("Fetched all users:", data);
        // คุณสามารถเพิ่มโค้ดเพื่อแสดงข้อมูลผู้ใช้ทั้งหมดในหน้าเว็บได้ที่นี่
    } catch (error) {
        console.error("Error fetching all users:", error);
    }
}

// ฟังก์ชันตรวจสอบข้อมูล Login
async function check_up() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    localStorage.setItem('email', email);

    try {
        const response = await fetch(`http://localhost:4000/users/getByEmail?email=${email}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        console.log("Fetched data:", data);

        if (data && data.email === email) {
            if (data.password === password) {
                successLform.classList.remove('d-none'); // แสดง Success Message
                setTimeout(() => {
                    successLform.classList.add('d-none'); // ซ่อนหลังจาก 3 วินาที
                }, 3000);                
                open_member();
            } else {
                or.classList.remove('d-none'); // แสดง Success Message
                setTimeout(() => {
                    or.classList.add('d-none'); // ซ่อนหลังจาก 3 วินาที
                }, 3000);
            }
        } else {
            console.error("Expected an object but got:", data);
            XD.classList.remove('d-none'); // แสดง Success Message
            setTimeout(() => {
                XD.classList.add('d-none'); // ซ่อนหลังจาก 3 วินาที
            }, 3000);
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        XD.classList.remove('d-none'); // แสดง Success Message
        setTimeout(() => {
            XD.classList.add('d-none'); // ซ่อนหลังจาก 3 วินาที
        }, 3000);
    }
}

async function open_member() {
    const memberForm = document.getElementById('Mumber-Form');
    const loginForm = document.getElementById('login-form');

    loginForm.classList.add('d-none');
    memberForm.classList.remove('d-none');

    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';

    try {
        const response = await fetch(`http://localhost:4000/users/getByEmail?email=${localStorage.getItem('email')}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        document.getElementById('name').innerText = data.name;
        document.getElementById('email').innerText = data.email;
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


// function success(){
//     const successform = document.getElementById('Success');

    
//     // สลับการแสดงผลของฟอร์ม Login และ Sign Up
//     loginForm.classList.toggle('d-none');
//     signupForm.classList.toggle('d-none');
// }