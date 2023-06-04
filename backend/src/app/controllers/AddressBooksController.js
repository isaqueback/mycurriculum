import User from "../models/User.js"
import AddressBook from "../models/AddressBook.js"
import * as Yup from 'yup'

class AddressBooksController {
    async index(req, res) {
        try {
            const userId = parseInt(req.params.userId)

            if (!Number.isInteger(userId)) return res.status(404).json({ error: 'User not found.' })

            const user = await User.findByPk(userId, {
                include: [{ model: AddressBook, as: 'address_books' }]
            })

            if (!user) return res.status(404).json({ error: 'User not found.' })

            const addressBooks = user.address_books

            res.json(addressBooks)
        } catch (err) {
            res.status(500).json({ error: 'Internal server error.' })
        }
    }

    async show(req, res) {
        try {
            const userId = parseInt(req.params.userId)
            const id = parseInt(req.params.id)

            if (!Number.isInteger(userId)) return res.status(404).json({ error: 'User not found.' })
            if (!Number.isInteger(id)) return res.status(404).json({ error: 'Address book not found.' })

            const user = await User.findByPk(userId, {
                include: [{ model: AddressBook, as: 'address_books' }]
            })

            if (!user) return res.status(404).json({ error: 'User not found.' })

            const addressBooks = user.address_books

            const addressBook = addressBooks.find(obj => obj.id === id)

            if (!addressBook) return res.status(404).json({ error: 'Address book not found.' })

            res.json(addressBook)
        } catch (err) {
            res.status(500).json({ error: 'Internal server error.' })
        }
    }

    async create(req, res) {
        try {
            const userId = parseInt(req.params.userId)

            if (!Number.isInteger(userId)) return res.status(404).json({ error: 'User not found.' })

            const { name, cell_phone, telephone, country, district, city, address, address_complement, cep } = req.body
            const newAddressBookInfo = { name, cell_phone, telephone, country, district, city, address, address_complement, cep }

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                cell_phone: Yup.string().max(20),
                telephone: Yup.string().max(20),
                country: Yup.string(),
                district: Yup.string(),
                city: Yup.string(),
                address: Yup.string(),
                address_complement: Yup.string(),
                cep: Yup.string(),
            })

            const user = await User.findByPk(userId)

            if (!user) return res.status(404).json({ error: 'User not found.' })

            if (! await schema.isValid(newAddressBookInfo)) return res.status(401).json({ error: 'Error on validate schema.' })

            const newAddressBook = await AddressBook.create({ ...newAddressBookInfo, user_id: userId })

            res.status(201).json(newAddressBook)
        } catch (err) {
            res.status(500).json({ error: 'Internal server error.' })
        }
    }

    async update(req, res) {
        try {
            const userId = parseInt(req.params.userId)
            const id = parseInt(req.params.id)

            if (!Number.isInteger(userId)) return res.status(404).json({ error: 'User not found.' })
            if (!Number.isInteger(id)) return res.status(404).json({ error: 'Address book not found.' })

            const { name, cell_phone, telephone, country, district, city, address, address_complement, cep } = req.body
            const addressBooktoUpdate = { name, cell_phone, telephone, country, district, city, address, address_complement, cep }

            const schema = Yup.object().shape({
                name: Yup.string(),
                cell_phone: Yup.string().max(20),
                telephone: Yup.string().max(20),
                country: Yup.string(),
                district: Yup.string(),
                city: Yup.string(),
                address: Yup.string(),
                address_complement: Yup.string(),
                cep: Yup.string(),
            })

            const user = await User.findByPk(userId)
            if (!user) return res.status(404).json({ error: 'User not found.' })

            const addressBook = await AddressBook.findByPk(id)
            if (!addressBook) return res.status(404).json({ error: 'Address book not found.' })

            if (! await schema.isValid(addressBooktoUpdate)) return res.status(401).json({ error: 'Error on validate schema.' })

            await addressBook.update(addressBooktoUpdate)

            res.json(addressBook)
        } catch (err) {
            res.status(500).json({ error: 'Internal server error.' })
        }
    }

    async destroy(req, res) {
        try {
            const userId = parseInt(req.params.userId)
            const id = parseInt(req.params.id)

            if (!Number.isInteger(userId)) return res.status(404).json({ error: 'User not found.' })
            if (!Number.isInteger(id)) return res.status(404).json({ error: 'Address book not found.' })

            const user = await User.findByPk(userId)

            if (!user) return res.status(404).json({ error: 'User not found.' })

            const addressBook = await AddressBook.findByPk(id)

            if (!addressBook) return res.status(404).json({ error: 'Address book not found.' })

            await addressBook.destroy()

            res.json(addressBook)
        } catch (err) {
            res.status(500).json({ error: 'Internal server error.' })
        }
    }
}

export const addressBooks = new AddressBooksController()