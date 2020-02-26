import { NextPage } from 'next';
import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

interface Props {

}
const AddRecipe: NextPage<Props> = () => {
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
export default AddRecipe;
