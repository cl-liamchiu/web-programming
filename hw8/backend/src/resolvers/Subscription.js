const makeName = (name, to) => {
  const chatBoxName = [name, to].sort().join("_");
  return chatBoxName;
}

const Subscription = {
  message: {
    subscribe: (parent, { from, to }, { pubsub }, info) => {
      const chatBoxName = makeName(from, to);
      console.log("subscribed: ", "from: ", from, "to: ", to)
      return pubsub.subscribe(`chatBox ${chatBoxName}`);
    },
  },
};

export default Subscription;
