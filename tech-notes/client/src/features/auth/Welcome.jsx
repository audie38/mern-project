import { Link } from "react-router-dom";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "long" }).format(date);
  return (
    <section className="d-flex flex-column justify-content-center align-items-start gap-2">
      <p>{today}</p>
      <h1>Welcome</h1>
      <Link to="/dash/notes">View TechNotes</Link>
      <Link to="/dash/users">View User Settings</Link>
    </section>
  );
};

export default Welcome;
