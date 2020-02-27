import React, { ReactElement } from "react";
import { Grid, Typography, Card, CardHeader, CardMedia, CardContent } from '@material-ui/core';
import { Recipe } from '../interfaces/recipe';

interface Props {
  recipes: Recipe[];
}

export const Recipes: React.FC<Props> = ({ recipes }) => {
  // grid container -> iterate on recipes -> grid item -> Recipe Component
  return (
    <Grid container spacing={3}>
      {recipes.map((recipe: Recipe) =>
        <Grid item key={recipe._id}>
          <Card>
            <CardHeader title={recipe.name} />
            <CardMedia
              image="https://specials-images.forbesimg.com/imageserve/5d7fb0e718444200084d8f4f/960x0.jpg?fit=scale"
              title={recipe.name}
            />
             <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {recipe.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {(recipe.ingredients[0] as any).name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  )
};
