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

async function check() {
  const colRef = collection(db, 'users');
  const snapshot = await getDocs(colRef);
  snapshot.forEach(doc => {
    if (doc.id === 'xlYrm8oKCQbn5w17mqzfG8b0RDA3' || doc.id === '4XmU28uhL6bLrrcY26KTDWpXd613') {
       console.log(`User ID: ${doc.id}`);
       console.log(JSON.stringify(doc.data(), null, 2));
    }
  });
  process.exit(0);
}

check().catch(err => {
  console.error(err);
  process.exit(1);
});
