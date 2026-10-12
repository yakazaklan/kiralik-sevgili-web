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

async function diagnose() {
  console.log("Fetching approved users from 'users' collection using query...");
  const usersRef = collection(db, 'users');

  // Try a query that matches security rules exactly
  const q = query(
    usersRef,
    where("status", "==", "approved")
  );

  try {
    const snapshot = await getDocs(q);
    console.log(`Total approved users found: ${snapshot.size}`);

    snapshot.forEach(doc => {
      const data = doc.data();
      console.log(`\n--- User: ${doc.id} ---`);
      console.log(`Name: ${data.name || data.displayName}`);
      console.log(`isApproved: ${data.isApproved} (${typeof data.isApproved})`);
      console.log(`hasProfile: ${data.hasProfile} (${typeof data.hasProfile})`);
      console.log(`isActive: ${data.isActive} (${typeof data.isActive})`);
      console.log(`isInvisible: ${data.isInvisible} (${typeof data.isInvisible})`);
      console.log(`status: ${data.status}`);
      console.log(`role: ${data.role}`);
      if (data.profile) {
          console.log(`Nested Profile isActive: ${data.profile.isActive}`);
          console.log(`Nested Profile isApproved: ${data.profile.isApproved}`);
      }
    });
  } catch (err) {
    console.error("Query failed:", err.message);
  }
  process.exit(0);
}

diagnose();
