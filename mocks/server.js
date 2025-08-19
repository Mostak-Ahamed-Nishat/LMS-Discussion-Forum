const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const rewriter = jsonServer.rewriter(require("./routes.json"));

server.use(middlewares);
server.use(jsonServer.bodyParser);

// timestamps
server.use((req, _res, next) => {
  if (req.method === "POST") {
    req.body.createdAt ??= new Date().toISOString();
    req.body.updatedAt ??= new Date().toISOString();
  }
  if (req.method === "PATCH") {
    req.body.updatedAt = new Date().toISOString();
  }
  next();
});

// voting: POST /vote/threads/:id  { vote: 1|-1 } ; POST /vote/replies/:id
server.post("/vote/:type/:id", (req, res) => {
  const { type, id } = req.params; // "threads" | "replies"
  const { vote } = req.body; // 1 or -1
  const db = router.db;
  const key = isNaN(id) ? id : Number(id);

  const item = db.get(type).find({ id: key }).value();
  if (!item) return res.status(404).json({ error: "Not found" });

  if (vote === 1) item.upvotes = (item.upvotes || 0) + 1;
  if (vote === -1) item.downvotes = (item.downvotes || 0) + 1;

  db.get(type).find({ id: key }).assign(item).write();
  res.json(item);
});

// accept answer: POST /threads/:threadId/accept/:replyId
server.post("/threads/:threadId/accept/:replyId", (req, res) => {
  const db = router.db;
  const threadId = Number(req.params.threadId);
  const replyId = Number(req.params.replyId);

  const thread = db.get("threads").find({ id: threadId }).value();
  const reply = db.get("replies").find({ id: replyId, threadId }).value();
  if (!thread || !reply) return res.status(404).json({ error: "Not found" });

  db.get("threads")
    .find({ id: threadId })
    .assign({ status: { ...thread.status, acceptedAnswerId: replyId } })
    .write();

  db.get("replies").find({ id: replyId }).assign({ accepted: true }).write();

  res.json({ ok: true, threadId, replyId });
});

server.use(rewriter);
server.use(router);

const PORT = 4000;
server.listen(PORT, () =>
  console.log(`JSON Server on http://localhost:${PORT}`)
);
