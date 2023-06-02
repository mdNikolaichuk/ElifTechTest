import express from 'express'
import cors from 'cors'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

/*DB CONF START*/
const firebaseConfig = {
    apiKey: "AIzaSyADcYpG_K59eWabNTdEDC36lSyPQR5Edl8",
    authDomain: "eliftechtesttask-b6dea.firebaseapp.com",
    projectId: "eliftechtesttask-b6dea",
    storageBucket: "eliftechtesttask-b6dea.appspot.com",
    messagingSenderId: "769510539305",
    appId: "1:769510539305:web:f5a197b43bcaccd5571c38"
};
/*DB CONF END*/
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
/*DB COLECTION REF*/
const Order = db.collection("Orders")
const Shops = db.collection("Shops")
/*DB COLECTION REF*/



const app = express()
app.use(express.json())
app.use(cors())

app.get('/shops', async (req, res) => {
    const snap = await Shops.get()
    const list = snap.docs.map((doc)=> ({id: doc.id, ...doc.data()}))
    res.send(list)
})

app.post('/order', async (req, res) => {
    try {
        const data = req.body
        console.log('Order data', data);
        await Order.add(data)
        res.send({ message: 'Order add' })
    } catch (error) {
        console.log(error);
    }
})

app.listen(5000, () => {
    console.log('server started on 5000');
})