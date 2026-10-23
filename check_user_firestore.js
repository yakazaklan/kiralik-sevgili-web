const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, where } = require('firebase/firestore');

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

async function checkUser() {
  const email = 'yakazago@gmail.com';
  console.log(`Checking Firestore users collection for: ${email}`);

  const colRef = collection(db, 'users');
  const snapshot = await getDocs(colRef);

  let found = false;
  snapshot.forEach(doc => {
    const data = doc.data();
    if (data.email && data.email.toLowerCase() === email.toLowerCase()) {
      console.log('--- USER FOUND ---');
      console.log(`Document ID: ${doc.id}`);
      console.log(`Data:`, JSON.stringify(data, null, 2));
      found = true;
    }
  });

  if (!found) {
    console.log('User not found in Firestore users collection.');
    // Let's print a few emails to see what's in there
    console.log('Sample emails in collection:');
    let count = 0;
    snapshot.forEach(doc => {
      if (count < 5) {
        console.log(`- ${doc.data().email}`);
        count++;
      }
    });
  }
  process.exit(0);
}

checkUser().catch(err => {
  console.error(err);
  process.exit(1);
});
