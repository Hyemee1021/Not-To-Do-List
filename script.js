let taskList = [];

const entryElm = document.getElementById("entry");
const badElm = document.getElementById("bad");
const badHrElm = document.getElementById("badHr");
const totalHrElm = document.getElementById("totalHr");

const ttlHrPerWeek = 24 * 7;

const handleOnSubmit = (form) => {
  console.log(form);

  //taking data from form
  const newTask = new FormData(form);
  console.log(newTask);
  //put name of input
  //   const task = newTask.get("task");
  //   const hr = newTask.get("hr");

  //when key and value are called the same,jsut call it once
  const obj = {
    id: randomStr(),
    task: newTask.get("task"),
    hr: newTask.get("hr"),
    type: "entry",
  };
  //getting total number
  const ttlHrs = total();

  if (ttlHrs + obj.hr > ttlHrPerWeek) {
    return alert("Sorry, there is not enough time left");
  }
  taskList.push(obj);

  //every task object is in taskList

  displayEntryTask();
};

const displayEntryTask = () => {
  let str = ``;

  const entryListOnly = taskList.filter((item) => item.type === "entry");

  entryListOnly.map((item, i) => {
    str += `
    <tr>
    <td>${i + 1}</td>
    <td>${item.task}</td>
    <td>${item.hr}hr</td>
    <td class="text-end">
      <button class="btn btn-danger" 
      onclick = "handleOnDelete('${item.id}')">
        <i class="fa-solid fa-trash"></i>
      </button>
      <button class="btn btn-success" onclick="switchTask('${item.id}','bad')">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </td>
    </tr>`;
  });

  entryElm.innerHTML = str;
  total();
};

const displayBadTask = () => {
  let str = ``;

  const badListOnly = taskList.filter((item) => item.type === "bad");

  badListOnly.map((item, i) => {
    str += `
    <tr>
    <td>${i + 1}</td>
    <td>${item.task}</td>
    <td>${item.hr}hr</td>
    <td class="text-end">
      <button onclick = "handleOnDelete('${item.id}')"
       class="btn btn-danger">
        <i class="fa-solid fa-trash"></i>
      </button>
      <button class="btn btn-success" onclick="switchTask('${
        item.id
      }','entry')">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
    </td>
    </tr>`;
  });

  badElm.innerHTML = str;
};

const randomStr = () => {
  const charLenght = 6;

  const str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

  let id = "";

  for (let i = 0; i < charLenght; i++) {
    const randNum = Math.round(Math.random() * (str.length - 1));
    id += str[randNum];
  }

  return id;
};

const switchTask = (id, type) => {
  console.log(id, type);
  //type is "bad"

  taskList = taskList.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        type,
      };
    }
    return item;
  });
  displayEntryTask();
  displayBadTask();
  total();
};

const handleOnDelete = (id) => {
  if (window.confirm("Are you sure you want to delte the item?")) {
    taskList = taskList.filter((item) => {
      if (item.id === id) {
        return false;
      }
      return true;
    });
    displayBadTask();
    displayEntryTask();
  }
};

const total = () => {
  const ttl = taskList.reduce((acc, item) => acc + item.hr, 0);

  totalHrElm.innerText = ttl;
  return ttl;
};
