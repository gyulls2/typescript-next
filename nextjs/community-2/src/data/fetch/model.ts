import { Post, User } from "@/types";
import moment from "moment";
import { Collection, Db, MongoClient } from "mongodb";

interface Seq {
  _id: string;
  no: number;
}

interface CommunityDb extends Db {
  post: Collection<Post>;
  user: Collection<User>;
  seq: Collection<Seq>;
}

const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}:${process.env.DB_PORT}`;
// const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = process.env.DB_NAME;
console.log(
  `try to connect...${process.env.DB_SERVER}: ${process.env.DB_PORT}`
);

// Use connect method to connect to the server
await client.connect();
console.log("Connected successfully to server");
const db = client.db(dbName) as CommunityDb;
db.post = db.collection("post");
db.user = db.collection("user");
db.seq = db.collection("seq");

const model = {
  post: {
    async list(type: string) {
      const data = await db.post
        .find({ type })
        .limit(10)
        .sort({ _id: -1 })
        .toArray();
      console.log(data);
      return data;
    },
    async detail(_id: number) {
      const data = await db.post.findOne({ _id });
      console.log(data);
      return data;
    },
    async delete(_id: number) {
      const data = await db.post.deleteOne({ _id });
      console.log(data);
      return data;
    },
    async update(_id: number, post: Post) {
      const data = await db.post.updateOne({ _id }, { $set: post });
      console.log(data);
      return data;
    },
    async add(post: Post) {
      post.createdAt = post.updatedAt = moment().format("YYYY.MM.DD HH:mm:ss");
      post.views = 1;
      const seq = await db.seq.findOneAndUpdate(
        { _id: "post" },
        { $inc: { no: 1 } }
      );
      post._id = seq!.no;
      const data = await db.post.insertOne(post);
      console.log(data);
      return data;
    },
  },
  user: {},
};

export default model;
