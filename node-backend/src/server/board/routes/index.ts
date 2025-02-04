import express from "express";
const router = express.Router();

import model from "../models/index.js";

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

// 게시물 목록 조회
router.get("/:type", async function (req, res, next) {
  const type = req.params.type;
  const list = await model.post.list(type);
  res.render("community/list", { list });
});

// 게시물 등록 화면
router.get("/:type/new", async function (req, res, next) {
  const type = req.params.type;
  res.render("community/new", { type });
});

// 게시물 상세 조회
router.get("/:type/:_id", async function (req, res, next) {
  const type = req.params.type;
  const _id = req.params._id;
  const item = await model.post.detail(Number(_id));
  console.log(item);
  res.render("community/detail", { item });
});

// 게시물 등록
router.post("/:type", async function (req, res, next) {
  const type = req.params.type;
  req.body.type = type;
  await model.post.add(req.body);
  res.redirect(`/${type}`);
});

// 게시물 수정 화면
router.get("/:type/:_id/edit", async function (req, res, next) {
  const type = req.params.type;
  const list = await model.post.list(type);
  res.render("community/list", { list });
});

// 게시물 수정
router.post("/:type/:_id/edit", async function (req, res, next) {
  const type = req.params.type;
  const list = await model.post.list(type);
  res.render("community/list", { list });
});

// 게시물 삭제
router.post("/:type/:_id", async function (req, res, next) {
  const type = req.params.type;
  const list = await model.post.list(type);
  res.render("community/list", { list });
});

// 댓글 등록
router.post("/:type/:_id/replies", async function (req, res, next) {
  const { type, _id } = req.params;
  await model.post.addComment(Number(_id), req.body);
  res.redirect(`/${type}/${_id}`);
});

export default router;
