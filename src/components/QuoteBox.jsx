import { useRef, useEffect, useState } from "react";
import twitterSVG from "/twitter.svg";
import VanillaTilt from "vanilla-tilt";
import { useFetch } from "../hooks/useFetch";
import Loader from "./Loader";

const QuoteBox = () => {
  const tiltRef = useRef(null);
  const [previousId, setPreviousId] = useState(null);
  const dataFetchedRef = useRef(false);
  const { data, error, loading } = useFetch(
    "https://api.quotable.io/quotes/random"
  );
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    if (data && data.length > 0) {
      setPreviousId(data[0]["_id"]); // Save "_id" on loading
    }
  }, [data]);
  useEffect(() => {
    // Initialize vanilla-tilt on the element
    VanillaTilt.init(tiltRef.current, {
      max: 1,
      speed: 100,
      glare: true,
      "max-glare": 0.5,
    });

    // Clean up the tilt effect on unmount
    return () => {
      tiltRef.current.vanillaTilt.destroy();
    };
  }, []);

  const doubleQuote = '"';
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
            <button className="button" id="new-quote">
              New quote
            </button>
          </div>
        </>
      ) : (
        loading && <Loader />
      )}
    </div>
  );
};

export default QuoteBox;
