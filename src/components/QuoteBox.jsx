import { useRef, useEffect } from "react";
import twitterSVG from "./../../public/twitter.svg";
import VanillaTilt from "vanilla-tilt";

const QuoteBox = () => {
  const tiltRef = useRef(null);

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

  return (
    <div id="quote-box" ref={tiltRef}>
      <div id="text">
        {
          '"La vida es lo que pasa mientras estás ocupado haciendo otros planes."'
        }
      </div>
      <div id="author">- John Lennon</div>
      <div className="buttons">
        <a
          className="button button-icon"
          id="tweet-quote"
          href="https://twitter.com/intent/tweet?text=La%20vida%20es%20lo%20que%20pasa%20mientras%20est%C3%A1s%20ocupado%20haciendo%20otros%20planes.%20-%20John%20Lennon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={twitterSVG} alt="Twitter" />
        </a>
        <button className="button" id="new-quote">
          New quote
        </button>
      </div>
    </div>
  );
};

export default QuoteBox;
