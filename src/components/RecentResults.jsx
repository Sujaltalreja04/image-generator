import React, { useEffect, useState } from "react";
import historyIcon from "../images/history.png";

const RecentResults = (props) => {
  const recentImagesFromStorage = JSON.parse(localStorage.getItem("genAIRecentKey")) || [];
  const [recentImagesStored, setRecentImagesStored] = useState(recentImagesFromStorage);

  const handleClick = (value) => {
    props.onSelect(value);
  };

  useEffect(() => {
    if (props.promptQuery && props.imageResult) {
      let updatedRecentImages = [...recentImagesStored];
      
      if (!updatedRecentImages.some((local) => local.src === props.imageResult)) {
        if (updatedRecentImages.length === 5) {
          updatedRecentImages.shift();
        }
        updatedRecentImages.push({
          src: props.imageResult,
          name: props.promptQuery,
        });

        localStorage.setItem("genAIRecentKey", JSON.stringify(updatedRecentImages));
        setRecentImagesStored(updatedRecentImages);
      }
    }
  }, [props.promptQuery, props.imageResult, recentImagesStored]);

  return (
    <>
      {recentImagesStored.length > 0 && (
        <>
          <div style={{ marginTop: 30 }}>
            Recent <img src={historyIcon} width={15} height={15} alt="History icon" />{" "}
          </div>
          <div className="recentImageBox">
            {recentImagesStored.map((value, index) => (
              <div key={index} onClick={() => handleClick(value.name)}>
                <img
                  className="recentImage"
                  src={value.src}
                  alt={value.name} // Updated alt text
                  loading="lazy"
                />
                <div className="imageLabel">{value.name}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default RecentResults;
