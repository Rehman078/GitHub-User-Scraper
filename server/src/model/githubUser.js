import mongoose from 'mongoose';

const githubUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String },
  avatar_url: { type: String },
  email: { type: String },
  location: { type: String }, 
  created_at: { type: Date },
});

const GitHubUser = mongoose.model('GitHubUser', githubUserSchema);

export default GitHubUser;
