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

async function checkUser(id) {
  try {
    const docRef = doc(db, 'users', id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      console.log(`\n--- User ID: ${id} ---`);
      const data = snap.data();
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log(`User ${id} not found in Firestore.`);
    }
  } catch (e) {
    console.error(`Error fetching user ${id}:`, e.message);
  }
}

async function run() {
  console.log("Checking specific users for Firestore data structure...");
  await checkUser('Rj63ij1FmBQYyadk36oipunPtLy1'); // Serin Karataş
  await checkUser('WuSg0isEJZces6nbJfYnNX1dRly2'); // Model Kam
  process.exit(0);
}

run();
