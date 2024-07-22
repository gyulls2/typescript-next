var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
const router = express.Router();
import model from "../models/index.js";
/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index");
});
// 게시물 목록 조회
router.get("/:type", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const type = req.params.type;
        const list = yield model.post.list(type);
        res.render("community/list", { list });
    });
});
// 게시물 등록 화면
router.get("/:type/new", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const type = req.params.type;
        res.render("community/new", { type });
    });
});
// 게시물 상세 조회
router.get("/:type/:_id", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const type = req.params.type;
        const _id = req.params._id;
        const item = yield model.post.detail(Number(_id));
        console.log(item);
        res.render("community/detail", { item });
    });
});
// 게시물 등록
router.post("/:type", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const type = req.params.type;
        req.body.type = type;
        yield model.post.add(req.body);
        res.redirect(`/${type}`);
    });
});
// 게시물 수정 화면
router.get("/:type/:_id/edit", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const type = req.params.type;
        const list = yield model.post.list(type);
        res.render("community/list", { list });
    });
});
// 게시물 수정
router.post("/:type/:_id/edit", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const type = req.params.type;
        const list = yield model.post.list(type);
        res.render("community/list", { list });
    });
});
// 게시물 삭제
router.post("/:type/:_id", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const type = req.params.type;
        const list = yield model.post.list(type);
        res.render("community/list", { list });
    });
});
// 댓글 등록
router.post("/:type/:_id/replies", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { type, _id } = req.params;
        yield model.post.addComment(Number(_id), req.body);
        res.redirect(`/${type}/${_id}`);
    });
});
export default router;
