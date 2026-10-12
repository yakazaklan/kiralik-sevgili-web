const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

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

async function checkEmails() {
  const colRef = collection(db, 'users');
  const snapshot = await getDocs(colRef);

  console.log(`Total users in Firestore: ${snapshot.size}`);
  snapshot.forEach(doc => {
    const data = doc.data();
    console.log(`ID: ${doc.id}, Email: ${data.email}`);
  });
  process.exit(0);
}

checkEmails().catch(err => {
  console.error(err);
  process.exit(1);
});
