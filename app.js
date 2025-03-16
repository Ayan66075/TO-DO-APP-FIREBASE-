  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";

  import { getFirestore, collection, addDoc, Timestamp, getDocs, doc, deleteDoc, deleteField, updateDoc} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

  const firebaseConfig = {

    apiKey: "AIzaSyDPWccYSbqyWJnEZemsyFzF5uQ1IMZ_rKA",

    authDomain: "to-do-by-sir.firebaseapp.com",

    projectId: "to-do-by-sir",

    storageBucket: "to-do-by-sir.firebasestorage.app",

    messagingSenderId: "999048222296",

    appId: "1:999048222296:web:b43a5dba12bcd1d5071c2d",

    measurementId: "G-48DQS18017"

  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  async function addtodo() {
      getUl.innerHTML = ""
      let getInp = document.getElementById("add-todo");
      try {
        const docRef = await addDoc(collection(db, "todos"), {
          item : getInp.value,
          createdAt : Timestamp.now()
        });

        getInp.value = "";
        readData();

        console.log("Document written with ID: ", docRef.id);

      }
       catch (e) {
        console.error("Error adding document: ", e);
      }

  }

  window.addtodo = addtodo;

  let getUl = document.getElementById("ul");

  async function readData() {
    const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    getUl.innerHTML += `<li>${doc.data().item} <button onclick = 'delTodo("${doc.id}")'> Delete </button> <button onclick = 'editTodo("${doc.id}")'> Edit </button> </li> <br>`
    
    });
  }
  readData();

  async function delTodo(e) {
    getUl.innerHTML = ""
    // console.log(e);

    const cityRef = doc(db, 'todos', e);
   await deleteDoc(cityRef, {
    item: deleteField(),
    createdAt: deleteField()
   });

   console.log("Deleted Successfully");
   readData();

  }

  window.delTodo = delTodo;

  async function editTodo(e) {
    getUl.innerHTML = ""
    var editItem = prompt("Enter Updated Item");
    // console.log(e);

    const cityRef = doc(db, 'todos', e);
  await updateDoc(cityRef, {
    item: editItem,
    createdAt: Timestamp.now()
  });

  readData();

  }

  window.editTodo = editTodo;

  async function delTodos(){
    getUl.innerHTML = ""
    // await deleteDoc(doc(db, "todos"));
    // console.log("All Items has been Deleted");

    const querySnapshot = await getDocs(collection(db, "todos"));

    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));

    await Promise.all(deletePromises);

    console.log("All Items have been Deleted");

    readData(); // Refresh the list

  }

  window.delTodos = delTodos;