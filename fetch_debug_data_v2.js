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

async function check() {
  console.log("--- SEARCHING FOR ALL APPROVED USERS ---");
  try {
    const colRef = collection(db, 'users');
    // Try without index-heavy query first to see what's there
    const snapshot = await getDocs(colRef);
    console.log(`Total users in collection: ${snapshot.size}`);

    let approvedCount = 0;
    snapshot.forEach(doc => {
      const data = doc.data();
      const isApproved = data.isApproved === true || (data.profile && data.profile.isApproved === true) || data.status === 'approved';
      const hasProfile = data.hasProfile === true;

      if (isApproved) {
        approvedCount++;
        console.log(`ID: ${doc.id} | Name: ${data.name || data.displayName} | Approved: ${isApproved} | HasProfile: ${hasProfile} | City: ${data.city} | Role: ${data.role}`);
        if (doc.id === '4XmU28uhL6bLrrcY26KTDWpXd613' || doc.id === 'xlYrm8oKCQbn5w17mqzfG8b0RDA3') {
           // console.log(JSON.stringify(data, null, 2));
        }
      }
    });
    console.log(`Total Approved found: ${approvedCount}`);
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
  process.exit(0);
}

check().catch(err => {
  console.error(err);
  process.exit(1);
});
