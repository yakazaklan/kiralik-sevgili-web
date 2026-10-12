const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyChM5V1Y9Rd80fSk4cm2LKRg5mpXEMMaKE",
  authDomain: "kiralik-sevgili-505002.firebaseapp.com",
  projectId: "kiralik-sevgili-505002",
  storageBucket: "kiralik-sevgili-505002.firebasestorage.app",
  messagingSenderId: "347319227483",
  appId: "1:347319227483:web:a18c5cf4604280b2071b7e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  console.log("Checking project: kiralik-sevgili-505002");
  try {
    const colRef = collection(db, 'users');
    const snapshot = await getDocs(colRef);
    console.log(`Total users found: ${snapshot.size}`);
    if (snapshot.size > 0) {
        console.log("First user data sample:", JSON.stringify(snapshot.docs[0].data()).substring(0, 200));
    }
  } catch (e) {
    console.error("Error checking kiralik-sevgili-505002:", e.message);
  }

  console.log("\nChecking project: kiralik-sevgili");
  const config2 = {...firebaseConfig, projectId: "kiralik-sevgili", authDomain: "kiralik-sevgili.firebaseapp.com", storageBucket: "kiralik-sevgili.firebasestorage.app"};
  const app2 = initializeApp(config2, "app2");
  const db2 = getFirestore(app2);
  try {
    const colRef2 = collection(db2, 'users');
    const snapshot2 = await getDocs(colRef2);
    console.log(`Total users found: ${snapshot2.size}`);
    if (snapshot2.size > 0) {
        console.log("First user data sample:", JSON.stringify(snapshot2.docs[0].data()).substring(0, 200));
    }
  } catch (e) {
    console.error("Error checking kiralik-sevgili:", e.message);
  }

  process.exit(0);
}

check();
