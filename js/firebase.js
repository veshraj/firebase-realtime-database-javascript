var firebaseConfig = {
  apiKey: "AIzaSyBvy-vU4PtYZfRdszwGS0Rdux4Hut2uKgo",
  authDomain: "fir-test-3b5a2.firebaseapp.com",
  databaseURL: "https://fir-test-3b5a2.firebaseio.com",
  projectId: "fir-test-3b5a2",
  storageBucket: "fir-test-3b5a2.appspot.com",
  messagingSenderId: "70543494334",
  appId: "1:70543494334:web:755765f817aeabe0eb62ef",
  measurementId: "G-HBHP5QSXFN",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebase.database();

function getReference(parentReference) {
  return database.ref(collectionRefs[parentReference]).child(childReference);
}

function addRow(parentReference, data, childReference = null) {
  const rootRef = database.ref(parentReference);
  const autoId = rootRef.push().key;
  rootRef
    .child(autoId)
    .set(data)
    .then((response) => {
      toastr.success(parentReference + " info has been created successfully!!");
    });
}

function updateRow(parentReference, data, childReference) {
  const rootRef = database.ref(parentReference);
  rootRef
    .child(childReference)
    .update(data)
    .then(() => {
      toastr.success(parentReference + " info has been updated successfully!!");
    });
}

function deleteRow(parentReference, childReference) {
  const rootRef = database.ref(parentReference);
  rootRef
    .child(childReference)
    .remove()
    .then()
    .then((response) => {
      toastr.success(parentReference + " has been deleted successfully!!");
    });
}

function watch(parentReference, childReference, callback) {
  const rootRef = database.ref(parentReference);
  if (childReference) {
    rootRef = rootRef.child(childReference);
  }
  rootRef.on("value", (response) => {
    toastr.info("Change detected in the list");
    if (callback) {
      callback(response.val());
    }
  });
}
