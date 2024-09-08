const Update = ({ update, type }) => {
  let content;
  if (type === "home") {
    content = (
      <tr>
        <td>{update.productName}</td>
        <td>{update.user}</td>
        <td>{update.timestamp}</td>
        <td>{update.message}</td>
      </tr>
    );
  } else if (type === "admin") {
    const { difference } = update;
    let differenceToUse;
    if (update.type === "Remove") {
      differenceToUse = difference * -1;
    } else {
      differenceToUse = difference;
    }
    content = (
      <tr>
        <td>{update.productName}</td>
        <td>{update.type}</td>
        <td>{differenceToUse}</td>
        <td>{update.user}</td>
        <td>{update.timestamp}</td>
      </tr>
    );
  }
  return content;
};

export default Update;
