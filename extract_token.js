const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, where, orderBy, limit } = require('firebase/firestore');

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

async function extractToken() {
  console.log('Searching for deletion tokens for 35tolgayenice@gmail.com...');
  const colRef = collection(db, 'account_deletion_requests');
  // We can't use complex queries if indexes aren't set, so let's just fetch all and filter client-side
  const snapshot = await getDocs(colRef);

  let found = false;
  snapshot.forEach(doc => {
    const data = doc.data();
    if (data.email === '35tolgayenice@gmail.com' && data.status === 'pending') {
      console.log('--- TOKEN FOUND ---');
      console.log(`Token: ${doc.id}`);
      console.log(`Created At: ${data.createdAt?.toDate?.() || data.createdAt}`);
      console.log(`Expires At: ${data.expiresAt?.toDate?.() || data.expiresAt}`);
      console.log('-------------------');
      found = true;
    }
  });

  if (!found) {
    console.log('No pending deletion token found for this email.');
  }
  process.exit(0);
}

extractToken().catch(err => {
  console.error(err);
  process.exit(1);
});
