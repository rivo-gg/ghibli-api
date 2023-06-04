import cron from "cron";
import DailyAverage from "./models/DailyAverage";

// Initialize an array to store daily average API calls
const dailyAverageArray = [];

const updateDailyAverage = async () => {
  try {
    // Calculate today's date
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    // Get the total number of API calls for today (replace this with your actual logic to count API calls)
    const totalApiCalls = await YourApiCallCountLogic();

    // Store or update the daily average API calls in the database
    await DailyAverage.findOneAndUpdate(
      { date: today },
      { date: today, count: totalApiCalls },
      { upsert: true }
    );

    // Push the daily average API calls to the array
    dailyAverageArray.push(totalApiCalls);

    console.log("Daily average updated successfully");
  } catch (error) {
    console.error("Error updating daily average:", error);
  }
};

const cronJob = new cron.CronJob({
  cronTime: "0 0 0 * * *", // Run the job every day at midnight (00:00:00)
  onTick: updateDailyAverage,
  start: true,
  timeZone: "UTC",
});

cronJob.start();
