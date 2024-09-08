//receives updates as a prop
//maps over those updates to render an Update component
//passes a single update to the update component
//sort updates into chronological order
//conditionally render based on type
import Update from "./Update";

const UpdatesFeed = ({ updates, type }) => {
  const sortedUpdates = updates.sort((x, y) => x.timestamp - y.timestamp);
  const content = sortedUpdates.map((update) => (
    <Update key={update.id} update={update} type={type} />
  ));
  return content;
};

export default UpdatesFeed;
