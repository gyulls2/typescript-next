var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MongoClient } from "mongodb";
import moment from "moment";
const url = "mongodb://sample:sample11!!@db.fesp.shop:27017";
// const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "00-sample";
console.log("try to connect...");
// Use connect method to connect to the server
await client.connect();
console.log("Connected successfully to server");
const db = client.db(dbName);
db.post = db.collection("post");
db.user = db.collection("user");
db.seq = db.collection("seq");
const model = {
    post: {
        list(type) {
            return __awaiter(this, void 0, void 0, function* () {
                const data = yield db.post
                    .find({ type })
                    .limit(10)
                    .sort({ _id: -1 })
                    .toArray();
                return data;
            });
        },
        detail(_id) {
            return __awaiter(this, void 0, void 0, function* () {
                const data = yield db.post.findOneAndUpdate({ _id }, { $inc: { views: 1 } }, { returnDocument: "after" });
                return data;
            });
        },
        delete(_id) {
            return __awaiter(this, void 0, void 0, function* () {
                const data = yield db.post.deleteOne({ _id });
                return data;
            });
        },
        update(_id, post) {
            return __awaiter(this, void 0, void 0, function* () {
                post.createdAt = post.updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
                post.views = 1;
                const seq = yield db.seq.findOneAndUpdate({ _id: post }, { $inc: { no: 1 } });
                post._id = seq.no;
                const data = yield db.post.updateOne({ _id }, { $set: post });
                return data;
            });
        },
        add(post) {
            return __awaiter(this, void 0, void 0, function* () {
                post.createdAt = post.updatedAt = moment().format("YYYY.MM.DD HH:mm:ss");
                post.views = 1;
                const seq = yield db.seq.findOneAndUpdate({ _id: "post" }, { $inc: { no: 1 } });
                post._id = seq.no;
                const data = yield db.post.insertOne(post);
                console.log(data);
                return data;
            });
        },
        addComment(_id, comment) {
            return __awaiter(this, void 0, void 0, function* () {
                comment.createdAt = comment.updatedAt = moment().format("YYYY.MM.DD HH:mm:ss");
                const seq = yield db.seq.findOneAndUpdate({ _id: "reply" }, { $inc: { no: 1 } });
                comment._id = seq.no;
                const data = yield db.post.updateOne({ _id }, { $push: { replies: comment } });
                console.log(data);
                return data;
            });
        },
    },
    user: {},
};
export default model;
