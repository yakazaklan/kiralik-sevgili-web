const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, limit } = require('firebase/firestore');

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
  console.log("Fetching sample users from 'users' collection...");
  const colRef = collection(db, 'users');
  const snapshot = await getDocs(colRef);

  console.log(`Total users found: ${snapshot.size}`);

  let matchCount = 0;
  snapshot.forEach(doc => {
    const data = doc.data();
    const isApproved = data.isApproved;
    const hasProfile = data.hasProfile;
    const isActive = data.isActive;
    const role = data.role;
    const lastUpdate = data.lastUpdate;
    const photos = data.photos || [];
    const name = data.name || data.displayName;

    // Check Android criteria
    const androidMatch = hasProfile === true && isApproved === true && isActive === true;

    if (androidMatch || isApproved || hasProfile) {
        matchCount++;
        console.log(`\n--- User: ${doc.id} ---`);
        console.log(`Name: ${name}`);
        console.log(`Role: ${role} (Type: ${typeof role})`);
        console.log(`isApproved: ${isApproved} (Type: ${typeof isApproved})`);
        console.log(`hasProfile: ${hasProfile} (Type: ${typeof hasProfile})`);
        console.log(`isActive: ${isActive} (Type: ${typeof isActive})`);
        console.log(`lastUpdate: ${lastUpdate ? (lastUpdate.toDate ? lastUpdate.toDate().toISOString() : 'exists but not a timestamp') : 'MISSING'}`);
        console.log(`Photos: ${photos.length} items`);
        if (photos.length > 0) console.log(`Sample Photo: ${photos[0]}`);

        console.log(`Status Flags: rStatus=${data.status}, profile.status=${data.profile?.status}`);
    }
  });

  console.log(`\nPotential visibility matches: ${matchCount}`);
  process.exit(0);
}

diagnose().catch(err => {
  console.error(err);
  process.exit(1);
});
