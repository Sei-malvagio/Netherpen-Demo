const fastify = require("fastify")()
const fastifyView = require("@fastify/view")

fastify.register(require('@fastify/cors'), { origin: "*" })
fastify.register(require('@fastify/formbody'))
fastify.register(fastifyView, {
  engine: {
    ejs: require("ejs")
  }
})

const MAIN_DIR = "public/"
// synchronous handler:
fastify.get("/login", (req, reply) => {
  reply.view(MAIN_DIR +"login.ejs", { name: "User" });
})

fastify.get("/panel", (req, reply) => {
  const { username } = req.query
  console.log('Trigerred\nUsername:'+username ?? 'unknown'+'\n')

  let userData = { role: 'member', saldo: 0, deposit: 0, totalDeposit: 0, totalTransfer: 0 }

  switch(username) {
    case 'ex1':
      userData.role = "Admin";
      userData.saldo = "183.340.000";
      break;
    case 'ex2':
      userData.role = "Agent";
      userData.saldo = "5.782.000";
      break;
    case 'ex3':
      userData.role = "Sub Agent";
      userData.saldo = "153.372"
      break;
    case 'ex4':
      userData.role = "Member";
      break;
    default:
      return reply.send({ message: "unauthorized", status: 402 })
  }

  return reply.viewAsync(MAIN_DIR +"panel.ejs", { 
    username, userData })
})

/*fastify.get("/panel", async(req, reply) => {
   const username = localStorage.getItem("usn")

   reply.view(MAIN_DIR+"panel.ejs", { username: username })
})*/
// asynchronous handler:
fastify.get("/", async (req, reply) => {
  return reply.viewAsync(MAIN_DIR+"index.ejs", { name: "User" });
})

const PORT = process.env.PORT || 3000
fastify.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) throw err
  console.log(`Server listening at ${address}`)
})
