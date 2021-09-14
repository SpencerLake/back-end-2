const { readSync } = require('fs');
const house = require('./db.json')
let houseId = 4;

module.exports = {

    getHouses: (req,res) => {
        res.status(200).send(house)
    },

    createHouses: (req,res) => {
        const {address, price, imageURL} = req.body;
        let newHouse = {
            id: houseId,
            address,
            price,
            imageURL
        }
        if (!address || !price || !imageURL) {
            res.status(400).send('Data missing!')
        } else {
            house.push(newHouse)
            houseId++
            return res.status(200).send(house)
        }
    },

    updateHouses: (req,res) => {
        const {id} = req.params
        const {type} = req.body
        let index = house.findIndex(h => h.id === +id)
        if (house[index].price <= 1000 && type === 'minus') {
            res.status(400).send('Cannot be lower than 0')
        } else if (type === 'plus') {
            house[index].price += 1000
            res.status(200).send(house)
        } else if (type === 'minus') {
            house[index].price -= 1000
            res.status(200).send(house)
        } else {
            res.status(400)
        }
    },

    deleteHouses: (req,res) => {
        const {id} = req.params
        let index = house.findIndex(h => h.id === +id)
        house.splice(index, 1)
        res.status(200).send(house)
    }
}