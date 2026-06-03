 const baseTasks = [
      {
        id:1,
        name:"Full Stack Practice",
        dailyHours:3
      },
      {
        id:2,
        name:"Problem Solving",
        dailyHours:2
      },
      {
        id:3,
        name:"IELTS Practice",
        dailyHours:1
      }
    ];

    const today = new Date().toDateString();

    document.getElementById("date").innerText = today;

    // Initialize App
    function initializeData(){

      let savedDate = localStorage.getItem("savedDate");

      let tasks = JSON.parse(localStorage.getItem("tasks"));

      // First Time Setup
      if(!tasks){

        tasks = baseTasks.map(task => ({
          ...task,
          remainingHours: task.dailyHours,
          completed:false
        }));

        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("savedDate", today);

        renderTasks();
        return;
      }

      // New Day Check
      if(savedDate !== today){

        tasks.forEach(task => {

          // If unfinished, add new daily hours
          if(task.remainingHours > 0){

            task.remainingHours =
              task.remainingHours + task.dailyHours;

          } else {

            // If completed yesterday
            task.remainingHours = task.dailyHours;
          }

          task.completed = false;
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("savedDate", today);
      }

      renderTasks();
    }

    // Render Tasks
    function renderTasks(){

      const taskList = document.getElementById("taskList");

      taskList.innerHTML = "";

      let tasks = JSON.parse(localStorage.getItem("tasks"));

      tasks.forEach(task => {

        const div = document.createElement("div");

        div.classList.add("task");

        if(task.completed){
          div.classList.add("completed");
        }

        div.innerHTML = `
        
          <div class="task-title">
            ${task.name}
          </div>

          <div class="hours">
            Remaining: ${task.remainingHours} Hours
          </div>

          <div class="buttons">

            <button class="minus-btn"
              onclick="studyHour(${task.id})">
              -1 Hour
            </button>

            <button class="complete-btn"
              onclick="completeTask(${task.id})">
              Complete
            </button>

          </div>
        `;

        taskList.appendChild(div);
      });
    }

    // Reduce 1 Hour
    function studyHour(id){

      let tasks = JSON.parse(localStorage.getItem("tasks"));

      tasks = tasks.map(task => {

        if(task.id === id){

          if(task.remainingHours > 0){
            task.remainingHours--;
          }

          // Auto Complete
          if(task.remainingHours === 0){
            task.completed = true;
          }
        }

        return task;
      });

      localStorage.setItem("tasks", JSON.stringify(tasks));

      renderTasks();
    }

    // Complete Task
    function completeTask(id){

      let tasks = JSON.parse(localStorage.getItem("tasks"));

      tasks = tasks.map(task => {

        if(task.id === id){

          task.remainingHours = 0;
          task.completed = true;
        }

        return task;
      });

      localStorage.setItem("tasks", JSON.stringify(tasks));

      renderTasks();
    }

    // Reset Data
    function resetData(){

      localStorage.clear();

      const freshTasks = baseTasks.map(task => ({
        ...task,
        remainingHours: task.dailyHours,
        completed:false
      }));

      localStorage.setItem("tasks", JSON.stringify(freshTasks));
      localStorage.setItem("savedDate", today);

      renderTasks();
    }

    initializeData();
