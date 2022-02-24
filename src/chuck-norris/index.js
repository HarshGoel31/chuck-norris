import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import "./index.scss";

function Index() {
  const [categories, setCategories] = useState([]);
  const [jokes, setJokes] = useState();
  const [category, setCategory] = useState();
  const [active,setActive]=useState(false)
  useEffect(() => {
    sendGetRequest();
  }, []);
  const sendGetRequest = async () => {
    try {
      const resp = await axios.get(
        "https://api.chucknorris.io/jokes/categories"
      );
      setCategories(resp.data);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };
  const getJoke = async (category) => {
    try {
      const resp = await axios.get(
        `https://api.chucknorris.io/jokes/random?category=${category}`
      );
      setJokes(resp.data.value);
      setCategory(category);
      setActive(category);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  return (
    <div>
      <Row className="categories">
        {categories.map((category,key) => (
          <Col key={key}>
            <button
              onClick={(e) => {
                getJoke(category);
              }}
              style={{
                backgroundColor: active === category ? "#318ce7" : ""
              }}
            >
              <p>{category}</p>
            </button>
          </Col>
        ))}
      </Row>
      <div className="selected">
        <p>Selected category : {category}</p>
      </div>
      <div className="joke_div">{jokes}</div>
      <div className="new_joke">
        <button
          onClick={(e) => {
            getJoke(category);
          }}
          class="button_joke"
        >
          New Joke
        </button>
      </div>
    </div>
  );
}

export default Index;
