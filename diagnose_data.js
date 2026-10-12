const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize with a specific project ID
try {
  initializeApp({
    projectId: 'kiralik-sevgili'
  });
} catch (e) {
  console.log("Initialization info:", e.message);
}

const db = getFirestore();

async function run() {
  console.log("Checking Firestore project: kiralik-sevgili");
  try {
    const usersRef = db.collection('users');

    // Check for any companion/model to see their structure
    console.log("Searching for companions/models...");
    const snapshot = await usersRef.where('role', 'in', ['companion', 'model']).limit(10).get();

    if (snapshot.empty) {
      console.log("No users with role 'companion' or 'model' found.");
      // Let's see what roles actually exist
      const allSnapshot = await usersRef.limit(10).get();
      console.log("Sample roles in DB:");
      allSnapshot.forEach(doc => {
        console.log(`ID: ${doc.id}, Role: ${doc.data().role}`);
      });
      return;
    }

    snapshot.forEach(doc => {
      const d = doc.data();
      console.log(`\nID: ${doc.id}`);
      console.log(`  Name: ${d.name || d.displayName}`);
      console.log(`  Role: ${d.role} (${typeof d.role})`);
      console.log(`  isApproved: ${d.isApproved} (${typeof d.isApproved})`);
      console.log(`  status: ${d.status} (${typeof d.status})`);
      console.log(`  isActive: ${d.isActive} (${typeof d.isActive})`);
      console.log(`  isInvisible: ${d.isInvisible} (${typeof d.isInvisible})`);
      console.log(`  hasProfile: ${d.hasProfile} (${typeof d.hasProfile})`);
      console.log(`  deletedAt: ${d.deletedAt}`);
    });

  } catch (e) {
    console.error("Error during diagnosis:", e);
  }
}

run();
