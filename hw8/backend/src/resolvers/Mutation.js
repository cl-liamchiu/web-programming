const checkOutChatBox = async (name1, name2, ChatBoxModel) => {
  const name = [name1, name2].sort().join("_");
  let box = await ChatBoxModel.findOne({ name });
  if (!box) box = await new ChatBoxModel({ name }).save();
  return box;
};

const makeName = (name, to) => {
  const chatBoxName = [name, to].sort().join("_");
  return chatBoxName;
};

const Mutation = {
  createChatBox: (parent, { name1, name2 }, { ChatBoxModel }, info) => {
    return checkOutChatBox(name1, name2, ChatBoxModel);
  },

  createMessage: async (parent, { name, to, body }, { ChatBoxModel, pubsub }) => {
    const chatBox = await checkOutChatBox(name, to, ChatBoxModel);
    const newMsg = { sender: name, body };
    chatBox.messages.push(newMsg);
    await chatBox.save();
    const chatBoxName = makeName(name, to);
    console.log("createMsg", chatBoxName)
    console.log("body", body)
    pubsub.publish(`chatBox ${chatBoxName}`, {
      message: newMsg,
    });
    return newMsg;
  },
};

export default Mutation;