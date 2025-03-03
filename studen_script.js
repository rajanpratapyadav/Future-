document.addEventListener("DOMContentLoaded", function () {
    const studentForm = document.getElementById("studentForm");
    let students = JSON.parse(localStorage.getItem("students")) || [];

    studentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const course = document.getElementById("course").value.trim();
        const mobileNumber = document.getElementById("MobileNumber").value.trim();

        // Validation
        if (!name || !email || !password || !course || !mobileNumber) {
            alert("Please fill in all fields.");
            return;
        }

        if (students.some(student => student.email === email)) {
            alert("This email is already registered!");
            return;
        }

        if (!/^[0-9]{10}$/.test(mobileNumber)) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        // Save Student Data
        const studentData = { name, email, mobileNumber, password, course };
        students.push(studentData);
        localStorage.setItem("students", JSON.stringify(students));

        studentForm.reset();
        alert("Student Registered Successfully!");
    });

    function showStudentDetails() {
        const managerPassword = "INDIA@54321";
        const enteredPassword = prompt("Enter Manager Password:");

        if (enteredPassword !== managerPassword) {
            alert("Incorrect Password! Access Denied.");
            return;
        }

        let existingBox = document.getElementById("managerBox");
        if (existingBox) existingBox.remove();

        const managerBox = document.createElement("div");
        managerBox.id = "managerBox";
        managerBox.style.cssText = `
            position: fixed;
            top: 10%;
            left: 50%;
            transform: translate(-50%, 0);
            background: #222;
            color: #fff;
            padding: 15px;
            border: 2px solid #fff;
            border-radius: 5px;
            box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.3);
            width: 400px;
            max-height: 500px;
            overflow-y: auto;
            z-index: 1000;
        `;

        let studentList = "<h3>Registered Students</h3>";

        students.forEach((student, index) => {
            studentList += `
                <div id="student-${index}" style="padding: 10px; border-bottom: 1px solid white;">
                    <p><strong>${index + 1}. Name:</strong> ${student.name}</p>
                    <p><strong>Email:</strong> ${student.email}</p>
                    <p><strong>Mobile:</strong> ${student.mobileNumber}</p>
                    <p><strong>Course:</strong> ${student.course}</p>
                    <button onclick="deleteStudent(${index})" style="
                        background: red; color: white; border: none;
                        padding: 5px; cursor: pointer; margin-top: 5px;">Delete</button>
                </div>
            `;
        });

        managerBox.innerHTML = studentList;

        const closeButton = document.createElement("button");
        closeButton.innerText = "Close";
        closeButton.style.cssText = `
            display: block;
            margin: 10px auto 0;
            padding: 5px 10px;
            background: red;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 3px;
        `;

        closeButton.addEventListener("click", function () {
            managerBox.remove();
        });

        managerBox.appendChild(closeButton);
        document.body.appendChild(managerBox);
    }

    window.deleteStudent = function (index) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        showStudentDetails();
        addManagerButton(); // बटन फिर से ऐड करें
    };

    function addManagerButton() {
        let existingButton = document.getElementById("managerButton");
        if (existingButton) {
            existingButton.remove(); // पहले से मौजूद बटन हटा दें ताकि डुप्लिकेट न हो
        }

        const managerButton = document.createElement("button");
        managerButton.innerText = "Show Student Details (Manager Only)";
        managerButton.id = "managerButton";
        managerButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px;
            background: #2334;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 16px;
            border-radius: 5px;
            box-shadow: 0px 0px 5px rgba(192, 192, 192, 0.18);
            display: block;
        `;

        managerButton.addEventListener("click", showStudentDetails);
        document.body.appendChild(managerButton);
    }

    // पेज लोड होते ही बटन को ऐड करें
    setTimeout(addManagerButton, 500);
});
