import User from "../models/User.js"
import Curriculum from "../models/Curriculum.js"
import Yup from 'yup'
import { Op } from "sequelize";

function isValidDay(day, month, year) {
    if (day < 1 || day > 31) {
        return false;
    }

    if (month === 2) {
        if ((year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0)) {
            return day <= 29;
        } else {
            return day <= 28;
        }
    } else if ([4, 6, 9, 11].includes(month)) {
        return day <= 30;
    } else {
        return true;
    }
}

const dateValidationSchema = {
    entry_date_day: Yup
        .number()
        .integer('Entry day must be a integer number.')
        .min(1, 'Entry day must start from 1.')
        .test(
            'validEntryDay',
            'Invalid entry day.',
            function (value) {
                const entryYear = this.resolve(Yup.ref('entry_date_year'))
                const entryMonth = this.resolve(Yup.ref('entry_date_month'))

                return isValidDay(value, entryMonth, entryYear)
            }
        )
        .typeError('Entry day must be a number.'),
    entry_date_month: Yup
        .number()
        .integer('Entry month must be a integer number.')
        .min(1, 'Entry month must start from 1.')
        .max(12, 'Entry month must end to 12.')
        .when('entry_date_day', (entryDateDay, field) => {
            return entryDateDay[0] ? field.required('When entry day exists entry month must exist as well.') : field
        })
        .typeError('Entry month must be a number.'),
    entry_date_year: Yup
        .number()
        .integer('Entry year must be a integer number.')
        .min(1900, 'Entry year must start from 1900.')
        .test(
            'entryYearRequiredWithExitYearProfessional',
            'Entry year is require when exit year exists',
            function (value) {
                const exitYear = this.resolve(Yup.ref('exit_date_year'))

                if (exitYear) return !!value

                return true
            }
        )
        .when('entry_date_month', (entryDateMonth, field) => {
            return entryDateMonth[0] ? field.required('When entry month exists entry year must exist as well.') : field
        })
        .typeError('Entry year must be a number.'),
    exit_date_day: Yup
        .number()
        .integer('Exit day must be a integer number.')
        .min(1, 'Exit day must start from 1.')
        .test(
            'validExitDay',
            'Invalid exit day.',
            function (value) {
                const exitYear = this.resolve(Yup.ref('exit_date_year'))
                const exitMonth = this.resolve(Yup.ref('exit_date_month'))

                return isValidDay(value, exitMonth, exitYear)
            }
        )
        .typeError('Exit day must be a number.'),
    exit_date_month: Yup
        .number()
        .integer('Exit month must be a integer number.')
        .min(1, 'Exit month must start from 1.')
        .max(12, 'Exit month must end to 12.')
        .when('exit_date_day', (exitDateDay, field) => {
            return exitDateDay[0] ? field.required('When exit day exists exit month must exist as well.') : field
        })
        .typeError('Exit month must be a number.'),
    exit_date_year: Yup
        .number()
        .integer('Exit year must be a integer number.')
        .min(1900, 'Exit year must start from 1900.')
        .when('exit_date_month', (exitDateMonth, field) => {
            return exitDateMonth[0] ? field.required('When exit month exists exit year must exist as well.') : field
        })
        .typeError('Exit year must be a number.'),
}

