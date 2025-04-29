
    function openModal() {
        document.getElementById("login-modal").style.display = "flex";
    }

    function closeLoginModal() {
        document.getElementById("login-modal").style.display = "none";
    }

    function login() {
        const name = document.getElementById("student-name").value.trim();
        const className = document.getElementById("student-class").value;
        const course = document.getElementById("student-course").value;

        if (!name || !className || !course) {
            alert("Please fill in all fields.");
            return;
        }

        localStorage.setItem("studentName", name);
        localStorage.setItem("studentClass", className);
        localStorage.setItem("studentCourse", course);

        closeLoginModal();
        ChangeDashboard(name, course, className);
        loadLoginButton();
        loadTasks();
    }

    function loadLoginButton() {
        const name = localStorage.getItem("studentName");
        const loginButton = document.getElementById("logbutton");
        const userMenu = document.getElementById("user-menu");
        const userNameButton = document.getElementById("user-name");

        if (name) {
            loginButton.style.display = "none";
            userMenu.style.display = "inline-block";
            userNameButton.textContent = name;
        } else {
            loginButton.style.display = "inline-block";
            userMenu.style.display = "none";
        }
    }

    function ChangeDashboard(name, course, className) {
        document.getElementById("username").textContent = name;
        document.getElementById("course-name").textContent = course;
        document.getElementById("class-name").textContent = className;
        document.getElementById("dashboard-section").style.display = "block";
        document.getElementById("greeting").textContent = `Good ${getTimeOfDay()}`;
    }

    function getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour < 12) return "Morning";
        if (hour < 18) return "Afternoon";
        return "Evening";
    }

    function toggleLogout() {
        const logoutBtn = document.getElementById("logout-button");
        logoutBtn.style.display = logoutBtn.style.display === "block" ? "none" : "block";
    }

    function logout() {
        localStorage.removeItem("studentName");
        localStorage.removeItem("studentClass");
        localStorage.removeItem("studentCourse");
        localStorage.removeItem("tasks");

        document.getElementById("username").textContent = "Student";
        document.getElementById("course-name").textContent = "—";
        document.getElementById("class-name").textContent = "—";
        document.getElementById("greeting").textContent = "Welcome! Please log in to see your dashboard.";

        document.getElementById("logout-button").style.display = "none";
        loadLoginButton();
        clearTasks();
    }

    window.onload = function () {
        loadLoginButton();

        const name = localStorage.getItem("studentName");
        const className = localStorage.getItem("studentClass");
        const course = localStorage.getItem("studentCourse");

        if (name && className && course) {
            ChangeDashboard(name, course, className);
            loadTasks();
        }
    }

    function saveTasks() {
        const taskItems = document.querySelectorAll("#todo-list li");
        const tasks = [];

        taskItems.forEach(item => {
            const taskText = item.querySelector(".task-text").innerText;
            const taskDone = item.style.textDecoration === "line-through";
            tasks.push({
                text: taskText,
                done: taskDone
            });
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const taskList = document.getElementById("todo-list");
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        taskList.innerHTML = '';

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `<span class="task-text">${task.text}</span> <div><button onclick="markDone(this)" style='color:#8FB339; font-size:2rem;' ${task.done ? "disabled" : ""}>&#10004;</button> <button onclick="removeTask(this)" style='font-size:2rem;'>&#10060;</button></div>`;
            
            if (task.done) {
                li.style.textDecoration = "line-through";
            }

            taskList.appendChild(li);
        });
    }

    function addTask() {
        const taskInput = document.getElementById("task-input");
        const taskText = taskInput.value.trim();
        if (!taskText) {
            alert("Please enter a task.");
            return;
        }

        const taskList = document.getElementById("todo-list");
        const li = document.createElement("li");

        li.innerHTML = `<span class="task-text">${taskText}</span> <div><button onclick="markDone(this)" style='color:#8FB339; font-size:2rem;'>&#10004;</button> <button onclick="removeTask(this)" style='font-size:2rem;'>&#10060;</button></div>`;
        taskList.appendChild(li);

        taskInput.value = "";

        saveTasks();
    }

    function markDone(button) {
        const taskItem = button.parentElement.parentElement;
        taskItem.style.textDecoration = "line-through";
        button.disabled = true;

        saveTasks();
    }

    function removeTask(button) {
        const taskItem = button.parentElement.parentElement;
        taskItem.remove();

        saveTasks();
    }

    function clearTasks() {
        const taskList = document.getElementById("todo-list");
        taskList.innerHTML = '';
    }
