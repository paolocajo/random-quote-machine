import { useRef, useEffect, useState } from "react";
import twitterSVG from "/twitter.svg";
import VanillaTilt from "vanilla-tilt";
// import { useFetch } from "../hooks/useFetch";
import Loader from "./Loader";
import { fetchData } from "../helpers/fetchData";
import Message from "./Message";

const QuoteBox = () => {
  const tiltRef = useRef(null);
  const doubleQuote = '"';
  const [previousId, setPreviousId] = useState(null);
  const dataFetchedRef = useRef(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const url = "https://api.quotable.io/quotes/random";
  async function getData() {
    setLoading(true);
    const res = await fetchData(url);
    if (!res.err) {
      setData(res);
      setError(null);
    } else {
      setData(null);
      setError(res);
    }
    setLoading(false);
  }

  // console.log(data);
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getData();
    if (data && data.length > 0) {
      setPreviousId(data[0]["_id"]); // Save "_id" on loading
    }
  }, [data]);

  useEffect(() => {
    // Initialize vanilla-tilt on the element
    VanillaTilt.init(tiltRef.current, {
      max: 2.5,
      speed: 100,
      glare: true,
      "max-glare": 0.5,
    });

    // Clean up the tilt effect on unmount
    return () => {
      tiltRef.current.vanillaTilt.destroy();
    };
  }, []);

  const handleClick = async () => {
    setPreviousId(data[0]["_id"]);
    if (data[0]["_id"] === previousId) {
      setData(null);
      getData();
    } else {
      setPreviousId(data[0]["_id"]);
      setData(null);
      getData();
    }
  };
  return (
    <div id="quote-box" ref={tiltRef}>
      {data ? (
        <>
          <div id="text">
            {doubleQuote}
            {data[0].content}
            {doubleQuote}
          </div>
          <div id="author">- {data[0].author}</div>
          <div className="buttons">
            <a
              className="button button-icon"
              id="tweet-quote"
              href={`https://twitter.com/intent/tweet?text="${encodeURIComponent(
                data[0].content + '"' + " - " + data[0].author
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitterSVG} alt="Twitter" />
            </a>
            <button
              className="button"
              id="new-quote"
              onClick={() => handleClick()}
            >
              New quote
            </button>
          </div>
        </>
      ) : loading ? (
        <Loader />
      ) : (
        error && (
          <Message
            msg={`Error ${error.status}: ${error.statusText}`}
            bgColor="#0c4661"
          />
        )
      )}
    </div>
  );
};

export default QuoteBox;
