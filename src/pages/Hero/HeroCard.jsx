import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Chip,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function HeroCard({ hero }) {
  const heroName = hero.details.uk?.name || hero.details.en?.name || hero.name;

  return (
    <Card
      sx={{
        width: 250,
        borderRadius: 3,
        boxShadow: 3,
        "&:hover": { boxShadow: 6, transform: "scale(1.03)" },
        transition: "0.2s",
      }}
    >
      <CardActionArea
        component={Link}
        to={`/hero/${encodeURIComponent(hero.name)}`}
      >
        <CardMedia
          component="img"
          height="250"
          image={hero.img}
          alt={heroName}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
          >
            {heroName}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip label={hero.class} color="primary" size="small" />
            {hero.details.uk?.characteristics?.fraction_hero && (
              <Chip
                label={hero.details.uk.characteristics.fraction_hero}
                color="secondary"
                size="small"
              />
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
