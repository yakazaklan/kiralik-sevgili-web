const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, Timestamp } = require('firebase/firestore');

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

async function createTestUser() {
  const userId = 'oUTHYSVlpUYix89TlpFLcqEt9b82';
  const email = '35tolgayenice@gmail.com';

  console.log(`Creating test user in Firestore: ${email} (ID: ${userId})`);

  await setDoc(doc(db, 'users', userId), {
    uid: userId,
    email: email,
    displayName: 'Tolga Deneme',
    isActive: true,
    hasProfile: true,
    createdAt: Timestamp.now()
  });

  console.log('Test user created successfully.');
  process.exit(0);
}

createTestUser().catch(err => {
  console.error(err);
  process.exit(1);
});
