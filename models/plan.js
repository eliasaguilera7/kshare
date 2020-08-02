const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true // This must exist
  },
  strategy: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['DRAFT', 'PUBLISHED'],
    default: 'DRAFT'
  }
}, {
  timestamps: true,
  toJSON:{
    getters: true
  }
});

// Query Helpers
PlanSchema.query.drafts = function () {
  return this.where({
    status: 'DRAFT'
  })
};

PlanSchema.query.published = function () {
  return this.where({
    status: 'PUBLISHED'
  })
};

PlanSchema.virtual('synopsis')
.get(function () {
  const post = this.content;
  return post
    .replace(/(<([^>]+)>)/ig,"")
    .substring(0, 250);
});



module.exports = mongoose.model('Plan', PlanSchema);