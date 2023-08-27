import { rest } from "msw";

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagepath: "/images/chocolate.png" },
        { name: "Vanilla", imagepath: "/images/vanilla.png" },
        { name: "Mint chip", imagepath: "/images/mint-chip.png" },
      ])
    );
  }),
  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "M&Ms", imagePath: "/images/m-and-ms.png" },

        { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },

        {
          name: "Peanut butter cups",
          imagePath: "/images/peanut-butter-cups.png",
        },

        { name: "Gummi bears", imagePath: "/images/gummi-bears.png" },

        { name: "Mochi", imagePath: "/images/mochi.png" },

        { name: "Cherries", imagePath: "/images/cherries.png" },
      ])
    );
  }),
  rest.post("http://localhost:3030/order", async (req, res, ctx) => {
    await sleep(1000);
    return res(ctx.status(201), ctx.json({ orderNumber: 123455676 }));
  }),
];

// json({ orderNumber: 123455676 })
