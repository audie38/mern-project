import { Link } from "react-router-dom";

const Public = () => {
  return (
    <section>
      <header>
        <h1>Welcome to Dan D. Repairs</h1>
      </header>
      <main>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, consequatur?</p>
        <address>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, fugiat!</address>
        <p>Owner: Dan Davidson</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
};

export default Public;
