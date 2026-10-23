const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Assuming local environment has credentials or we are just checking structure
process.env.GCLOUD_PROJECT = 'kiralik-sevgili';

try {
  initializeApp({
    projectId: 'kiralik-sevgili'
  });
} catch (e) {
  // Already initialized
}

const db = getFirestore();

async function run() {
  console.log("Starting diagnosis with Admin SDK...");
  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.limit(5).get();

    if (snapshot.empty) {
      console.log("FATAL: 'users' collection is EMPTY in project 'kiralik-sevgili'.");
      return;
    }

    console.log(`Found ${snapshot.size} users. Sample data:`);
    snapshot.forEach(doc => {
      console.log(`\nID: ${doc.id}`);
      console.log(JSON.stringify(doc.data(), null, 2));
    });
  } catch (e) {
    console.error("Diagnosis failed:", e.message);
  }
}

run();
