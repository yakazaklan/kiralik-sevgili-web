const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, limit } = require('firebase/firestore');

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

async function diagnose() {
  console.log("Fetching first 10 users to inspect data structure...");
  const usersRef = collection(db, 'users');

  try {
    const snapshot = await getDocs(usersRef);
    console.log(`Total users in collection: ${snapshot.size}`);

    let count = 0;
    snapshot.forEach(doc => {
      if (count >= 10) return;
      const data = doc.data();
      console.log(`\n--- User: ${doc.id} ---`);
      console.log(JSON.stringify(data, null, 2));
      count++;
    });
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
  process.exit(0);
}

diagnose();
