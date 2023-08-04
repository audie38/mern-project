import Card from "../ui/Card";
import { Link } from "react-router-dom";

const NoteItem = () => {
  return (
    <Link to={`/note/1`} className="col-lg-4 col-md-3 col-sm-6">
      <Card>
        <h1>Note Item</h1>
      </Card>
    </Link>
  );
};

export default NoteItem;
