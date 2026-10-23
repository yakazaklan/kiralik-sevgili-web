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

async function dumpUsers() {
  const snapshot = await getDocs(collection(db, 'users'));
  console.log(`Total users: ${snapshot.size}`);
  snapshot.forEach(doc => {
    const data = doc.data();
    console.log(`ID: ${doc.id} | Name: ${data.name || data.displayName} | Status: ${data.status} | Approved: ${data.isApproved} | Invisible: ${data.isInvisible} | Role: ${data.role} | City: ${data.city} | hasProfile: ${data.hasProfile}`);
  });
}

dumpUsers().then(() => process.exit(0)).catch(console.error);
