import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    fontFamily: {
      sans: ["rajdhani", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      aspectRatio: {
        hero: "6 / 1",
      },
      colors: {
        primary: {
          50: "#f5f3ff",
          100: "#eeeafd",
          200: "#dfd7fd",
          300: "#c7b7fb",
          400: "#a585f6",
          500: "#9161f1",
          600: "#823fe8",
          700: "#732dd4",
          800: "#6025b2",
          900: "#502191",
          950: "#311362",
        },
        secondary: {
          50: "#fdf4ef",
          100: "#fae5da",
          200: "#f4c9b4",
          300: "#eca485",
          400: "#e47653",
          500: "#de5634",
          600: "#cf3d27",
          700: "#ac2d22",
          800: "#8a2622",
          900: "#6f221f",
          950: "#3c0e0e",
        },
        error: {
          50: "#fff1f2",
          100: "#ffe4e5",
          200: "#ffccd1",
          300: "#fea3ac",
          400: "#fd6f81",
          500: "#f73c58",
          600: "#e51c44",
          700: "#c10f37",
          800: "#a11035",
          900: "#8a1134",
          950: "#4d0418",
        },
        tertiary: {
          50: "#eff4ff",
          100: "#dbe7fe",
          200: "#bfd5fe",
          300: "#92bbfe",
          400: "#5f96fb",
          500: "#3a70f7",
          600: "#244fec",
          700: "#1c3bd9",
          800: "#1d31b0",
          900: "#1d308b",
          950: "#1b2565",
        },
        success: {
          50: "#ebffe4",
          100: "#d3ffc5",
          200: "#a9ff92",
          300: "#73ff53",
          400: "#42fb20",
          500: "#23f900",
          600: "#14b500",
          700: "#108902",
          800: "#126c08",
          900: "#125b0c",
          950: "#023300",
        },
        black: {
          50: "#f0f1fd",
          100: "#e4e6fb",
          200: "#ced0f7",
          300: "#b0b1f1",
          400: "#9690e9",
          500: "#8375df",
          600: "#735ad1",
          700: "#634bb7",
          800: "#3D3764",
          900: "#302B4F",
          950: "#1E193B",
        },
        strength: {
          500: "#f83b3b",
        },
        intelligence: {
          500: "#E5E1DD",
        },
        dexterity: {
          500: "#00db98",
        },
        constitution: {
          500: "#FC9538",
        },
        wisdom: {
          500: "#4747FD",
        },
        charisma: {
          500: "#C01DFC",
        },
      },
      typography: () => ({
        DEFAULT: {
          css: {
            h1: {
              fontFamily: ["rajdhani"],
            },
            h2: {
              fontFamily: ["rajdhani"],
            },
            h3: {
              fontFamily: ["rajdhani"],
            },
            h4: {
              fontFamily: ["rajdhani"],
            },
            h5: {
              fontFamily: ["rajdhani"],
            },
            h6: {
              fontFamily: ["rajdhani"],
            },
            p: {
              fontFamily: ["rajdhani"],
            },
            li: {
              fontFamily: ["rajdhani"],
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
