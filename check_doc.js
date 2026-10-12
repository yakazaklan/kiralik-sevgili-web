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

async function check() {
  // Try a few IDs from users.json
  const ids = ['4XmU28uhL6bLrrcY26KTDWpXd613', 'xlYrm8oKCQbn5w17mqzfG8b0RDA3', 'CPmI90ASPqY9X8cpWEUlocxZxSi1'];

  for (const id of ids) {
    console.log(`Checking doc: ${id}`);
    try {
      const docRef = doc(db, 'users', id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        console.log(`Data for ${id}:`, JSON.stringify(snap.data(), null, 2));
      } else {
        console.log(`Doc ${id} does not exist in Firestore.`);
      }
    } catch (e) {
      console.error(`Error checking ${id}:`, e.message);
    }
  }
  process.exit(0);
}

check();
