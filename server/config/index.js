import sequelize from "./config/db.js";
import NoobsUserInfo from "../models/Noobs_user_info.js";
import NoobsMasterChamp from "../models/Noobs_master_champ.js";


NoobsUserInfo.hasMany(NoobsMasterChamp, {
  foreignKey : 'user_id',
  sourceKey: 'id',
  onDelete: 'CASCADE', 
});

NoobsMasterChamp.belongsTo(NoobsUserInfo, {
  foreignKey: 'user_id',
  targetKey: 'id',
});
