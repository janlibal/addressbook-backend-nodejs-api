import { IContactData, IUserData } from '../interfaces/IContact'
import credentials from '../config/firestore/key.json'
import admin from 'firebase-admin'

admin.initializeApp({
    credential: admin.credential.cert(credentials as admin.ServiceAccount),
})

const _db = admin.firestore()

async function save(contactData: IContactData, userData:IUserData) {
    return await _db.collection(userData.userId).doc(userData.fullName).set(contactData)
}

export default {
 save
}
