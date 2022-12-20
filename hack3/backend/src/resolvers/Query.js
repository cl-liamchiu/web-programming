const Query = {
    items: async (parent, args, {itemModel}) => {
      console.log("query!")
      const items = await itemModel.find().sort();
      return items;
    },
};

export default Query;
