import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            typography: {
                invert: {
                    css: {
                        "--tw-prose-body": "rgb(209 213 219)",
                        "--tw-prose-headings": "rgb(255 255 255)",
                        "--tw-prose-links": "rgb(34 211 238)",
                        "--tw-prose-bold": "rgb(255 255 255)",
                        "--tw-prose-code": "rgb(34 211 238)",
                        "--tw-prose-quotes": "rgb(156 163 175)",
                        "--tw-prose-quote-borders": "rgb(75 85 99)",
                        "--tw-prose-hr": "rgb(55 65 81)",
                    },
                },
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
    ],
};

export default config;
