const express = require('express');
const router = express.Router()
const Schema = require('../model/schema');


router.get('/grocery/getAll', async (req, res) => {
    const result = await Schema.find();
    res.send(result);

})
router.post('/grocery/add', async (req, res) => {
    await Schema.create(req.body);
    res.send({ result: 'Success' }).json()

})
// update purchased status using request body's id
router.put('/grocery/updatePurchaseStatus', async (req, res) => {
    const body = req.body
    await Schema.findByIdAndUpdate(body._id, { $set: body })
    res.send({ result: 'Success' }).json()

})
// update purchased status using request params' id
router.put('/grocery/updatePurchaseStatus/:id', async (req, res) => {
    const id = req.params.id
    await Schema.findByIdAndUpdate(id, { $set: { isPurchased: true } })
    res.send({ result: 'Success' }).json()

})

router.delete('/grocery/deleteGroceryItem/:id', async (req, res) => {
    const id = req.params.id
    await Schema.findByIdAndDelete(id);
    res.send({ result: 'Success' }).json()
})
module.exports = router
