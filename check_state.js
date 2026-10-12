const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc, collection, query, where, getDocs } = require('firebase/firestore');

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

async function checkState(uid) {
  console.log(`--- Checking state for UID: ${uid} ---`);

  // 1. User document
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc.exists()) {
    console.log('User Document:', JSON.stringify(userDoc.data(), null, 2));
  } else {
    console.log('User Document NOT FOUND');
  }

  // 2. Listing (check common collections: listings, ads, profiles)
  const collections = ['listings', 'ads', 'profiles', 'companions'];
  for (const col of collections) {
    const q = query(collection(db, col), where('uid', '==', uid));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      console.log(`Found in ${col}:`);
      snapshot.forEach(d => {
        console.log(`ID: ${d.id}`, JSON.stringify(d.data(), null, 2));
      });
    } else {
        // Also check by document ID if the ID matches UID
        const d2 = await getDoc(doc(db, col, uid));
        if (d2.exists()) {
             console.log(`Found in ${col} (by ID):`);
             console.log(`ID: ${d2.id}`, JSON.stringify(d2.data(), null, 2));
        }
    }
  }
}

const targetUid = process.argv[2] || 'oUTHYSVlpUYix89TlpFLcqEt9b82';
checkState(targetUid).then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
