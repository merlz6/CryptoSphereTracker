const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    balances: {
      balanceBTC: {type:Number, default:1},
      balanceLTC: {type:Number, default:0},
      balanceXRP: {type:Number, default:0},
      balanceETH: {type:Number, default:0},
      balanceXLM: {type:Number, default:0},
      balanceXMR: {type:Number, default:0},
      balanceADA: {type:Number, default:0},
      balanceTRX: {type:Number, default:0},
      balanceEOS: {type:Number, default:0},
      balanceBCH: {type:Number, default:0}
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;
