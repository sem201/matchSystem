import NoobsUserInfo from "../models/Noobs_user_info.js";
import NoobsMasterChamp from "../models/Noobs_master_champ.js";
import NoobsRecentFriends from "../models/Noobs_Recent_Friend.js";
import Users from "../models/User.js";

NoobsUserInfo.hasMany(NoobsMasterChamp, {
  foreignKey : 'user_id',
  sourceKey: 'id',
  onDelete: 'CASCADE', 
});

NoobsMasterChamp.belongsTo(NoobsUserInfo, {
  foreignKey: 'user_id',
  targetKey: 'id',
});

Users.hasMany(NoobsRecentFriends, {
  foreignKey: 'user_id', // Users.id와 연결
  as: 'AddedFriends'     // 별칭: 사용자가 추가한 친구들
});

NoobsRecentFriends.belongsTo(Users, {
  foreignKey: 'id', // Friends.friend_id는 Users.id를 참조
  as: 'FriendDetails'      // 별칭: 친구의 상세정보
});
