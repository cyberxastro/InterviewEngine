/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:EPF1rIZe4GTp@ep-flat-band-a18v9utc.ap-southeast-1.aws.neon.tech/InterviewEngine?sslmode=require',
    }
  };
  