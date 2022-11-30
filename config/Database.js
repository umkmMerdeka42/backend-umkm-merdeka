import { Sequelize } from 'sequelize';

const db = new Sequelize('umkm_merdeka_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

export default db;
