import twitterSVG from "/twitter.svg";
const QuoteContent = ({ data, handleClick }) => {
  const doubleQuote = '"';
  return (
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
        <button className="button" id="new-quote" onClick={() => handleClick()}>
          New quote
        </button>
      </div>
    </>
  );
};

export default QuoteContent;
