const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyChM5V1Y9Rd80fSk4cm2LKRg5mpXEMMaKE",
  authDomain: "kiralik-sevgili.firebaseapp.com",
  projectId: "kiralik-sevgili",
  storageBucket: "kiralik-sevgili.firebasestorage.app",
  messagingSenderId: "347319227483",
  appId: "1:347319227483:web:a18c5cf4604280b2071b7e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testRead() {
  const testIds = ["CPmI90ASPqY9X8cpWEUlocxZxSi1", "4XmU28uhL6bLrrcY26KTDWpXd613"];
  for (const id of testIds) {
    try {
      console.log(`Attempting to read user document: ${id}`);
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(`Document ${id} found!`);
        console.log("Data:", JSON.stringify(docSnap.data(), null, 2));
      } else {
        console.log(`Document ${id} does NOT exist.`);
      }
    } catch (error) {
      console.error(`Error reading document ${id}:`, error.message);
    }
  }
  process.exit(0);
}

testRead();
