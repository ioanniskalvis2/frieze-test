import { Stack, Typography, Link } from "@mui/material";

const Navbar = () => {
  return (
    <main style={{ background: "linear-gradient(to right, #fc00ff, #00dbde)" }}>
      <Stack
        spacing={4}
        direction="row"
        alignItems="center"
        padding="0.5em 1.5em"
      >
        <Typography variant="h3">Frieze</Typography>
        <Stack direction="row" gap={4} justifyContent="flex-end" width={"100%"}>
          <Link href="/" color={"#ffffff"}>
            Home
          </Link>
          <Link href="/conversions" color={"#ffffff"}>
            Conversion History
          </Link>
        </Stack>
      </Stack>
    </main>
  );
};

export default Navbar;
