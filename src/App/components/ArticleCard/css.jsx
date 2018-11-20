import styled from 'styled-components';

export const Block = styled.div`
  display: grid;
  padding: 10px;
  padding-bottom: 1px;
  justify-items: center;
  align-items: center;
  font-size: 15px;
  width: 100%;
  height: 300px;
  border-radius: 5px;
  border: #025aa5 2px solid;
  grid-template-columns: repeat(5, 2fr);
  grid-template-rows: 15% 15% 20% 15% 1fr 1fr;
  grid-template-areas:
    'photo photo category category category'
    'photo photo title title title'
    'photo photo summary summary summary'
    'owner owner summary summary summary'
    'postdate postdate summary summary summary'
    'comments comments comments comments comments';
  grid-column-gap: 15px;
`;

export const Photo = styled.div`
  grid-area: photo;
  margin: 0;
  img {
    object-fit: cover;
    width: 100%;
    max-height: 100%;
  }
`;

export const Title = styled.h2`
  grid-area: title;
  justify-self: left;
  font-size: 2em;
  padding-top: 5px;
  text-transform: capitalize;
  color: #393939;
  display: grid;
`;

export const Intro = styled.h4`
  grid-area: summary;
  color: #393939;
  font-weight: lighter;
  justify-self: left;
  padding-top: 15px;
  height: 100%;
  width: 100%;
  font-size: 1em;
  display: grid;
  section.start1 {
    align-self: start;
  }
  section.end1 {
    align-self: end;
    color: #d03a3c;
    padding-bottom: 10px;
  }
`;

export const Owner = styled.div`
  grid-area: owner;
  color: blue;
  display: grid;
  font-size: 0.8rem;
  justify-items: center;
  align-items: center;
  align-content: center;
  width: 100%;
  height: 100%;
  padding: 0px;
  border-top: #0275db solid 1px;
  grid-template-columns: 50% 1fr;
  span {
    display: grid;
    height: 100%;
    align-self: center;
    justify-self: center;
    padding: 0px;
    margin: 0;
  }
  span img {
    object-fit: cover;

    max-height: 100%;
  }
`;

export const PostDate = styled.div`
  grid-area: postdate;
  color: #5cb85c;
  font-size: 0.8rem;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: grid;
  border-top: #0275db solid 1px;
  padding: 0px;
`;

export const Tag = styled.ul`
  grid-area: category;
  color: blue;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 1fr;
  grid-auto-flow: column;
  justify-self: left;
  margin: 0;
  padding-inline-start: 0px;
  li {
    font-size: 0.8em;
    justify-self: left;
    text-decoration-style: none;
    list-style-type: none;
    text-transform: uppercase;
    color:
    padding: 3px;
  }
`;
export const CommentLike = styled.div`
  grid-area: comments;
  display: grid;
  width: 100%;
  border-top: 1px solid lightgrey;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-template-rows: 1fr;
  grid-gap: 1px;
  justify-items: center;
  background: white;
  font-size: 0.7rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  .num {
    color: red;
    font-size: 1.5rem;
  }
`;