const curriculumSchema = Yup.object().shape({
    name: Yup.string().min(1, 'Name must be a minimum of 1 character.').strict().typeError('Name must be a string.').required('Name is required.'),
    role: Yup.string().min(1, 'Role must be a minimum of 1 character.').strict().max(80, 'The role must be a maximum of 80 characters.').typeError('Role must be a string.'),
    cell_phone: Yup.string().min(1, 'Cellphone must be a minimum of 1 character.').strict().max(20, 'The cell phone number must be a maximum of 20 characters.').typeError('Cell phone must be a string.'),
    telephone: Yup.string().min(1, 'Telephone must be a minimum of 1 character.').strict().max(20, 'The telephone number must be a maximum of 20 characters.').typeError('Telephone must be a string.'),
    address: Yup.string().min(1, 'Address must be a minimum of 1 character.').strict().typeError('Address must be a string.'),
    email: Yup.string().min(1, 'Email must be a minimum of 1 character.').strict().typeError('Email must be a string.'),
    linkedin: Yup.string().min(1, 'Linkedin must be a minimum of 1 character.').strict().typeError('Linkedin must be a string.'),
    twitter: Yup.string().min(1, 'Twitter must be a minimum of 1 character.').strict().typeError('Twitter must be a string.'),
    facebook: Yup.string().min(1, 'Facebook must be a minimum of 1 character.').strict().typeError('Facebook must be a string.'),
    github: Yup.string().min(1, 'Github must be a minimum of 1 character.').strict().typeError('Github must be a string.'),
    dribbble: Yup.string().min(1, 'Dribbble must be a minimum of 1 character.').strict().typeError('Dribbble must be a string.'),
    youtube: Yup.string().min(1, 'Youtube must be a minimum of 1 character.').strict().typeError('Youtube must be a string.'),
    drivers_license: Yup.string().min(1, 'Drivers license must be a minimum of 1 character.').strict().typeError('Drivers licence must be a string.'),
    custom_personal_datum_1: Yup
        .object()
        .shape({
            field: Yup.string().min(1, 'Field must be a minimum of 1 character.').required('Field of custom personal datum 1 is required.'),
            value: Yup.string().min(1, 'Value must be a minimum of 1 character.').required('Value of custom personal datum 1 is required.'),
        })
        .noUnknown()
        .strict(),
    custom_personal_datum_2: Yup
        .object()
        .shape({
            field: Yup.string().min(1, 'Field must be a minimum of 1 character.').required('Field of custom personal datum 2 is required.'),
            value: Yup.string().min(1, 'Value must be a minimum of 1 character.').required('Value of custom personal datum 2 is required.'),
        })
        .noUnknown()
        .strict(),
    skills: Yup
        .array()
        .of(Yup.string().min(1, 'Skill must be a minimum of 1 character.').typeError('Skills must be an array of string.'))
        .min(1, 'Skills must have at least 1 skill.')
        .typeError('Skills must be an array of string.'),
    languages: Yup
        .array()
        .of(Yup.object().shape({
            language: Yup.string().min(1, 'Language must be a minimum of 1 character.').required('Language is required.').typeError('Language must be a string.'),
            level: Yup.string().min(1, 'Level must be a minimum of 1 character.').required('Level is required.').typeError('Level must be a string.'),
        }).noUnknown().strict().typeError('Languages must be an array of object.'))
        .min(1, 'Languages must have at least 1 language.')
        .typeError('Languages must be an array of object.'),
    about_me: Yup.string().min(1, 'About me must be a minimum of 1 character.').max(400, 'About me must be a maximum of 400 characters.').typeError('About me must be a string.'),
    professional_experiences: Yup
        .array()
        .of(Yup.object().shape({
            role: Yup.string().required('Role is required.').min(1, 'Role must be a minimum of 1 character.').typeError('Role must be a string.'),
            company: Yup.string().required('Company is required.').min(1, 'Company must be a minimum of 1 character.').typeError('Company must be a string.'),
            address: Yup.string().min(1, 'Address must be a minimum of 1 character.').typeError('Address must be a string.'),
            description: Yup.string().min(1, 'Description must be a minimum of 1 character.').typeError('Description must be a string.'),
            ...dateValidationSchema,
        }).strict().noUnknown().typeError('Professional experience must be a object.'))
        .min(1, 'Professional experiences must have at least 1 professional experience.')
        .typeError('Professional experiences must be an array of object.'),
    educations: Yup
        .array()
        .of(Yup.object().shape({
            course: Yup.string().required('Course is required.').typeError('Education course must be a string.'),
            institution: Yup.string().typeError('Education institution must be a string.'),
            address: Yup.string().typeError('Education address must be a string.'),
            ...dateValidationSchema,

        }).strict().noUnknown())
        .min(1, 'Educations must have at least 1 education.')
        .typeError('Educations must be an array of object.'),
    custom_topic_1: Yup
        .object()
        .shape({
            title: Yup.string().required('Custom topic 1 title is required.').typeError('Custom topic 1 title must be a string.'),
            description: Yup.string().required('Custom topic 1 description is required.').typeError('Custom topic 1 description must be a string.'),
        })
        .when('custom_topic_2', (customTopic2, field) => {
            return customTopic2[0] ? field.required('Custom topic 1 must exist before custom topic 2.') : field
        })
        .strict()
        .noUnknown()
        .typeError('Custom topic must be an object.')
    ,
    custom_topic_2: Yup
        .object()
        .shape({
            title: Yup.string().required('Custom topic 2 title is required.').typeError('Custom topic 2 title must be a string.'),
            description: Yup.string().required('Custom topic 2 description is required.').typeError('Custom topic 2 description must be a string.'),
        })
        .strict()
        .noUnknown()
        .typeError('Custom topic must be an object.')
    ,
}).noUnknown().strict()

