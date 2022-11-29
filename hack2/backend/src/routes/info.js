// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from "../models/info";

exports.GetSearch = async (req, res) => {
  /*******    NOTE: DO NOT MODIFY   *******/
  const priceFilter = req.query.priceFilter;
  const mealFilter = req.query.mealFilter;
  const typeFilter = req.query.typeFilter;
  const sortBy = req.query.sortBy;
  /****************************************/

  // NOTE Hint:
  // use `db.collection.find({condition}).exec(err, data) {...}`
  // When success,
  //   do `res.status(200).send({ message: 'success', contents: ... })`
  // When fail,
  //   do `res.status(403).send({ message: 'error', contents: ... })`
  console.log("priceFilter", priceFilter);

  console.log("mealFilter", mealFilter);

  console.log("typeFilter", typeFilter);
  console.log("sortBy: ", sortBy);
  const priceToNum = (priceFilter) => {
    let newPrice = []
    priceFilter.forEach(price => {newPrice.push(price.length)      
    });
    return newPrice
  }
  
  if (priceFilter) {
    const numPrice = priceToNum(priceFilter)
    if(mealFilter){
      if(typeFilter){
        const info = Info.find({
          price: numPrice,
          tag: { $all: typeFilter && mealFilter },
        }).sort({ sortBy: 1 }).exec((err, data) => {
            if (err) {
              res.status(403).send({ message: "error", contents: data });
              return handleError(err);
            }
            console.log("data:" , data)
            res.status(200).send({ message: "success", contents: data });
          });
      }else{
        const info = Info.find({
        price: numPrice,
        tag: { $all: mealFilter },
      }).sort({ sortBy: 1 }).exec((err, data) => {
          if (err) {
            res.status(403).send({ message: "error", contents: data });
            return handleError(err);
          }
          console.log("data:" , data)
          res.status(200).send({ message: "success", contents: data });
        });
      }
    }else if(typeFilter){
      const info = Info.find({
        price: numPrice,
        tag: { $all: typeFilter},
      }).sort({ sortBy: 1 }).exec((err, data) => {
          if (err) {
            res.status(403).send({ message: "error", contents: data });
            return handleError(err);
          }
          console.log("data:" , data)
          res.status(200).send({ message: "success", contents: data });
        });
      
    }else{
      const info = Info.find({
        price: numPrice,
      }).sort({ sortBy: 1 }).exec((err, data) => {
          if (err) {
            res.status(403).send({ message: "error", contents: data });
            return handleError(err);
          }
          console.log("data:" , data)
          res.status(200).send({ message: "success", contents: data });
        });
    }
  }
  else if (priceFilter && tag) {
    const info = Info.find({
      price: priceFilter,
      tag: { $all: tag },
    }).sort({ sortBy: 1 }).exec((err, data) => {
        if (err) {
          res.status(403).send({ message: "error", contents: data });
          return handleError(err);
        }
        console.log("data:" , data)
        res.status(200).send({ message: "success", contents: data });
      });
  }
 else if (mealFilter) {
    const info = await Info.find({
      tag: { $all: mealFilter && typeFilter },
    }).sort({ sortBy: 1 }).exec((err, data) => {
        if (err) {
          res.status(403).send({ message: "error", contents: data });
          return handleError(err);
        }
        console.log("data:" , data)
        res.status(200).send({ message: "success", contents: data });
      });
  }
  else if (!mealFilter&&!priceFilter&&!typeFilter) {
    const info = await Info.find({
    }).sort({ sortBy: 1 }).exec((err, data) => {
        if (err) {
          res.status(403).send({ message: "error", contents: data });
          return handleError(err);
        }
        console.log("data:" , data)
        res.status(200).send({ message: "success", contents: data });
      });
  }

  // TODO Part I-3-a: find the information to all restaurants

  // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
  // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
};

exports.GetInfo = async (req, res) => {
  /*******    NOTE: DO NOT MODIFY   *******/
  const id = req.query.id;
  /****************************************/

  // NOTE USE THE FOLLOWING FORMAT. Send type should be
  // if success:
  // {
  //    message: 'success'
  //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
  // }
  // else:
  // {
  //    message: 'error'
  //    contents: []
  // }

  // TODO Part III-2: find the information to the restaurant with the id that the user requests
};
