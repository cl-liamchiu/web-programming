import Message from "./models/message";
import { UserModel, MessageModel, ChatBoxModel } from "./models/chatbox";

const makeName = (name, to) => {
  return [name, to].sort().join("_");
};

const vaildateUser = async (name) => {
  console.log("Finding..." + name);
  const existing = await UserModel.findOne({ name });
  if (existing) return existing;
};

const validateChatBox = async (name) => {
  let box = await ChatBoxModel.findOne({ name });
  if (!box) box = await new ChatBoxModel({ name }).save();
  return await box.populate("messages");
};

const sendData = (data, ws) => {
  ws.send(JSON.stringify(data));
};

const sendStatus = (payload, ws) => {
  sendData(["status", payload], ws);
};

const broadcastMessage = (chatBoxName, data, status) => {
  chatBoxes[chatBoxName].forEach((client) => {
    sendData(data, client);
    sendStatus(status, client);
  });
};

const chatBoxes = {};

export default {
  // initData: (ws) => {
  //   Message.find()
  //     .sort({ created_at: -1 })
  //     .limit(100)
  //     .exec((err, res) => {
  //       if (err) throw err;
  //       // initialize app with existing messages
  //       // console.log(res)
  //       sendData(["init", res], ws);
  //     });
  // },

  onMessage: (wss, ws) => {
    console.log(chatBoxes)
    return async (byteString) => {
      // const chatBoxes = {};
      // if (!chatBoxes[chatBoxName])
      // chatBoxes[chatBoxName] = new Set();
      // chatBoxes[chatBoxName].add(ws);
      const { data } = byteString;
      const { type, payload } = JSON.parse(data);
      // console.log("type: ", type, " payload:", payload);
      // ws.box = chatBoxes
      switch (type) {
        case "CHAT": {
          const { name, to } = payload;
          const chatBoxName = makeName(name, to);
          if (!chatBoxes[chatBoxName]) {
            chatBoxes[chatBoxName] = new Set();
          } else {
            chatBoxes[chatBoxName].add(ws);
          }

          const chatBoxMessages = (await validateChatBox(chatBoxName)).messages;
          console.log("switch ACTIVIKEY")
          sendData(["CHAT", chatBoxMessages], ws);
          sendStatus(
            {
              type: "success",
              msg: "Chat created",
            },
            ws
          );
         

          // console.log('h')
          // const box = new ChatBoxModel({ name: chatBoxName });
          // console.log('h')
          // try {
          //   console.log('h')
          //   await box.save();
          // } catch (e) {
          //   throw new Error("Message DB save error: " + e);
          // }

          break;
        }
        case "MESSAGE": {
          const { name, to, body } = payload;
          console.log("name: ", name, "to: ", to, "body: ", body);
          const chatBoxName = makeName(name, to);
          const message = new MessageModel({ sender: name, body: body });
          let box = await ChatBoxModel.findOne({ name: chatBoxName });
          // console.log(await box.populate("messages"))
          box.messages = [...box.messages, message];
          try {
            await message.save();
            await box.save();
            const chatBoxMessages = (await validateChatBox(chatBoxName))
              .messages;
            // sendData(["CHAT", chatBoxMessages], ws);
            // sendStatus(
            //   {
            //     type: "success",
            //     msg: "msg send",
            //   },
            //   ws
            // );
            chatBoxes[chatBoxName].add(ws);
            chatBoxes[chatBoxName].forEach((ws)=>{sendData(["CHAT", chatBoxMessages], ws);
            })
            sendStatus(
              {
                type: "success",
                msg: "msg sent",
              },
              ws
            );
          } catch (e) {
            throw new Error("Message DB save error: " + e);
          }
          break;
        }
        case "CLEAR": {
          break;
        }

        // case "clear": {
        //   Message.deleteMany({}, () => {
        //     sendData(["cleared"], ws);
        //     sendStatus({ type: "info", msg: "Message cache cleared." }, ws);
        //   });
        //   break;
        // }
        // case "input": {
        //   const { name, body } = payload;
        //   // Save payload to DB
        //   const message = new Message({ name, body });
        // try {
        //   await message.save();
        // } catch (e) {
        //   throw new Error("Message DB save error: " + e);
        // }
        //   // Respond to client
        //   sendData(["output", [payload]], ws);
        // sendStatus(
        //   {
        //     type: "success",
        //     msg: "Message sent.",
        //   },
        //   ws
        // );
        //   break;
        // }
      }
    };
  },

  //   onMessage: (wss) => async (byteString) => {
  //     const { data } = byteString;
  //     const [task, payload] = JSON.parse(data);
  //     switch (task) {
  //       case "input": {
  //         const { name, body } = payload;
  //         // Save payload to DB
  //         const message = new Message({ name, body });
  //         try {
  //           await message.save();
  //         } catch (e) {
  //           throw new Error("Message DB save error: " + e);
  //         }
  //         // Respond to client
  //         broadcastMessage(wss, ["output", [payload]], {
  //           type: "success",
  //           msg: "Message sent.",
  //         });
  //         break;
  //       }
  //       case "clear": {
  //         Message.deleteMany({}, () => {
  //           broadcastMessage(wss, ["cleared"], {
  //             type: "info",
  //             msg: "Message cache cleared.",
  //           });
  //         });
  //         break;
  //       }
  //     }
  //   },
};
