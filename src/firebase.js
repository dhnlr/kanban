import Firebase from 'firebase'

var config = {
  databaseURL: 'your/url/here',
  projectId: 'your project id'
}

const firebaseApp = Firebase.initializeApp({
  // Populate your firebase configuration data here.
  ...config
})

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
const firebase = firebaseApp.database()
export default firebase
