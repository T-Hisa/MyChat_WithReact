import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/functions'
import 'firebase/storage'
import firebaseConfig from './firebaseConfig'

let projectName = process.env.PROJECT
if (!firebaseConfig.hasOwnProperty(projectName)) {
  projectName = 'default' // どのプロジェクトにもマッチしなかったらsample のプロジェクトに。
}
const config = firebaseConfig[projectName]

firebase.initializeApp(config)

export default firebase
