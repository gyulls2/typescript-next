import net from "node:net";

const server = net.createServer((socket) => {
  // 클라이언트가 접속했을 때
  console.log(socket.remoteAddress, "접속함");

  // 클라이언트로부터 메시지가 도착했을 때 발생
  socket.on("data", (data) => {
    console.log(`${socket.remoteAddress}: ${data}`);

    const req = data.toString();
    const reqArr = req.split("\r\n");
    const startLine = reqArr.shift();
    if (startLine) {
      const method = startLine.split(" ")[0];
      const url = startLine.split(" ")[1];
      const httpVersion = startLine.split(" ")[2];
      console.log(method, url, httpVersion);
    }

    socket.write(`HTTP/1.1 200 OK\r\n`);
    socket.write(`Content-Type: text/html;charset=utf-8\r\n`);
    socket.write(`\r\n`);
    socket.write(`
      <html>
      <head><title>Hello</title></head>
      <body><h1>안녕하세요</h1></body>
      </html>
      `);
    socket.end(`\r\n`);
  });

  // 클라이언트와 접속이 끊겼을 때 발생
  socket.on("error", () => {
    console.log(`${socket.remoteAddress} 접속 종료`);
  });
});

// 서버가 80번 포트에서 클라이언트를 기다림
const PORT = 8088;
server.listen(PORT, () => {
  console.log(`TCP 서버 구동 : `, PORT);
});
