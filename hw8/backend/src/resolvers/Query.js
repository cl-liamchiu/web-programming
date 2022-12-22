const Query = {
  chatBox: async (parent, { name1, name2 }, { ChatBoxModel }, info) => {
    const name = [name1, name2].sort().join('_');
    console.log(name, "query")
    let box = await ChatBoxModel.findOne({ name });
    if (!box)
      box = await new ChatBoxModel({ name }).save();
      console.log("!box")

    return box;
  },
};

export default Query;
