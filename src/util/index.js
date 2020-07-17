import { firebase } from '../firebase/config';

// 1. PHarmacy id is given to us
// 2. Search the firebase collection of pharmacy and get the document with given `		///		Pharmacyid
// 3. retrive the queue id.
// 4. Search firebase collection of queues with retrived queue id
// 5. Return the Array of queues / users

//importing function created
export const handleQueryId = (pharmacyId) => {
  //finding the queryId given the pharmacy id
	firebase
	.firestore()
	.collection("pharmacies")
	.doc(pharmacyId)
	.get()
	.then(doc => {
		return doc.data()['curQueuesId'];
	})
}