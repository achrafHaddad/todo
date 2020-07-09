const cron = require("node-cron");

cron.schedule("*/2 * * * *", () => {
  console.log("hi every 2 min");
});
