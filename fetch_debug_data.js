const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, limit } = require('firebase/firestore');

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

async function check() {
  console.log("--- CHECKING COLLECTIONS ---");
  const collections = ['users', 'profiles', 'ads', 'listings', 'companions'];

  for (const colName of collections) {
    try {
      const colRef = collection(db, colName);
      const snapshot = await getDocs(query(colRef, limit(5)));
      console.log(`Collection '${colName}': Found ${snapshot.size} documents (limited to 5)`);
      snapshot.forEach(doc => {
        console.log(`  ID: ${doc.id}`);
        const data = doc.id === 'xlYrm8oKCQbn5w17mqzfG8b0RDA3' || doc.id === '4XmU28uhL6bLrrcY26KTDWpXd613' ? JSON.stringify(doc.data(), null, 2) : '...';
        if (data !== '...') console.log(`  Data: ${data}`);
      });
    } catch (e) {
      console.log(`  Error reading '${colName}': ${e.message}`);
    }
  }

  console.log("\n--- DETAILED USER CHECK (Approved but might be missing) ---");
  const specificIds = ['4XmU28uhL6bLrrcY26KTDWpXd613', 'xlYrm8oKCQbn5w17mqzfG8b0RDA3'];
  for (const id of specificIds) {
    // We can't use doc() easily without more imports or knowing the path, but we already listed users.
  }

  process.exit(0);
}

check().catch(err => {
  console.error(err);
  process.exit(1);
});
