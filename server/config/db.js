import dns from "dns";
import mongoose from "mongoose";

// Node 24.x on Windows often fails mongodb+srv SRV lookups (querySrv ECONNREFUSED)
// even when OS DNS works. Force public DNS for this process only.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    const detail = error.reason?.servers
      ? [...error.reason.servers.values()].map((s) => s.error?.message).find(Boolean)
      : null;
    if (detail) console.error(`Detail: ${detail}`);
    if (
      /whitelist|ReplicaSetNoPrimary|tlsv1 alert internal error/i.test(
        `${error.message} ${detail || ""}`
      )
    ) {
      console.error(
        "Fix: MongoDB Atlas → Network Access → Add IP Address → Add Current IP Address (or 0.0.0.0/0 for testing), wait ~1 min, then restart."
      );
    }
    process.exit(1);
  }
};

export default connectDB;
