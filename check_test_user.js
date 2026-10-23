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

async function checkUser(uid) {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      console.log('User Document Found:');
      console.log(JSON.stringify(userDoc.data(), null, 2));
    } else {
      console.log('User Document NOT FOUND');
    }
  } catch (e) {
    console.error('Error fetching user:', e.message);
  }
}

const uid = 'oUTHYSVlpUYix89TlpFLcqEt9b82'; // Test UID
checkUser(uid).then(() => process.exit(0));
