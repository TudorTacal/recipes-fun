// https://recipes-organizer.now.sh/
import { NextPage } from 'next';
import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const GET_RECIPES = gql`
  query GetRecipes {
    recipes {
      _id
      name
      description
      ingredients {
        name
        quantity
        price
      }
    }
  }
`;

interface Props {

}

const Home: NextPage<Props> = () => {
  const { data, loading, error } = useQuery<any>(
    GET_RECIPES,
    { fetchPolicy: "network-only" }
  );
  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (data === undefined) return <p>ERROR</p>;

  return (
    <>
      {console.dir(data)}
      {data.recipes && data.recipes.length ? (
        data.recipes.map((recipe: any) => (
          <p key={recipe._id}>{recipe.name} {recipe.description}</p>
        ))
      ) : (
        <p>You haven't added any recipes yet</p>
      )}
    </>
  );
}
export default Home;