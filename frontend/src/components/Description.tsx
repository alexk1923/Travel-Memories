import React from "react";
import about1 from "../img/about1.png";
import about2 from "../img/about2.png";
import { Box, Typography, Stack, Grid } from "@mui/material";

const Description = () => {
  return (
    <Box>
      <Typography variant="h4" textAlign="center" color="primary.main">
        Different people, same passion
      </Typography>

      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Box
            sx={{
              bgcolor: "secondary.light",
              p: 4,
            }}
            component="div"
            className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-center"
          >
            <div>
              <img
                src={about1}
                alt="two people looking at a sunrise"
                className="w-full rounded-lg lg:max-w-full"
              />
            </div>

            <Box>
              <Typography variant="h5" color="primary.main">
                A network meant to connect
              </Typography>
              <Typography variant="body1" paragraph>
                To gether, we&aposll explore new horizons, learn from one
                another, and build bridges that connect us across the
                continents. Because no matter where you&aposre from, the desire
                to explore and connect with the world is a universal language we
                all share.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            gap={4}
            sx={{
              bgcolor: "secondary.light",
              p: 4,
            }}
            component="div"
            className="flex flex-col-reverse gap-4 lg:flex-row lg:items-center lg:justify-center"
          >
            <Box>
              <Typography variant="h5" color="primary.main">
                Track your journey
              </Typography>
              <Typography variant="body1" paragraph>
                Our platform is designed to offer an intuitive and organized way
                for you to easily track the places you &apos ve visited. Create
                a plan for your future adventures by exploring and saving
                desired experiences within your personal profile to access them
                whenever you need.
              </Typography>
            </Box>

            <div>
              <img
                src={about2}
                style={{ maxWidth: "100%", objectFit: "cover" }}
                alt="person holding a map"
                className="rounded-lg"
              />
            </div>
          </Box>
        </Grid>
      </Grid>

      <div className="text-body-1 cursor-pointer text-center font-semibold italic text-primary">
        Learn more {">"}
      </div>
    </Box>
  );
};

export default Description;
