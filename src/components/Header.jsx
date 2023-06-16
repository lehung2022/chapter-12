import '../index.css';

const Header = ({ title }) => {

  return (
      <header>
          <h4>{title}</h4>
      </header>
  )
}

Header.defaultProps = {
  title: "MK Characters Lists"
}

export default Header;