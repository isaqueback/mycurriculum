import Sequelize, { Model } from "sequelize";

class Curriculum extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            role: Sequelize.STRING(80),
            cell_phone: Sequelize.STRING(20),
            telephone: Sequelize.STRING(20),
            address: Sequelize.STRING,
            email: Sequelize.STRING,
            linkedin: Sequelize.STRING,
            twitter: Sequelize.STRING,
            facebook: Sequelize.STRING,
            github: Sequelize.STRING,
            dribbble: Sequelize.STRING,
            youtube: Sequelize.STRING,
            drivers_license: Sequelize.STRING,
            custom_personal_datum_1: Sequelize.JSONB,
            custom_personal_datum_2: Sequelize.JSONB,
            skills: Sequelize.ARRAY(Sequelize.STRING(50)),
            languages: Sequelize.JSONB,
            about_me: Sequelize.STRING(400),
            professional_experiences: Sequelize.JSONB,
            educations: Sequelize.JSONB,
            custom_topic_1: Sequelize.JSONB,
            custom_topic_2: Sequelize.JSONB,
        }, {
            sequelize,
        })
    }

    static associate(models) {
        this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user',})
    }
}

export default Curriculum