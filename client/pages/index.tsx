// https://recipes-organizer.now.sh/
import { NextPage } from 'next';
import { useState } from 'react';
interface Props {

}

const Home: NextPage<Props> = () => {
  const [input, setInput] = useState({});

  function handleChange(event) {
    const { target } = event;
    const { name, value } = target;
    setInput({ ...input, [name]: value });
  }

  return (
    <div>
      <h1>Recipes</h1>
      <form>
        <label>Name</label>
        <input name="name" onChange={handleChange} />
        <label>Ingredient</label>
        <input name="ingredient" onChange={handleChange}/>
        <label>Directions</label>
        <input name="quantity" onChange={handleChange} />
        <label>Price</label>
        <input name="price" onChange={handleChange} />
        <label>Quantity</label>
        <input name="directions" onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  );
}
export default Home;