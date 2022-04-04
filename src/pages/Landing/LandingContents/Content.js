import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LandingContents from '../LandingContents/LandingContents';

const Content = ({ firstContentsList, setFirstContentsList }) => {
  // const [firstContentsList, setFirstContentsList] = useState([]);

  useEffect(() => {
    fetch('data/contentslist.json')
      .then(res => res.json())
      .then(data => setFirstContentsList(data));
  }, []);

  return (
    <div className="firstContents">
      <div className="firstTop">
        <span>기획전</span>
        <Link to="/">
          <button className="firstTopBtn" />
        </Link>
      </div>
      <ul className="firstBottom">
        {firstContentsList.map(contentList => {
          return <LandingContents key={contentList.id} {...contentList} />;
        })}
      </ul>
    </div>
  );
};

export default Content;
