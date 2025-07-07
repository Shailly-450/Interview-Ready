/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js", 
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:npg_DFd4ai3ZUEpb@ep-delicate-fog-a8zlv2ub-pooler.eastus2.azure.neon.tech/interview-ready?sslmode=require&channel_binding=require'
    }
  };
  