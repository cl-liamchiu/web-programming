/****************************************************************************
  FileName      [ searchPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the search result ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from "react";
import "../css/searchPage.css";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:4000/api",
});

const SearchPage = () => {
  const { state } = useLocation();
  const [restaurants, setRestaurant] = useState([]);
  const getRestaurant = async (priceFilter, mealFilter, typeFilter, sortBy) => {
    // TODO Part I-3-b: get information of restaurants from DB
    console.log("priceFilter: ", priceFilter)
    const {
      data: { message, contents },
    } = await instance.get("/getSearch", {
      params: {
        priceFilter,
        mealFilter,
        typeFilter,
        sortBy,
      },
    });

    if (message === "success") {
      setRestaurant(contents);
      console.log("recived");
    } else {
      console.log("not recived");
    }
  };

  useEffect(() => {
    getRestaurant(
      state.priceFilter,
      state.mealFilter,
      state.typeFilter,
      state.sortBy
    );
  }, [state.priceFilter, state.mealFilter, state.typeFilter, state.sortBy]);

  const navigate = useNavigate();
  const ToRestaurant = (id) => {
    // TODO Part III-1: navigate the user to restaurant page with the corresponding id
  };
  const priceToNum = (price) => {
    let newPrice = []
    price.forEach(price => {newPrice.push(price.length)      
    });
    return newPrice
  }
  const getPrice = (price) => {
    let priceText = "";
    for (let i = 0; i < price; i++) priceText += "$";
    return priceText;
  };
  const getTag = (tag) => {
    const newTag = tag.map((element, i) =>
      i !== tag.length - 1 ? element + ", " : element
    );
    return newTag;
  };

  return restaurants ? (
    <div className="searchPageContainer">
      {restaurants.map((item) => (
        // TODO Part I-2: search page front-end
        <div className="resBlock" id={item.id} key={item.id}>
          <div className="resImgContainer">
            <img className="resImg" src={item.img} alt="picture" />
          </div>
          <div className="resInfo">
            <div className="title">
              <p className="name">{item.name}</p>
              <p className="price">{getPrice(item.price)}</p>
              <p className="distance">{item.distance / 1000} km</p>
            </div>
            <p className="description">{getTag(item.tag)}</p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <></>
  );
};
export default SearchPage;
