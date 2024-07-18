import net from "node:net";
const server = net.createServer((soket) => {
    // 클라이언트가 접속했을 때
    console.log(soket.remoteAddress, "접속함");
    // 클라이언트로부터 메시지가 도착했을 때 발생
    soket.on("data", (data) => {
        console.log(`${soket.remoteAddress}: ${data}`);
    });
    // 클라이언트와 접속이 끊겼을 때 발생
    soket.on("error", () => {
        console.log(`${soket.remoteAddress} 접속 종료`);
    });
});
// 서버가 80번 포트에서 클라이언트를 기다림
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`TCP 서버 구동 : `, PORT);
});