class CurriculumsController {
    async index(req, res) {
        try {
            const user_id = parseInt(req.params.userId)

            const search = req.query.search
            let amount = parseInt(req.query.amount)

            if (!Number.isInteger(amount) || amount < 0) amount = 2

            const page = req.query.page || 1
            const limit = amount || 2

            let where = { user_id }

            if (search) {
                where = {
                    ...where,
                    name: { [Op.iLike]: `%${search}%` }
                }

            }
            const curriculums = await Curriculum.findAll({
                where,
                limit,
                offset: limit * page - limit
            })

            return res.json(curriculums)
        } catch (err) {
            return res.status(500).json({ error: 'Internal server error.' })
        }
    }

    async show(req, res) {
        try {
            const user_id = parseInt(req.params.userId)
            const id = parseInt(req.params.id)

            if (!id) return res.status(404).json({ error: 'Curriculum not found..' })

            const curriculum = await Curriculum.findOne({
                where: { id, user_id }
            })

            if (!curriculum) return res.status(404).json({ error: 'Curriculum not found.' })

            return res.json(curriculum)
        } catch (err) {
            return res.status(500).json({ error: 'Internal server error.' })
        }
    }

    async count(req, res) {
        let count = 0
        console.log('oi')

        try {
            const user_id = parseInt(req.params.userId)
            const search = req.query.search

            let where = { user_id }

            if (search) {
                where = {
                    ...where,
                    name: { [Op.iLike]: `%${search}%` }
                }
            }

            count = await Curriculum.count({ where })
        } catch (err) { }

        res.json({ count })
    }

    async create(req, res) {
        try {
            const user_id = parseInt(req.params.userId)

            const receivedCurriculum = { ...req.body }

            const validatedReceivedCurriculum = await curriculumSchema.validate(receivedCurriculum)

            const { id: curriculum_id } = await Curriculum.create({ ...validatedReceivedCurriculum, user_id })

            return res.json({ ...validatedReceivedCurriculum, user_id, curriculum_id })
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                return res.status(422).json({ error: 'Error on validate schema.', details: err.errors[0] })
            }

            return res.status(500).json({ error: 'Internal server error.' })
        }
    }

    async update(req, res) {
        try {
            const user_id = parseInt(req.params.userId)
            const id = parseInt(req.params.id)

            if (!id) return res.status(404).json({ error: 'Curriculum not found.' })

            const receveidCurriculum = req.body

            const curriculum = await Curriculum.findOne({
                where: { id, user_id }
            })

            if (!curriculum) return res.status(404).json({ error: 'Curriculum not found.' })

            const validadedReceivedCurriculum = await curriculumSchema.validate(receveidCurriculum)

            const updatedCurriculum = await curriculum.update(validadedReceivedCurriculum)

            return res.json(updatedCurriculum)
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                return res.status(422).json({ error: 'Error on validate schema.', details: err.errors[0] })
            }

            return res.status(500).json({ error: 'Internal server error.' })
        }


    }

    async destroy(req, res) {
        const user_id = parseInt(req.params.userId)
        const id = parseInt(req.params.id)

        if (!id) return res.status(404).json({ error: 'Curriculum not found.' })

        const curriculum = await Curriculum.findOne({
            where: { id, user_id }
        })

        if (!curriculum) return res.status(404).json({ error: 'Curriculum not found.' })

        await curriculum.destroy()

        return res.json(curriculum)
    }
}

export const curriculums = new CurriculumsController()